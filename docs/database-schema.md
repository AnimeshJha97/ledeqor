# Course Platform Database Schema

## Database

Default database name:

```text
ai_engineer_guide
```

The app reads this from `MONGODB_DB`.

## Collections

### `users`

One document per authenticated platform user. Auth.js/Google sign-in syncs the user into this collection and stores the platform role.

Shape:

```ts
{
  email: string;
  name?: string | null;
  image?: string | null;
  role: "learner" | "admin" | "instructor";
  createdAt: Date;
  updatedAt: Date;
}
```

Indexes:

- unique `{ email: 1 }`
- `{ role: 1, updatedAt: -1 }`

### `course_entitlements`

One document per user per course. This is the access-control source of truth for private course content.

Shape:

```ts
{
  userId: string;
  courseSlug: string;
  accessLevel: "free" | "paid" | "pro" | "admin";
  source: "manual" | "purchase" | "subscription" | "admin_grant" | "preview" | "free_enrollment" | "founder_free";
  campaignId?: string;
  status: "active" | "expired" | "revoked" | "refunded";
  startsAt: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

Indexes:

- unique `{ userId: 1, courseSlug: 1 }`
- `{ courseSlug: 1, status: 1 }`
- `{ userId: 1, status: 1 }`
- `{ campaignId: 1, status: 1 }`

### `pricing_plans`

One document per sellable paid tier. Free access and previews are handled by entitlements or campaigns, not as a separate paid plan.

Current tiers:

- `pro`: Rs. 499/month
- `career`: Rs. 799/month

Shape:

```ts
{
  slug: "pro" | "career";
  name: string;
  description: string;
  currency: "INR";
  amount: number;
  billingPeriod: "month" | "year" | "one_time";
  accessLevel: "paid" | "pro";
  features: string[];
  status: "active" | "archived";
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
```

Indexes:

- unique `{ slug: 1 }`
- `{ status: 1, sortOrder: 1 }`

### `offer_campaigns`

One document per pricing campaign. Campaigns can target one or more pricing tiers and apply a percentage discount. This allows launch offers, festival offers, limited-time upgrades, and plan-specific promotions without changing the base plan price.

Example current campaign:

```ts
{
  slug: "founder-free-access";
  name: "Founder Free Access";
  description: "Launch campaign that makes the Rs. 499 Pro tier free for early users.";
  targetPlanSlugs: ["pro"];
  discountPercentage: 100;
  status: "active";
  startsAt: Date;
  endsAt?: Date;
  maxRedemptions: 25;
  redeemedCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

General shape:

```ts
{
  slug: string;
  name: string;
  description?: string;
  targetPlanSlugs: ("pro" | "career")[];
  discountPercentage: number; // 0-100
  status: "draft" | "scheduled" | "active" | "paused" | "expired";
  startsAt: Date;
  endsAt?: Date;
  maxRedemptions?: number;
  redeemedCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

Indexes:

- unique `{ slug: 1 }`
- `{ status: 1, startsAt: 1, endsAt: 1 }`
- `{ targetPlanSlugs: 1, status: 1 }`

Campaign application rule:

1. Read active campaigns where `targetPlanSlugs` contains the plan slug.
2. Keep campaigns where `startsAt <= now` and `endsAt` is missing or `endsAt >= now`.
3. If multiple campaigns match, use the highest `discountPercentage` unless a later admin priority field is added.
4. Final amount is `round(plan.amount * (1 - discountPercentage / 100))`.

### `courses`

One document per course. This keeps course content meaningfully grouped and avoids scattering every module or lecture into separate top-level collections.

Shape:

```ts
{
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: "draft" | "published";
  version: number;
  modules: {
    id: number;
    slug: string;
    title: string;
    purpose: string;
    outcome: string;
    status: "complete" | "outline" | "planned";
    sourceFile: string;
    labSlug?: string;
    lectures: {
      id: string;
      title: string;
      anchor: string;
      kind?: "concept" | "build" | "interview" | "strategy";
    }[];
    markdown: string;
  }[];
  stats: {
    moduleCount: number;
    lectureCount: number;
    completedModuleCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

Indexes:

- unique `{ slug: 1 }`
- `{ status: 1, updatedAt: -1 }`

### `course_progress`

One document per learner per course. This keeps user activity separate from course content.

Shape:

```ts
{
  courseSlug: string;
  learnerId: string;
  lectures: {
    moduleSlug: string;
    lectureId: string;
    status: "not_started" | "reading" | "done" | "needs_revision";
    updatedAt: Date;
  }[];
  completedModules: string[];
  quizScores: {
    moduleSlug: string;
    score: number;
    total: number;
    updatedAt: Date;
  }[];
  updatedAt: Date;
}
```

Indexes:

- unique `{ courseSlug: 1, learnerId: 1 }`
- `{ learnerId: 1, updatedAt: -1 }`

### `practice_attempts`

One document per saved short-answer practice attempt. This keeps active learning attempts separate from course content and progress status.

Shape:

```ts
{
  courseSlug: string;
  moduleSlug: string;
  learnerId: string;
  prompt: string;
  answer: string;
  createdAt: Date;
}
```

Indexes:

- `{ courseSlug: 1, moduleSlug: 1, learnerId: 1, createdAt: -1 }`

### `capstone_progress`

One document per learner per course capstone. This keeps project build progress course-specific without cluttering the course content document.

Shape:

```ts
{
  courseSlug: string;
  learnerId: string;
  completedItems: {
    phaseId: string;
    itemId: string;
    completedAt: Date;
  }[];
  updatedAt: Date;
}
```

Indexes:

- unique `{ courseSlug: 1, learnerId: 1 }`
- `{ learnerId: 1, updatedAt: -1 }`

## Current API Routes

```text
GET    /api/health
GET    /api/courses                         public catalog-safe summaries
GET    /api/courses/:courseSlug             public summary unless enrolled
POST   /api/courses/seed
GET    /api/progress?courseSlug=ai-engineer-guide       authenticated + enrolled
PATCH  /api/progress                                    authenticated + enrolled
POST   /api/practice/attempts                           authenticated + enrolled
GET    /api/capstone/progress?courseSlug=ai-engineer-guide authenticated + enrolled
PATCH  /api/capstone/progress                           authenticated + enrolled
POST   /api/interview-practice/analyze                  authenticated + enrolled
```

## Seeding

`POST /api/courses/seed` reads the existing Markdown course files and upserts the `ai-engineer-guide` course document.

If `COURSE_SEED_SECRET` is configured, call the route with:

```text
x-seed-secret: your-secret
```

## Why This Structure

- Courses remain course-specific.
- Progress remains learner-specific.
- The database stays small and readable.
- Future courses can be added as new `courses` documents.
- User progress, quiz attempts, and notes can grow independently without rewriting course content.
