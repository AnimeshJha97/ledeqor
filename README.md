# Orvion DocIntel AI Engineer Course

This repository is the source of truth for a self-paced course that turns a senior MERN full-stack engineer into an applied AI engineer through a production-style document intelligence SaaS build.

The course is designed for short chat instructions and deep course output. Chat can stay minimal. Course files should stay detailed, structured, and beginner-friendly.

## Recommended Delivery Model

Use a hybrid format:

1. Markdown/MDX course source
2. Next.js learning app
3. Hands-on capstone monorepo
4. Visual assets and diagrams
5. Evaluation datasets and portfolio artifacts

This gives you both learning material and a portfolio-grade product.

## Repository Shape

```text
orvion-docintel-ai-engineer-course/
  apps/
    course-web/
  course/
    00-course-overview.md
    01-career-transition-strategy.md
    ...
  labs/
    module-01-python-fastapi/
    module-03-document-ai/
    ...
  diagrams/
  assets/
  datasets/
  assessments/
  app-plan/
  capstone/
  portfolio/
```

## Course Web App

The preparation UI lives here:

```text
apps/course-web
```

Run it:

```powershell
cd apps/course-web
npm.cmd install
npm.cmd run dev -- --port 3001
```

Open:

```text
http://localhost:3001
```

The app reads from the Markdown course source and keeps the existing file structure intact.

## Learning Goal

By the end, you should be able to say:

> I am a senior full-stack engineer with strong React, Node.js, TypeScript, backend, and product delivery experience. I expanded into applied AI engineering by building Orvion DocIntel, a document intelligence platform that processes business documents using Python, FastAPI, LLMs, embeddings, vector search, RAG, structured extraction, AI workflows, evaluation, and production deployment.

## Course Product

Orvion DocIntel is a B2B SaaS document intelligence platform where businesses can upload documents, extract structured fields, search semantically, ask grounded questions with citations, compare documents, detect risks, and trigger document workflows.

## Build Philosophy

This course is not a chatbot tutorial.

It teaches:

- Python for production AI services
- Document AI fundamentals
- LLM API engineering
- Structured extraction
- Embeddings and vector search
- RAG with citations
- Full-stack SaaS architecture
- Agentic workflows
- AI evaluation and observability
- Security, privacy, and deployment
- Interview and job strategy
