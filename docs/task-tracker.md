# Project Task Tracker

Last updated: 2026-06-01

## Tracking Rules

- Update this file before starting implementation work.
- Mark the active task as `In progress`.
- After completing a task, update status, notes, and verification.
- Keep priorities explicit so the next task is obvious.
- Do not mix course content progress with product/app implementation progress.

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
| P3 | Phase 5: AI Tutor Later | Pending | Next major phase after access foundation, learning system, practice mode, capstone tracker, visual library, and mobile-first UX pass |

## Completed Tasks

| Priority | Task | Status | Notes | Verification |
|---|---|---|---|---|
| P0 | Complete course content Modules 0-15 | Completed | All course modules expanded with lectures, labs/assignments, quizzes, answer keys, interview prompts, and source links | `npm.cmd run build` passed |
| P0 | Build dark themed course reader app | Completed | Added module pages, Markdown rendering, Mermaid support, lecture maps, collapsible sidebar, dark UI | Route checks and build passed |
| P0 | Fix Module 0 UI bugs | Completed | Fixed horizontal overflow, lecture anchor scrolling, sidebar hide/open behavior | Manual route testing during prior phase |
| P0 | Add Next.js backend foundation | Completed | Added MongoDB driver, DB client, repositories, course/progress schema, API routes, env example, schema docs | `npm.cmd run build` passed |
| P0 | Add `.env.local` | Completed | Added MongoDB URI, DB name, and 32-character course seed secret | File created; ignored by git |
| P0 | Build public marketing pages | Completed | Added landing page, courses page, AI Engineer Guide course detail page, about page, reusable marketing components | Production route checks returned 200 |
| P0 | Add pricing page | Completed | Added 3 tiers: Free, Pro, Career | Build passed |
| P0 | Add Google auth scaffolding | Completed | Installed `next-auth@beta`, added Google provider config, auth route, sign-in page, sign-in/sign-out action component | Build passed; `/api/auth/session` needs runtime fix |
| P0 | Add course-scoped route structure | Completed | Added `/courses/[courseSlug]/modules` and `/courses/[courseSlug]/modules/[moduleSlug]`; legacy `/modules` redirects | Build passed; page routes returned 200 |
| P1 | Add Gemini interview analysis API foundation | Completed | Added one-answer-at-a-time API endpoint using `gemini-2.5-flash` | Build passed; live Gemini call not yet verified |
| P0 | Create project task tracker | Completed | Added a living Markdown tracker for completed, active, pending, blocked, and phase-based work | Created `docs/task-tracker.md` |
| P0 | Auth session runtime | Completed | User will verify after deployment and Google Console redirect URL configuration; local auth/session issue is not blocking current work | Build passed; deployment configuration pending outside local app |
| P0 | Seed current course into MongoDB | Completed | Added `MONGODB_DIRECT_URI` fallback to bypass local SRV lookup issue, connected to Atlas, and seeded `ai-engineer-guide` course | `/api/health` returned 200; `/api/courses/seed` returned 200; seeded 16 modules and 271 lectures |
| P0 | Move UI reads toward course-scoped data | Completed | Added server-side course study adapter that reads MongoDB course data with Markdown fallback | Build passed; scoped module/lecture/practice routes returned 200 |
| P0 | Phase 1: Better Study UX | Completed | Added lecture progress statuses, continue learning card, module dashboard, lecture-focused pages, structured study cues, self-rating, and course-scoped dashboard progress | Build passed; progress writes returned 200; progress read showed saved lecture and rating |
| P1 | Phase 2: Practice Mode | Completed | Added flashcards, interactive quizzes with saved scores, short-answer writing with saved attempts, interview prompts, Gemini answer analysis endpoint, coding task prompts, and lecture self-rating | Build passed; quiz/progress/short-answer APIs returned 200; Gemini high-demand failure handled cleanly |
| P1 | Phase 3: Capstone Build Tracker | Completed | Added course-scoped capstone workspace with 10 product build phases, checklist progress, theory/files/API/database/acceptance/interview story sections, and MongoDB progress persistence | `npm.cmd run build` passed; `/courses/ai-engineer-guide/capstone` returned 200; capstone progress PATCH/GET returned 200 |
| P2 | Phase 4: Visual Learning | Completed | Added course-scoped visual learning library with Mermaid diagrams for AI foundations, ingestion, extraction, embeddings, RAG, SaaS architecture, workflows, evaluation, and deployment | `npm.cmd run build` passed; `/courses/ai-engineer-guide/visuals` returned 200 |
| P0 | Fix Auth.js missing secret error | Completed | Passed `AUTH_SECRET` explicitly into the NextAuth config instead of relying on auto-detection | `npm.cmd run build` passed |
| P0 | Security and route access architecture | Completed | Defined public/authenticated/enrolled/paid/admin access model, Udemy-inspired access patterns, route/API matrices, entitlement schema, guard layers, and implementation phases | Added `docs/security-route-access-architecture.md` |
| P0 | Implement access foundation | Completed | Added Auth.js user sync, `users` and `course_entitlements`, shared page/API guards, temporary free enrollment CTA, private route gating, API gating, and session-based learner ids | `npm.cmd run build` passed; signed-out private study routes redirected to `/sign-in`; signed-out progress API returned 401; public course API no longer returns Markdown |
| P0 | Rebrand application to Ledeqor | Completed | Updated platform/app naming to Ledeqor by Arkion Labs while keeping AI Engineer Guide as the flagship course and Arkion DocIntel as its capstone project | `npm.cmd run build` passed |
| P0 | Pricing tiers and offer campaign schema | Completed | Updated pricing to two INR paid tiers: Pro Rs. 499/month and Career Rs. 799/month. Added active 100% early-bird campaign for Pro and fixed Best value badge wrapping | `npm.cmd run build` passed |
| P0 | Switch AI analysis provider to OpenAI GPT-4.1 nano | Completed | Updated interview answer analysis to use OpenAI Responses API with `OPENAI_API_KEY` and `OPENAI_MODEL`, defaulting to `gpt-4.1-nano`; updated env example and security docs | `npm.cmd run build` passed |
| P1 | Ledeqor product brief | Completed | Created detailed product brief covering product idea, current capabilities, access model, pricing direction, upgrade roadmap, future course ideas, moat, metrics, risks, and near-term priorities | Added `docs/ledeqor-product-brief.md` |
| P0 | Founder Free launch sprint | Completed | Implemented Founder Free Pro-style claim flow, 25-user redemption cap, 30-day entitlement expiry, `/my-learning` dashboard lite, launch CTAs/copy, feedback CTA config, and schema docs | `npm.cmd run build` passed; `/`, `/pricing`, `/courses/ai-engineer-guide` returned 200; signed-out `/my-learning` redirected to `/sign-in` |
| P0 | Mobile-first UX upgrade | Completed | Added real mobile drawers for marketing and study shells, moved tablet/narrow navigation into drawers, added mobile lecture map, tightened lecture/practice/capstone/visual responsiveness, and constrained code/table/diagram overflow | `npm.cmd run build` passed; public routes returned 200; protected study routes returned 307 when signed out; headless mobile screenshot pass identified and informed header breakpoint fix |

## In Progress

| Priority | Task | Status | Notes | Next Step |
|---|---|---|---|---|
| P2 | Platform naming and repositioning | Completed | Final platform name is Ledeqor by Arkion Labs. Keep AI Engineer Guide as the flagship course and Arkion DocIntel as its capstone project. | UI branding updated |

## Pending: Immediate Priority

| Priority | Task | Status | Notes |
|---|---|---|---|
| P0 | Rotate exposed secrets | Pending | MongoDB, Google OAuth, Gemini keys were pasted in chat and should be rotated |
| P1 | Implement My Learning dashboard | Pending | Show authenticated user's enrolled courses and continue-learning state |
| P1 | Add paid plan enforcement | Pending | Connect pricing tiers to entitlement access levels after billing is added |
| P0 | Progress tracking + Continue Learning | Completed | Implemented as part of Phase 1 |

## Pending: Phase 1 - Better Study UX

| Priority | Task | Status | Notes |
|---|---|---|---|
| P0 | Lecture progress tracking | Completed | Per lecture: Not started, Reading, Done, Needs revision |
| P0 | Continue Learning button | Completed | Jumps to next unfinished lecture |
| P1 | Module dashboard | Completed | Shows completed lectures, pending lectures, quiz score, lab status, and progress bar |
| P1 | Better lecture layout | Completed | Added focused lecture pages with concept/product/interview/mini-task study cues and self-rating |

## Pending: Phase 2 - Practice Mode

| Priority | Task | Status | Notes |
|---|---|---|---|
| P1 | Flashcards | Completed | Generated per module from lecture titles |
| P1 | Quizzes | Completed | Module-level interactive quiz with saved score |
| P1 | Short-answer practice | Completed | User writes and saves answers to MongoDB |
| P1 | Interview-style explanation prompts | Completed | Practice prompts plus Gemini-backed one-answer analysis endpoint |
| P2 | Coding tasks | Completed | Course/project-specific implementation prompts shown in Practice Mode |
| P2 | Self-rating after each lecture | Completed | Confidence rating saved per lecture |

## Pending: Phase 3 - Capstone Build Tracker

| Priority | Task | Status | Notes |
|---|---|---|---|
| P1 | Capstone workspace | Completed | Course-specific project workspace |
| P1 | Phase checklist UI | Completed | Project setup, upload, classification, extraction, search, RAG, comparison, workflows, evals, polish |
| P1 | Capstone phase detail model | Completed | Theory needed, files to create, API routes, DB tables, acceptance criteria, interview story unlocked |

## Pending: Phase 4 - Visual Learning

| Priority | Task | Status | Notes |
|---|---|---|---|
| P2 | Diagram library | Completed | Reusable Mermaid visual library |
| P2 | Add high-value diagrams | Completed | AI hierarchy, ingestion, extraction, embeddings, RAG, SaaS, agents, evals, deployment |

## Pending: Phase 5 - AI Tutor Later

| Priority | Task | Status | Notes |
|---|---|---|---|
| P3 | Current lecture Q&A tutor | Pending | Ask questions about the active lecture |
| P3 | Confusing term explainer | Pending | Short contextual explanations |
| P3 | Practice question generator | Pending | Generate limited practice prompts |
| P3 | Mock interview mode | Pending | AI-guided interview loop |
| P3 | Written answer review | Pending | Gemini-backed evaluation, limited usage |
| P3 | Next study step suggestions | Pending | Personalized guidance based on progress |

## Blocked / Needs Attention

| Priority | Item | Status | Notes |
|---|---|---|---|
| P0 | MongoDB Atlas health check | Completed | Connected successfully using direct MongoDB URI fallback |
| P0 | Secret rotation | Pending | Rotate exposed MongoDB, Google OAuth, and Gemini credentials |

## Route Structure Target

| Route | Purpose | Status |
|---|---|---|
| `/` | Platform landing page | Completed |
| `/courses` | Multi-course catalog | Completed |
| `/courses/[courseSlug]` | Course detail / sales page | Completed for `/courses/ai-engineer-guide` |
| `/courses/[courseSlug]/modules` | Course-scoped module dashboard | Completed for AI Engineer Guide |
| `/courses/[courseSlug]/modules/[moduleSlug]` | Course-scoped module detail | Completed for AI Engineer Guide |
| `/courses/[courseSlug]/capstone` | Course-scoped capstone build tracker | Completed for AI Engineer Guide |
| `/courses/[courseSlug]/visuals` | Course-scoped visual diagram library | Completed for AI Engineer Guide |
| `/pricing` | Pricing page | Completed |
| `/about` | Platform about page | Completed |
| `/sign-in` | Google sign-in page | Completed; runtime auth needs verification |
