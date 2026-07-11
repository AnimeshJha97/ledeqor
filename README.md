# Ledeqor

Ledeqor is a project-driven learning platform by Arkion Labs for developers who want to upgrade into current, new, and future-ready technology roles.

The first flagship course is the **AI Engineer Guide**, a complete applied AI engineering path built around a real capstone project: **Arkion DocIntel**, an AI document intelligence SaaS platform.

## What This Repository Contains

This repository contains the course content, learning web app, labs, capstone planning, architecture docs, and product documentation for Ledeqor.

The platform is designed to support multiple future courses. Each course can have its own modules, lectures, labs, capstone project, visual diagrams, practice mode, progress tracking, and access rules.

## Current Product State

Ledeqor currently includes:

- Public landing page
- Course catalog
- AI Engineer Guide course detail page
- Pricing page with INR tiers
- About page
- Google authentication through Auth.js
- Course entitlement and access foundation
- Founder Free launch campaign
- Authenticated My Learning workspace
- Course-scoped module routes
- Lecture progress tracking
- Continue Learning flow
- Module dashboard
- Lecture detail pages
- Flashcards, quizzes, short answers, coding tasks, and self-rating
- OpenAI-backed interview answer analysis using `gpt-4.1-nano`
- Capstone build tracker
- Visual learning library with Mermaid diagrams
- Mobile-first navigation and responsive study experience

## Flagship Course

### AI Engineer Guide

The AI Engineer Guide helps a senior full-stack MERN developer transition into applied AI engineering.

The course covers:

- Career strategy and AI role positioning
- Python for AI engineering
- AI, ML, generative AI, and LLM foundations
- Document AI fundamentals
- LLM API engineering
- Structured document extraction
- Embeddings, vector search, and semantic search
- RAG for business documents
- Full-stack AI SaaS architecture
- Agentic document workflows
- AI evaluation, testing, and observability
- AI security, privacy, and compliance
- Deployment, scaling, and LLMOps
- Capstone build execution
- AI engineer interview preparation
- Resume, LinkedIn, and job strategy

### Capstone: Arkion DocIntel

Arkion DocIntel is a B2B SaaS document intelligence platform where businesses can upload documents and use AI to:

- Understand documents
- Extract structured fields
- Classify document types
- Search semantically
- Ask questions with citations
- Compare documents
- Summarize business documents
- Detect risks and missing information
- Trigger controlled document workflows
- Export structured data

The capstone exists to create a stronger interview story than a basic chatbot project.

## Repository Structure

```text
orvion-docintel-ai-engineer-course/
  apps/
    course-web/                  # Next.js Ledeqor web app
  course/                        # Markdown course source
  labs/                          # Hands-on module labs
  capstone/                      # Arkion DocIntel product build docs
  docs/                          # Architecture, schema, product, and task docs
  portfolio/                     # Portfolio and career assets
  templates/                     # Reusable course/project templates
  app-plan/                      # Planning material
```

## Web App

The Next.js app lives in:

```text
apps/course-web
```

### Run Locally

```powershell
cd apps/course-web
npm.cmd install
npm.cmd run dev -- --port 3001
```

Open:

```text
http://localhost:3001
```

### Build

```powershell
cd apps/course-web
npm.cmd run build
```

## Environment Variables

Create:

```text
apps/course-web/.env.local
```

Use `apps/course-web/.env.example` as the template.

Required variables:

```text
MONGODB_URI=
MONGODB_DIRECT_URI=
MONGODB_DB=
COURSE_SEED_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
AUTH_TRUST_HOST=true
AI_PROVIDER=openai
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-nano
FOUNDER_FREE_MAX_REDEMPTIONS=25
NEXT_PUBLIC_FEEDBACK_FORM_URL=
```

Important: secrets were shared during development and should be rotated before production use.

For Google OAuth, add the exact callback URL for each environment in Google Cloud Console. With the local command above, the development redirect URI is:

```text
http://localhost:3001/api/auth/callback/google
```

Production should use the same path on the deployed domain, for example `https://your-domain.com/api/auth/callback/google`.

## Main Routes

| Route | Purpose |
|---|---|
| `/` | Public landing page |
| `/courses` | Course catalog |
| `/courses/ai-engineer-guide` | Flagship course detail page |
| `/pricing` | Pricing and Founder Free offer |
| `/about` | Platform about page |
| `/sign-in` | Google sign-in page |
| `/my-learning` | Authenticated learning dashboard |
| `/courses/[courseSlug]/modules` | Course module dashboard |
| `/courses/[courseSlug]/modules/[moduleSlug]` | Module detail page |
| `/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]` | Lecture study page |
| `/courses/[courseSlug]/modules/[moduleSlug]/practice` | Practice mode |
| `/courses/[courseSlug]/capstone` | Capstone build tracker |
| `/courses/[courseSlug]/visuals` | Visual learning library |

## Architecture Snapshot

Frontend:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Dark mobile-first UI
- Mermaid diagrams

Backend inside Next.js:

- App Router API routes
- MongoDB repositories
- Auth.js Google authentication
- Course access and entitlement guards
- Progress, practice, and capstone persistence
- OpenAI interview answer analysis endpoint

Database:

- `courses`
- `course_progress`
- `practice_attempts`
- `capstone_progress`
- `users`
- `course_entitlements`
- pricing/offer campaign data model

## Access Model

Public users can view:

- Landing page
- Courses page
- Pricing page
- About page
- Course preview/detail page

Authenticated and entitled users can access:

- My Learning
- Full module pages
- Lecture pages
- Practice mode
- Capstone tracker
- Visual library
- Progress APIs
- Practice APIs
- Capstone progress APIs

The current launch flow includes Founder Free access for early users.

## Pricing Direction

The current paid tiers are INR-based:

- Pro: Rs. 499
- Career: Rs. 799

The Pro tier currently supports an early-bird campaign that can discount the plan by percentage. During launch, the active campaign makes Pro available for free to a limited number of users.

## Current Verification

Recent verified checks:

- `npm.cmd run build` passes
- Public routes return `200`
- Protected study routes redirect signed-out users
- Mobile-first navigation and study layout pass implemented
- MongoDB course seed completed for AI Engineer Guide
- Course content seeded with 16 modules and 271 lectures

## Key Documentation

- `docs/task-tracker.md`
- `docs/database-schema.md`
- `docs/security-route-access-architecture.md`
- `docs/ledeqor-product-brief.md`
- `capstone/arkion-docintel-blueprint.md`
- `COURSE_CREATION_PLAN.md`

## Next Priorities

- Rotate exposed secrets before production
- Expand My Learning into a multi-course dashboard
- Add paid plan enforcement after billing integration
- Add AI tutor features after the learning system is stable
- Prepare deployment and production environment configuration

## Positioning

Ledeqor is not a generic tutorial site.

It is a project-first learning platform where every serious course should produce:

- Deep conceptual understanding
- A real portfolio project
- Hands-on labs
- Practice and interview readiness
- Architecture explanations
- Career assets
- A launchable product story
