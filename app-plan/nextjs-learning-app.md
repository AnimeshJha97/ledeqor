# Next.js Learning App Plan

## Purpose

The learning app turns the course source into an interactive study experience.

The course should be useful even before the app exists. The app improves navigation, progress tracking, quizzes, and portfolio polish.

## Suggested Features

- Dashboard with 8-week progress
- Module list
- Lecture reader
- Lab view
- Quiz mode
- Capstone phase tracker
- Interview flashcards
- Search across course content
- Notes per lecture
- Completion status

## Navigation UX Rules

The app has two navigation modes.

### Global Mode

On dashboard, modules, labs, and interview index pages:

- Dashboard opens the course overview.
- Modules opens the full module list.
- Labs opens a lab index across all modules.
- Interview opens an interview-prep index across completed modules.

### Module Reader Mode

Inside a specific module:

- Dashboard still opens the course overview.
- Modules opens the full module list.
- Labs jumps to that module's lab section when a lab exists.
- Interview jumps to that module's interview questions section when it exists.

This keeps the side menu useful while studying. The user should not lose their place by clicking Labs or Interview inside a module.

## Lab UX Decision

Labs should be part of the course app, not only external notebooks.

Use this rule:

- Local project labs are primary.
- Google Colab is optional for isolated experiments.

Reason:

Arkion DocIntel is a production-style SaaS capstone. The important skills are local development, API services, project structure, tests, environment variables, background jobs, database integration, and deployment. Colab is useful for quick AI/ML experiments, but it does not teach the production workflow deeply enough.

### Recommended Lab Pattern

Each lab should include:

- Product goal
- Concept recap
- Files to create or edit
- Step-by-step implementation
- Expected result
- Debugging notes
- Acceptance criteria
- Interview explanation

### When To Use Google Colab

Use Colab only for:

- visualizing embeddings
- quick cosine similarity demos
- small ML concept experiments
- comparing chunking strategies on sample text
- testing OCR or extraction ideas before product integration

Do not use Colab as the main capstone build environment.

## Suggested Tech Stack

- Next.js
- TypeScript
- MDX
- Tailwind CSS
- shadcn/ui
- Local JSON progress first
- PostgreSQL progress later

## App Routes

```text
/                         Dashboard
/modules                  Module index
/modules/[moduleSlug]     Module detail
/lectures/[lectureSlug]   Lecture reader
/labs                     Lab index
/capstone                 Capstone tracker
/interview                Interview prep
/portfolio                Portfolio assets
```

## Build Timing

Build the app after Module 0 and Module 1 have real content. That gives the app enough material to validate the reading experience.
