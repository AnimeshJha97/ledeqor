# Course Creation Plan

## Best Way To Build This Course

The strongest path is to build the course as a real learning product, then build the capstone alongside it.

The course should have three connected outputs:

1. A detailed curriculum that teaches concepts from zero.
2. A working Orvion DocIntel capstone product.
3. Portfolio and interview material generated from the build.

## Recommended Architecture

### Course Source

Use Markdown or MDX files as the source of truth. This keeps authoring fast and portable.

Each lecture should include:

- Plain-English explanation
- Why it matters in AI engineering
- MERN-to-AI mental model
- Code example
- Product connection to Orvion DocIntel
- Common beginner mistakes
- Interview angle
- Mini exercise
- Completion checklist

### Study App

Build a Next.js app after the first few modules are drafted.

The app should include:

- Course dashboard
- Module and lecture pages
- Progress tracking
- Code snippets
- Diagram rendering
- Lab instructions
- Quizzes
- Capstone milestones
- Interview flashcards
- Portfolio checklist

Recommended stack:

- Next.js
- TypeScript
- MDX
- Tailwind CSS
- shadcn/ui if desired
- PostgreSQL later for user progress

### Capstone Product

Build Orvion DocIntel as a separate monorepo or subfolder.

Recommended stack:

- Frontend: Next.js, React, TypeScript
- Main API: Node.js with Express or NestJS
- AI service: Python with FastAPI
- Database: PostgreSQL with pgvector
- Queue: Redis with BullMQ or Celery/RQ
- Storage: local first, then S3-compatible storage
- Auth: magic link or Google OAuth
- Deployment: Docker Compose first, cloud later

## Course Production Phases

### Phase 1: Curriculum System

Create the course structure, module templates, progress tracker, roadmap, and capstone blueprint.

### Phase 2: Core Beginner Modules

Write Modules 0-2 with no assumed AI knowledge.

Focus:

- Career strategy
- Python for JS developers
- AI, ML, GenAI, and LLM foundations

### Phase 3: Document AI Core

Write Modules 3-7.

Focus:

- PDF parsing
- OCR
- LLM API engineering
- Structured extraction
- Embeddings
- RAG

### Phase 4: SaaS Product Engineering

Write Modules 8-13 while building the capstone.

Focus:

- Architecture
- Auth
- Workspaces
- File upload
- Async jobs
- AI workflows
- Evaluation
- Deployment

### Phase 5: Career Conversion

Write Modules 14-15 and portfolio assets.

Focus:

- Interview prep
- Resume
- LinkedIn
- GitHub polish
- Demo video
- Case study

## Output Quality Bar

Every module should contain:

- Concept lessons
- Diagrams
- Code labs
- Capstone integration
- Quiz questions
- Interview questions
- Debugging notes
- Final module assignment

Every capstone phase should contain:

- Product goal
- User story
- Architecture notes
- Backend tasks
- Frontend tasks
- AI service tasks
- Data model
- Tests
- Acceptance criteria

## Caveman Chat Protocol

Chat can be short.

Examples:

- "next"
- "more detail"
- "build module 1"
- "add diagrams"
- "make app"
- "too hard simplify"
- "continue"
- "quiz me"

Course output should remain polished and complete regardless of short chat instructions.

