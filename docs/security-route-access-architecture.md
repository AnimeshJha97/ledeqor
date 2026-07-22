# Security and Route Access Architecture

Last updated: 2026-07-12

## Purpose

Ledeqor separates public course discovery from private course consumption. Public visitors should be able to understand the platform, review available courses, view pricing, and sign in. Full course study, practice, progress, capstone work, and private diagrams require authentication and course access.

This document defines the production access model for:

- public pages;
- signed-in user pages;
- enrolled course pages;
- Pro course access;
- admin/instructor routes;
- API route authorization;
- database ownership checks.

## Access Principles

1. Public pages can explain the course and product outcome, but must not expose full paid course content.
2. Authentication identifies the learner, but entitlement determines course access.
3. Course access must be enforced on the server, not only hidden in the UI.
4. Learner-owned data must always be scoped by authenticated user id.
5. Admin and seed operations require stronger checks than learner routes.
6. Pricing should stay simple until billing and entitlement workflows are mature.

## Access Levels

### 1. Public Visitor

No sign-in required.

Can access:

- landing page;
- course catalog;
- public course detail page;
- pricing;
- about;
- sign-in;
- health check;
- catalog-safe course summaries.

Cannot access:

- full modules;
- full lecture pages;
- progress state;
- practice submissions;
- capstone checklist;
- private visual library;
- My Learning.

### 2. Authenticated User

Signed in, but may not yet have course access.

Can access:

- My Learning shell;
- owned/enrolled course list;
- enrollment or claim flows;
- public course pages.

Cannot access private course content unless an active entitlement exists.

### 3. Enrolled Learner

Signed in and has active access to a specific course.

Can access:

- course module dashboard;
- module pages;
- lecture pages;
- practice mode;
- saved quiz scores;
- saved short answers;
- progress tracking;
- capstone tracker;
- visual learning library;
- lab index.

### 4. Pro Learner

Signed in and has a Pro-level entitlement for a course.

Can access:

- all enrolled learner features;
- all currently available private course workspace features;
- future Pro course updates where applicable.

The current paid plan is Pro only. Founder Free grants temporary Pro-style access through a campaign entitlement.

### 5. Admin / Instructor

Can later access:

- course authoring;
- seed/publish tools;
- learner analytics;
- campaign management;
- billing/admin settings;
- moderation and audit logs;
- support tooling.

Admin routes must check the authenticated user role server-side.

## Current Route Matrix

| Route | Access | Reason |
|---|---:|---|
| `/` | Public | Platform landing |
| `/courses` | Public | Course catalog |
| `/courses/[courseSlug]` | Public | Course detail page |
| `/pricing` | Public | Pro plan and Founder Free offer |
| `/about` | Public | Platform context |
| `/sign-in` | Public when signed out | Auth entry |
| `/my-learning` | Authenticated | Learner workspace |
| `/labs` | Enrolled learner | Course lab index |
| `/courses/[courseSlug]/modules` | Enrolled learner | Private course content |
| `/courses/[courseSlug]/modules/[moduleSlug]` | Enrolled learner | Private module content |
| `/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]` | Enrolled learner | Private lecture body |
| `/courses/[courseSlug]/modules/[moduleSlug]/practice` | Enrolled learner | Practice and saved answers |
| `/courses/[courseSlug]/capstone` | Enrolled learner | Course project workspace |
| `/courses/[courseSlug]/visuals` | Enrolled learner | Private course diagrams |
| `/admin` | Admin | Future platform management |
| `/admin/courses` | Admin/instructor | Future course management |

## Current API Matrix

| API Route | Access | Notes |
|---|---:|---|
| `GET /api/health` | Public | No sensitive data |
| `GET /api/courses` | Public | Catalog-safe summaries only |
| `GET /api/courses/[courseSlug]` | Public + private shape split | Public users get summary; enrolled users can get study content |
| `POST /api/courses/seed` | Server secret / admin later | Requires `COURSE_SEED_SECRET` when configured |
| `GET /api/progress` | Authenticated + enrolled | Uses session user id |
| `PATCH /api/progress` | Authenticated + enrolled | Validates course access and ownership |
| `POST /api/practice/attempts` | Authenticated + enrolled | Saves short-answer attempts per user and course |
| `GET /api/capstone/progress` | Authenticated + enrolled | Reads learner capstone state |
| `PATCH /api/capstone/progress` | Authenticated + enrolled | Updates learner capstone checklist |

## Entitlement Model

Use a course-specific entitlement collection instead of storing access directly in the user document.

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
  userId: ObjectId | string;
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

Recommended indexes:

```ts
unique { userId: 1, courseSlug: 1 }
{ courseSlug: 1, status: 1 }
{ userId: 1, status: 1 }
{ campaignId: 1, status: 1 }
```

### `subscriptions`

Use later when billing is introduced.

```ts
{
  _id: ObjectId;
  userId: ObjectId | string;
  provider: "stripe" | "razorpay";
  providerCustomerId: string;
  providerSubscriptionId?: string;
  plan: "pro";
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## Guard Strategy

Use layered protection.

### Layer 1: High-Level Route Control

Middleware or proxy can be used later for fast redirects on broad private route families:

```text
/my-learning
/labs
/courses/:courseSlug/modules
/courses/:courseSlug/capstone
/courses/:courseSlug/visuals
/admin
```

This layer improves UX, but it must not be the only protection.

### Layer 2: Server Page Guards

Every private server page should call a shared guard:

```ts
await requireCourseAccess(courseSlug, {
  minimumAccess: "free" | "paid" | "pro"
});
```

The guard should:

- read the Auth.js session;
- redirect to `/sign-in` if signed out;
- check `course_entitlements`;
- redirect to the public course detail page if not enrolled;
- return `{ user, entitlement }` for page rendering.

### Layer 3: API Guards

Every private API route must use server-side authorization. Never trust the UI to hide controls.

Recommended helper:

```ts
const access = await requireApiCourseAccess(courseSlug);
```

If unauthorized:

```ts
401 signed out
403 signed in but no course access
```

### Layer 4: Data Ownership Checks

Database queries must always include the authenticated user id:

```ts
{ courseSlug, learnerId: session.user.id }
```

Never accept `learnerId` from request body or query string.

## Founder Free Access

Founder Free is a launch campaign that grants Pro-style access to the AI Engineer Guide.

Defaults:

- Course: `ai-engineer-guide`
- Access level: `pro`
- Duration: 30 days
- Max redemptions: 25 users
- Payment required: no

Claim flow:

1. User clicks Founder Free CTA.
2. If signed out, Auth.js redirects to Google sign-in.
3. User is synced into `users`.
4. Claim action checks existing entitlement.
5. Claim action checks redemption cap.
6. Claim action creates a `course_entitlements` document.
7. User is redirected to My Learning.

## Practice and Progress Security

Practice and progress routes must:

- require authentication;
- require course entitlement;
- validate course and module slugs;
- use session user id as `learnerId`;
- reject empty or malformed input;
- avoid exposing another learner's progress.

Current practice scope is short-answer persistence. Any future AI-assisted practice should add usage limits, cost controls, and clear fallback behavior before release.

## Admin Security

Admin routes should require:

- authenticated session;
- `user.role === "admin"`;
- audit logging for destructive actions;
- seed secret for seed routes until a proper admin UI exists.

The seed route should remain protected by `COURSE_SEED_SECRET`, even after admin auth is added.

## Preview Model

To support conversion without exposing the full course:

- public course detail page shows curriculum titles, outcomes, and project summary;
- selected preview content can be added later;
- preview content should use a redacted or dedicated preview field, not the full private lecture body.

Potential future route:

```text
/courses/[courseSlug]/preview/[lectureId]
```

## Implementation Status

Implemented private route families:

```text
/my-learning
/labs
/courses/[courseSlug]/modules
/courses/[courseSlug]/modules/[moduleSlug]
/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]
/courses/[courseSlug]/modules/[moduleSlug]/practice
/courses/[courseSlug]/capstone
/courses/[courseSlug]/visuals
```

Implemented private APIs:

```text
GET/PATCH /api/progress
POST      /api/practice/attempts
GET/PATCH /api/capstone/progress
```

Removed or intentionally out of scope:

```text
standalone non-course preparation route
standalone AI answer-analysis API
extra paid plan tiers beyond Pro
```

## Next Security Priorities

1. Rotate exposed development secrets.
2. Reseed MongoDB so live course data matches current source.
3. Add billing webhook verification when paid Pro checkout is introduced.
4. Add admin-only course seed/publish controls.
5. Add rate limits before introducing any cost-bearing AI feature.
