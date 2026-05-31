# Security and Route Access Architecture

Last updated: 2026-05-20

## Purpose

The platform is a multi-course study and preparation product. Public visitors should be able to discover the platform, compare courses, read marketing content, and sign in. Actual course consumption should require authentication and course access.

This document defines the production access model for:

- public pages
- signed-in user pages
- enrolled course pages
- paid/subscription-only features
- admin/instructor routes
- API route authorization
- database ownership and entitlement checks

## Udemy-Inspired Product Patterns

Udemy is a useful comparison because it separates course discovery from course consumption:

- Course landing/enrollment pages can be public, while the course-taking experience is tied to enrollment or purchase.
- Course creators can make enrollment pages private, which means access is controlled by invitation or direct link rather than public catalog discovery.
- Learners have progress and completion state tied to their account.
- Udemy Business adds organization-level administration, assignments, user management, and reporting.

Sources reviewed:

- Udemy support: private course enrollment pages  
  https://support.udemy.com/hc/en-us/articles/229604188-How-to-Make-a-Course-Enrollment-Page-Private
- Udemy support: course taking / learning experience  
  https://support.udemy.com/hc/en-us/categories/204119728-Course-Taking
- Udemy support: certificates and course completion  
  https://support.udemy.com/hc/en-us/articles/229603868-Certificate-of-Completion
- Udemy Business support: admin and learning management concepts  
  https://business-support.udemy.com/

We should not clone Udemy directly. Our app is more guided, cohort/product-build oriented, and AI-enhanced. But the route-access model should follow the same principle: public discovery, private learning.

## Current Problem

Right now, course study routes can be opened without signing in:

```text
/courses/ai-engineer-guide/modules
/courses/ai-engineer-guide/modules/[moduleSlug]
/courses/ai-engineer-guide/modules/[moduleSlug]/lectures/[lectureId]
/courses/ai-engineer-guide/modules/[moduleSlug]/practice
/courses/ai-engineer-guide/capstone
/courses/ai-engineer-guide/visuals
```

The matching APIs also use a temporary learner id:

```ts
const learnerId = "local-learner";
```

That is fine for local prototyping but not acceptable for production. In production, learner identity must come from the authenticated session.

## Access Levels

### 1. Public Visitor

No sign-in required.

Can access:

- landing page
- course catalog
- public course sales/detail page
- pricing
- about
- sign-in
- selected free previews
- health check

Cannot access:

- full modules
- full lecture pages
- progress state
- practice submissions
- AI answer analysis
- capstone checklist
- private diagrams if tied to course content
- account dashboard

### 2. Authenticated User

Signed in, but may not have course access.

Can access:

- account dashboard
- profile/settings
- owned/enrolled course list
- checkout/enrollment flows
- free tier allowed content

Cannot access paid course content unless entitlement exists.

### 3. Enrolled Learner

Signed in and has active access to a specific course.

Can access:

- course modules
- lectures
- practice mode
- quizzes
- saved answers
- progress tracking
- capstone tracker
- visual learning library
- AI analysis within plan limits

### 4. Pro / Paid Learner

Signed in, enrolled, and has paid/subscription entitlement.

Can access:

- all learner features
- advanced AI answer review
- mock interview mode
- deeper capstone guidance
- exportable reports or certificates when implemented

### 5. Admin / Instructor

Can access:

- course authoring
- seed/publish tools
- learner analytics
- billing/admin settings
- moderation and audit logs
- support tools

## Target Route Matrix

| Route | Access | Reason |
|---|---:|---|
| `/` | Public | Platform marketing |
| `/courses` | Public | Course catalog |
| `/courses/[courseSlug]` | Public | Sales/detail page |
| `/pricing` | Public | Conversion page |
| `/about` | Public | Trust page |
| `/sign-in` | Public only when signed out | Auth entry |
| `/dashboard` | Authenticated | User home |
| `/my-learning` | Authenticated | Owned/enrolled courses and Founder Free empty state |
| `/courses/[courseSlug]/modules` | Enrolled learner | Paid/private course content |
| `/courses/[courseSlug]/modules/[moduleSlug]` | Enrolled learner | Module content |
| `/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]` | Enrolled learner | Lecture body |
| `/courses/[courseSlug]/modules/[moduleSlug]/practice` | Enrolled learner | Practice and saved answers |
| `/courses/[courseSlug]/capstone` | Enrolled learner | Course project workspace |
| `/courses/[courseSlug]/visuals` | Enrolled learner or preview-limited | Diagrams may expose course IP |
| `/admin` | Admin | Platform management |
| `/admin/courses` | Admin/instructor | Course management |

## Target API Matrix

| API Route | Access | Notes |
|---|---:|---|
| `GET /api/health` | Public | No sensitive data |
| `GET /api/courses` | Public | Return catalog-safe summaries only |
| `GET /api/courses/[courseSlug]` | Public + private shape split | Public users get marketing summary; enrolled users can get study content |
| `POST /api/courses/seed` | Admin/server secret only | Must never be public |
| `GET /api/progress` | Authenticated + enrolled | Use session user id |
| `PATCH /api/progress` | Authenticated + enrolled | Validate ownership and course access |
| `POST /api/practice/attempts` | Authenticated + enrolled | Save per user, per course |
| `POST /api/interview-practice/analyze` | Authenticated + entitled + rate limited | AI cost and abuse control |
| `GET /api/capstone/progress` | Authenticated + enrolled | Per learner |
| `PATCH /api/capstone/progress` | Authenticated + enrolled | Per learner |

## Recommended Course Entitlement Model

Create a course-specific enrollment collection instead of putting course access directly inside the user document.

### `users`

```ts
{
  _id: ObjectId;
  email: string;
  name?: string;
  image?: string;
  role: "learner" | "admin" | "instructor";
  createdAt: Date;
  updatedAt: Date;
}
```

### `course_entitlements`

```ts
{
  _id: ObjectId;
  userId: ObjectId;
  courseSlug: string;
  accessLevel: "free" | "paid" | "pro" | "admin";
  source: "manual" | "purchase" | "subscription" | "admin_grant" | "preview";
  status: "active" | "expired" | "revoked" | "refunded";
  startsAt: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

Indexes:

```ts
unique { userId: 1, courseSlug: 1 }
{ courseSlug: 1, status: 1 }
{ userId: 1, status: 1 }
```

### `subscriptions`

Use later when billing is introduced.

```ts
{
  _id: ObjectId;
  userId: ObjectId;
  provider: "stripe" | "razorpay";
  providerCustomerId: string;
  providerSubscriptionId?: string;
  plan: "free" | "pro" | "career";
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## Route Guard Strategy

Use layered protection.

### Layer 1: Middleware

Middleware should block broad private page families early:

```text
/dashboard
/my-learning
/courses/:courseSlug/modules
/courses/:courseSlug/capstone
/courses/:courseSlug/visuals
/admin
```

Middleware is good for fast auth redirects, but it should not be the only protection because entitlement checks often need database access.

### Layer 2: Server Page Guards

Every private server page should call a shared guard:

```ts
await requireCourseAccess(courseSlug, {
  minimumAccess: "free" | "paid" | "pro"
});
```

The guard should:

- read the Auth.js session
- redirect to `/sign-in` if signed out
- check `course_entitlements`
- redirect to `/pricing` or `/courses/[courseSlug]` if not enrolled
- return `{ user, entitlement }` for page rendering

### Layer 3: API Guards

Every private API route must use server-side authorization. Never trust the UI to hide buttons.

Recommended helper:

```ts
const access = await requireApiCourseAccess(request, courseSlug);
```

If unauthorized:

```ts
401 signed out
403 signed in but no course access
429 rate limited
```

### Layer 4: Data Ownership Checks

Database queries must always include the authenticated user id:

```ts
{ courseSlug, learnerId: session.user.id }
```

Do not accept `learnerId` from request body or query string.

## Free Preview Model

To support conversion without exposing the full course:

- public course detail page shows curriculum titles, outcomes, and project summary
- allow a small number of preview lectures
- preview lecture route can be:

```text
/courses/[courseSlug]/preview/[lectureId]
```

Preview content should use separate `previewMarkdown` or a redacted subset, not the full lecture body.

## AI Feature Security

AI features need stricter protection because they cost money and process user content.

For `/api/interview-practice/analyze`:

- require session
- require course entitlement
- enforce per-user rate limits
- validate input length
- use `OPENAI_API_KEY` and `OPENAI_MODEL`, currently `gpt-4.1-nano`
- store prompt/answer only if product needs history
- avoid sending private keys to client
- log token/cost metadata, not full sensitive answers by default

Recommended initial limits:

| Plan | AI answer reviews |
|---|---:|
| Free | 3 per day |
| Pro | 50 per day |
| Career | 200 per day |

## Admin Security

Admin routes should require:

- authenticated session
- `user.role === "admin"`
- audit logging for destructive actions
- seed secret for seed routes until proper admin UI exists

The seed route should remain protected by `COURSE_SEED_SECRET`, even after admin auth is added.

## Recommended Implementation Phases

### Phase A: Access Foundation

Status: implemented locally.

1. Add `users` repository and Auth.js user sync.
2. Add `course_entitlements` repository.
3. Add `requireAuth`, `requireCourseAccess`, and `requireAdmin`.
4. Replace `local-learner` with session user id.
5. Gate study routes and APIs.
6. Add temporary free enrollment CTA on the course detail page.

Implemented private route families:

```text
/courses/[courseSlug]/modules
/courses/[courseSlug]/modules/[moduleSlug]
/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]
/courses/[courseSlug]/modules/[moduleSlug]/practice
/courses/[courseSlug]/capstone
/courses/[courseSlug]/visuals
/labs
/interview
```

Implemented private APIs:

```text
GET/PATCH /api/progress
POST      /api/practice/attempts
GET/PATCH /api/capstone/progress
POST      /api/interview-practice/analyze
```

### Phase B: Enrollment Flow

Status: Founder Free launch version implemented.

1. Add `/my-learning`.
2. Add Founder Free claim button on landing, pricing, and course detail pages.
3. Create Pro-style `founder_free` entitlement on claim.
4. Redirect enrolled users to study dashboard.

Founder Free defaults:

- Course: `ai-engineer-guide`
- Access level: `pro`
- Duration: 30 days
- Max redemptions: 25 users
- Payment required: no

### Phase C: Paid Access

1. Add plan-aware access levels.
2. Connect pricing page to checkout.
3. Add subscription webhook handling.
4. Update entitlement status from billing events.

### Phase D: Preview and Conversion

1. Add preview lecture support.
2. Show locked states in curriculum.
3. Add upgrade prompts only where relevant.

### Phase E: Admin and Reporting

1. Add admin dashboard.
2. Add course publish controls.
3. Add learner progress analytics.
4. Add audit logs.

## Immediate Engineering Decision

For the next implementation task, build Phase A first.

The minimum production-safe change is:

- protect private pages
- protect private APIs
- use session user id
- add course entitlements
- create a temporary free enrollment flow for the AI Engineer Guide course

That makes the app behave like a real course platform while keeping payment integration for a later phase.
