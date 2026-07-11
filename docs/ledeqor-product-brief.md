# Ledeqor Product Brief

Last updated: 2026-07-12

## Product Name

Ledeqor

## Owner

Arkion Labs

## Product Summary

Ledeqor is a project-driven course platform for software developers who want to learn modern applied technology through structured lessons, hands-on practice, and production-style capstone builds.

The platform is not a generic course library and not a content dump. It is designed around a simple learning loop:

1. Study a focused concept.
2. Practice the concept through recall, quizzes, and short answers.
3. Apply the concept inside a real course project.
4. Track progress through modules, lectures, labs, diagrams, and capstone phases.
5. Leave each course with a working product artifact and a clear understanding of the system behind it.

The flagship course is the AI Engineer Guide. Its capstone project is Arkion DocIntel, a document intelligence SaaS concept that teaches document processing, LLM API engineering, structured extraction, embeddings, RAG, workflows, evaluation, security, and deployment.

## Product Positioning

Ledeqor is a learning platform for serious project-based technical education.

It should feel like a quiet, focused course workspace: practical, structured, and implementation-oriented. The product should help learners understand why a system is built a certain way, how the pieces fit together, and how to turn lessons into working software.

The platform should not be positioned as a general productivity tool, social learning network, hiring service, or personal branding product. Its value comes from course design, learning structure, project execution, and durable technical understanding.

## Core Problem

Many technical courses teach isolated concepts without connecting them to a realistic product. Learners can finish a tutorial and still struggle with questions like:

- How does this concept fit into a real application?
- Which files, APIs, database records, queues, and UI states would exist in production?
- How should the system handle failure, privacy, cost, and reliability?
- How can progress be tracked without losing course context?
- How can practice be tied to implementation instead of disconnected quizzes?

For applied AI engineering, this gap becomes sharper. A learner may understand prompts or model APIs, but still not understand document ingestion, chunking, retrieval quality, citations, structured outputs, workflow boundaries, evaluation, or deployment tradeoffs.

Ledeqor exists to close that gap by making every course product-shaped.

## Why This Product Exists

Ledeqor is built on the belief that advanced technical learning should be organized around real systems, not just readings or videos.

A strong course should:

- explain concepts in sequence;
- show how concepts support product capabilities;
- include practice that improves recall;
- include labs that move the project forward;
- provide diagrams for mental models;
- track learner progress;
- protect paid/private course content;
- make the capstone implementation visible and measurable.

The first implementation focuses on a single flagship course because the platform needs one complete, high-quality course experience before scaling into a catalog.

## Target Learner

The initial target learner is an experienced web developer who understands application development and wants a structured path into applied AI engineering.

This learner benefits from:

- clear sequencing;
- concise explanations;
- product-oriented examples;
- practical labs;
- architecture diagrams;
- progress tracking;
- a capstone plan that turns learning into implementation.

The platform can later support other learner levels and course categories, but the first course is intentionally tuned for developers who already know how software products are built.

## Flagship Course

### AI Engineer Guide

The AI Engineer Guide is the first complete course inside Ledeqor.

It teaches applied AI engineering through the Arkion DocIntel capstone. The course moves from foundations into product implementation, covering:

- product direction and learning strategy;
- Python for AI engineering;
- AI, ML, generative AI, and LLM foundations;
- document AI fundamentals;
- LLM API engineering;
- structured document extraction;
- embeddings and vector search;
- RAG for business documents;
- full-stack AI SaaS architecture;
- agentic document workflows;
- AI evaluation and observability;
- AI security, privacy, and compliance;
- deployment, scaling, and LLMOps;
- capstone build execution.

### Capstone: Arkion DocIntel

Arkion DocIntel is a B2B SaaS-style document intelligence project. In the course context, it acts as the organizing product that makes abstract AI concepts concrete.

The capstone teaches how to design and implement a system that can:

- upload and store business documents;
- parse document text and metadata;
- classify document types;
- extract structured fields;
- generate embeddings;
- search semantically;
- answer questions with source citations;
- compare documents;
- run controlled AI workflows;
- evaluate output quality;
- track usage, reliability, and limitations;
- prepare for production deployment.

The capstone is not just a final assignment. It is the thread that connects the course modules.

## Current Product Scope

Ledeqor currently includes:

- public landing page;
- course catalog;
- AI Engineer Guide course detail page;
- Pro pricing page with Founder Free launch offer;
- about page;
- Google authentication through Auth.js;
- authenticated My Learning workspace;
- course entitlement and access foundation;
- course-scoped module dashboard;
- course-scoped module detail pages;
- lecture reader pages;
- lecture progress states;
- continue-learning flow;
- module progress summaries;
- flashcards;
- quizzes;
- short-answer practice;
- coding task prompts;
- lecture self-rating;
- capstone build tracker;
- capstone checklist persistence;
- visual learning library with Mermaid diagrams;
- protected APIs for progress, practice attempts, and capstone progress;
- MongoDB-backed course and learner state;
- mobile-first navigation with drawer menus.

## Current Product Boundaries

The platform should stay focused on course learning and project execution.

Current non-goals:

- no public learner social network;
- no generalized content marketplace;
- no hiring workflow;
- no standalone personal branding workflow;
- no separate preparation product outside the course experience;
- no multi-plan packaging beyond the single Pro course subscription;
- no broad AI assistant surface until the course workspace is stable.

These boundaries keep the product coherent and easier to complete.

## Subscription Model

The product has one paid plan:

### Pro

- Price: Rs. 499/month
- Access: full course workspace for enrolled courses
- Includes: modules, lectures, practice, labs, visual library, capstone tracker, and future course updates where applicable

### Founder Free Launch Offer

During the launch period, the Founder Free campaign grants Pro-style access to early learners.

Current defaults:

- Course: `ai-engineer-guide`
- Access level: `pro`
- Discount: 100%
- Max redemptions: 25
- Duration: 30 days
- Payment required: no

This offer is intended to validate the course experience, onboarding flow, entitlement model, and learner progress loop before billing is connected.

## Access Model

The platform separates public discovery from private course consumption.

Public visitors can access:

- landing page;
- course catalog;
- public course detail page;
- pricing page;
- about page;
- sign-in page;
- selected catalog-safe course metadata.

Authenticated and entitled learners can access:

- My Learning;
- private module dashboard;
- full module content;
- lecture pages;
- practice mode;
- capstone tracker;
- visual library;
- progress APIs;
- practice APIs;
- capstone APIs.

Admin and instructor capabilities are planned later for course management, learner analytics, and support operations.

## Core User Flows

### Public Discovery

1. Visitor lands on the homepage.
2. Visitor reviews the course value proposition.
3. Visitor opens the AI Engineer Guide course detail page.
4. Visitor sees modules, product outcome, capstone direction, and Founder Free offer.
5. Visitor signs in with Google to claim access.

### Founder Free Enrollment

1. Signed-out visitor clicks Claim Founder Free Access.
2. App redirects to Google sign-in.
3. Auth callback syncs the user into MongoDB.
4. The claim action checks campaign limits.
5. App grants a Pro-style course entitlement.
6. Learner lands in My Learning or the course workspace.

### Study Session

1. Learner opens My Learning.
2. Learner continues from the next unfinished lecture.
3. Learner reads the lecture.
4. Learner marks progress and optionally self-rates confidence.
5. Learner uses practice mode for recall and applied thinking.
6. Progress persists to MongoDB.

### Capstone Session

1. Learner opens the capstone tracker.
2. Learner chooses a build phase.
3. Learner reviews theory, files, APIs, database tables, and acceptance criteria.
4. Learner completes checklist items.
5. The app saves project progress per learner and course.

## Information Architecture

Primary public routes:

- `/`
- `/courses`
- `/courses/ai-engineer-guide`
- `/pricing`
- `/about`
- `/sign-in`

Primary authenticated routes:

- `/my-learning`
- `/courses/[courseSlug]/modules`
- `/courses/[courseSlug]/modules/[moduleSlug]`
- `/courses/[courseSlug]/modules/[moduleSlug]/lectures/[lectureId]`
- `/courses/[courseSlug]/modules/[moduleSlug]/practice`
- `/courses/[courseSlug]/capstone`
- `/courses/[courseSlug]/visuals`
- `/labs`

Primary API routes:

- `GET /api/health`
- `GET /api/courses`
- `GET /api/courses/[courseSlug]`
- `POST /api/courses/seed`
- `GET /api/progress`
- `PATCH /api/progress`
- `POST /api/practice/attempts`
- `GET /api/capstone/progress`
- `PATCH /api/capstone/progress`

## Data Model Summary

The platform uses MongoDB for course content and learner state.

Core collections:

- `users`: Auth.js-synced users and roles.
- `courses`: course content, modules, lectures, and metadata.
- `course_entitlements`: per-user course access.
- `course_progress`: per-user lecture progress, quiz scores, and self-ratings.
- `practice_attempts`: saved short-answer attempts.
- `capstone_progress`: per-user capstone checklist state.
- `pricing_plans`: Pro plan metadata when persisted.
- `offer_campaigns`: Founder Free and future plan-specific campaigns.

The guiding rule is separation of concerns:

- course content belongs to course documents;
- learner activity belongs to learner-scoped documents;
- access belongs to entitlement documents;
- pricing and campaigns belong to commercial configuration.

## Design Principles

### 1. Course First

The first screen should help people learn or continue learning. Avoid turning the app into a marketing shell once the learner is signed in.

### 2. Product-Shaped Learning

Every course should be organized around a serious product build. Concepts should answer practical implementation questions.

### 3. Quiet, Focused Interface

The course workspace should be readable, restrained, and easy to scan. The UI should support repeated study sessions without visual noise.

### 4. Progress Should Be Visible

Learners should always understand what they have finished, what remains, and what to do next.

### 5. Practice Should Reinforce Understanding

Practice mode should focus on recall, written explanation, quizzes, and implementation prompts. It should support learning without becoming a separate product category.

### 6. Capstone Work Should Be Concrete

The capstone tracker should name files, routes, schemas, acceptance criteria, and build phases. It should reduce ambiguity around what to build.

### 7. Access Control Should Be Server-Enforced

Private course content and learner state must be protected by server-side authorization, not hidden only in the UI.

## Product Quality Bar

A course is ready when:

- public pages explain the course clearly;
- private module pages are readable and navigable;
- lectures have meaningful sequence and context;
- practice mode supports recall and implementation;
- labs are tied to product progress;
- diagrams clarify complex systems;
- capstone phases are actionable;
- progress persists reliably;
- signed-out users cannot access private content;
- course data can be seeded and updated repeatably.

## Near-Term Priorities

1. Keep the product focused on course learning and capstone execution.
2. Reseed MongoDB after course metadata changes so the live course matches local source.
3. Rotate exposed secrets before production use.
4. Improve My Learning into a stronger course dashboard.
5. Add billing only after the Pro access model is stable.
6. Add admin tools for course publishing and campaign management.
7. Add a constrained course tutor only after the current learning loop is reliable.

## Future Course Expansion

The platform can support additional courses once the AI Engineer Guide is stable.

Potential future course categories:

- production RAG systems;
- AI SaaS architecture;
- document intelligence deep dives;
- evaluation and observability for AI products;
- secure AI workflows;
- full-stack SaaS implementation tracks.

Each future course should have:

- a clear product outcome;
- a module sequence;
- labs;
- visual explanations;
- practice activities;
- a capstone or equivalent project;
- course-specific progress tracking.

## Success Metrics

Early product success should be measured by learning and product completion signals:

- sign-in conversion from course detail page;
- Founder Free claims;
- activated learners who open My Learning;
- learners who complete first lecture;
- learners who save quiz scores;
- learners who save short answers;
- learners who open the capstone tracker;
- capstone checklist completion rate;
- return visits per learner;
- module completion rate;
- course completion rate.

## Risks

### Scope Creep

The platform can easily expand into too many adjacent workflows. Keep the core product centered on courses, practice, and capstones.

### Content Drift

Course source, MongoDB seeded data, and public copy can drift apart. Reseeding and schema documentation should stay part of the release checklist.

### Access Complexity

Course access, campaigns, and subscriptions can become confusing if too many plans are introduced too early. Keep one Pro plan until billing and entitlement logic are mature.

### AI Cost and Reliability

AI features should be introduced carefully. Any future AI tutor or answer review should have authentication, entitlement checks, usage limits, and clear fallback behavior.

### Maintenance Burden

Long courses require ongoing upkeep. The platform should make course updates repeatable through source files, seed routes, and clear schema boundaries.

## Product Thesis

Ledeqor should become a focused learning workspace where technical courses are inseparable from real product execution.

The product wins by helping learners move from concept to implementation with less ambiguity: clear modules, practical exercises, visual models, saved progress, and a capstone plan that makes the system concrete.
