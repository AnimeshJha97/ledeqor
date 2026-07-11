# Project Task Tracker

Last updated: 2026-07-12

## Tracking Rules

- This is the single canonical task tracker for the Ledeqor course platform.
- Keep implementation status separate from course-content authoring status.
- Add completed work with a verification note when possible.
- Keep pending work focused on the current product direction: course learning, practice, access, and capstone execution.

## Status Legend

| Status | Meaning |
|---|---|
| Completed | Implemented and verified where possible |
| In progress | Actively being worked on |
| Pending | Not started yet |
| Blocked | Cannot proceed without external action |

## Active Task

| Priority | Task | Status | Notes |
|---|---|---|---|
| P0 | Documentation alignment | In progress | Update product brief, schema docs, access architecture, and task tracker after course-only product cleanup |

## Recently Completed

| Priority | Task | Status | Notes | Verification |
|---|---|---|---|---|
| P0 | Google auth runtime fix | Completed | Added explicit Auth.js host trust handling and documented Google callback URLs | `/api/auth/session` returned 200 locally; `npm.cmd run build` passed |
| P0 | MongoDB connection issue resolution | Completed | Runtime issue was caused by a stopped Atlas instance; app now supports URI fallback and clears failed cached client promises | User confirmed Google login works after reconnecting MongoDB |
| P0 | Course-only product cleanup | Completed | Removed non-course preparation surfaces, removed old AI answer-analysis API, removed old multi-plan pricing, kept Pro with Founder Free offer, and reframed public copy around course learning and project proof | `npm.cmd run build` passed; `/pricing` returned 200 with only the Pro plan; removed routes returned 404 |
| P0 | Mobile drawer UI fix | Completed | Made mobile drawer overlay darker, panel opaque, and drawer shadow stronger; raised desktop side menu layering | `npm.cmd run build` passed; HTTP route checks passed |
| P0 | Task tracker consolidation | Completed | Kept `docs/task-tracker.md` as the canonical tracker and removed duplicate `docs/ledeqor-task-tracker.md` | Documentation-only change |

## Completed Foundations

| Priority | Task | Status | Notes | Verification |
|---|---|---|---|---|
| P0 | Course content foundation | Completed | Built the AI Engineer Guide source content, labs, and capstone planning files | Course source present in `course/`, `labs/`, and `capstone/` |
| P0 | Dark themed course reader app | Completed | Added module pages, Markdown rendering, Mermaid support, lecture maps, collapsible navigation, and dark UI | Build and route checks passed during implementation |
| P0 | Next.js backend foundation | Completed | Added MongoDB driver, DB client, course/progress repositories, API routes, and env example | `npm.cmd run build` passed |
| P0 | Public marketing pages | Completed | Added landing page, courses page, course detail page, pricing page, about page, and shared marketing components | Public routes returned 200 |
| P0 | Google authentication | Completed | Added Auth.js Google provider, auth route, sign-in page, and sign-in/sign-out actions | `npm.cmd run build` passed; runtime verified after MongoDB reconnection |
| P0 | Course-scoped routing | Completed | Added `/courses/[courseSlug]` route family and legacy redirects | Build passed |
| P0 | MongoDB course seeding | Completed | Added seed route that upserts AI Engineer Guide course data into MongoDB | `/api/courses/seed` verified during earlier setup |
| P0 | Access foundation | Completed | Added users, course entitlements, shared page/API guards, private route gating, and session-based learner IDs | Signed-out private routes redirected; APIs returned 401/403 as expected |
| P0 | Founder Free launch flow | Completed | Added Founder Free claim flow, redemption cap, 30-day entitlement expiry, and My Learning entry point | Build passed; claim flow verified after auth/runtime fixes |
| P1 | Study UX | Completed | Added lecture progress statuses, continue-learning flow, module dashboard, lecture pages, study cues, and self-rating | Progress writes and reads verified during implementation |
| P1 | Practice mode | Completed | Added flashcards, quizzes, short-answer writing, coding tasks, saved quiz scores, and saved short answers | Build passed; practice APIs returned 200 |
| P1 | Capstone tracker | Completed | Added course-scoped capstone workspace with build phases, implementation checklist, files, APIs, database tables, acceptance criteria, and persisted checklist state | Build passed; capstone progress API verified |
| P2 | Visual learning library | Completed | Added course-scoped Mermaid diagrams for AI foundations, ingestion, extraction, embeddings, RAG, SaaS architecture, workflows, evaluation, and deployment | `/courses/ai-engineer-guide/visuals` returned 200 |
| P0 | Mobile-first UX pass | Completed | Added real mobile drawers, tightened responsive layouts, added mobile lecture map, and constrained overflow for code/table/diagram content | Build passed; public routes returned 200 |

## Pending: Immediate Priority

| Priority | Task | Status | Notes |
|---|---|---|---|
| P0 | Reseed course document | Pending | After deploying the course-only source updates, call `POST /api/courses/seed` so MongoDB course metadata matches local source |
| P0 | Rotate exposed secrets | Pending | Rotate MongoDB, Google OAuth, and any older AI provider keys that were shared during development |
| P1 | Improve My Learning dashboard | Pending | Show enrolled courses, next lesson, recent progress, and capstone progress in one focused workspace |
| P1 | Add paid billing integration | Pending | Keep a single Pro plan; connect checkout, subscription status, and entitlement updates after the current access model is stable |
| P1 | Add course admin tools | Pending | Add secure course seed/publish controls and basic learner progress visibility |

## Pending: Later Phases

| Priority | Task | Status | Notes |
|---|---|---|---|
| P2 | Preview lecture model | Pending | Add public previews without exposing full course content |
| P2 | Notes per lecture | Pending | Allow learners to save private notes per lecture or module |
| P2 | Search across course content | Pending | Add authenticated search over enrolled course content |
| P3 | Course tutor | Pending | Add a constrained tutor for the active lecture after access, billing, and course workspace are stable |
| P3 | Multi-course expansion | Pending | Add future courses only after the AI Engineer Guide experience is complete and maintainable |

## Blocked / Needs Attention

| Priority | Item | Status | Notes |
|---|---|---|---|
| P0 | Production secrets | Pending | Rotate exposed secrets before production use |
| P0 | Live MongoDB course data | Pending | Live course content may still include old seeded modules until reseeded |

## Current Route Structure

| Route | Purpose | Status |
|---|---|---|
| `/` | Platform landing page | Completed |
| `/courses` | Course catalog | Completed |
| `/courses/[courseSlug]` | Course detail page | Completed for AI Engineer Guide |
| `/pricing` | Pro plan and Founder Free offer | Completed |
| `/about` | Platform about page | Completed |
| `/sign-in` | Google sign-in page | Completed |
| `/my-learning` | Authenticated learning dashboard | Completed; needs richer dashboard work |
| `/courses/[courseSlug]/modules` | Course-scoped module dashboard | Completed |
| `/courses/[courseSlug]/modules/[moduleSlug]` | Module detail | Completed |
| `/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]` | Lecture reader | Completed |
| `/courses/[courseSlug]/modules/[moduleSlug]/practice` | Practice mode | Completed |
| `/courses/[courseSlug]/capstone` | Capstone build tracker | Completed |
| `/courses/[courseSlug]/visuals` | Visual learning library | Completed |
| `/labs` | Lab index | Completed |
