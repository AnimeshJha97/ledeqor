# Module 12: Deployment, Scaling & LLMOps

## Module Purpose

This module turns Arkion DocIntel from a local project into a portfolio-grade product that can be demoed, explained, monitored, and improved.

Deployment is not only "put it online." For AI systems, you also need queues, health checks, environment variables, logs, cost tracking, latency monitoring, and clear production limitations.

## Learning Outcomes

By the end of this module, you should be able to:

- Dockerize a multi-service AI app
- run Next.js, Node, FastAPI, Postgres, pgvector, and Redis locally
- manage environment variables safely
- deploy frontend and backend services
- monitor logs, costs, latency, and queues
- design health checks
- handle slow AI responses and large documents
- prepare a production README, architecture diagram, and demo video

## Final Mini Build

Create a deployment-ready package:

- Docker Compose setup
- `.env.example`
- health check endpoints
- production README
- architecture diagram
- API documentation
- demo video script
- known limitations and roadmap

---

## 12.1 Docker Basics For AI Apps

Docker packages services with their runtime dependencies.

Why it matters:

- reproducible local setup
- easier deployment
- separate Node and Python environments
- consistent worker execution

## 12.2 Dockerizing Frontend

Frontend container should:

- install dependencies
- build Next.js
- run production server
- receive API URL through environment variables

## 12.3 Dockerizing Node Backend

Node backend container should:

- expose API port
- connect to database
- connect to Redis
- validate environment variables
- run migrations before production where appropriate

## 12.4 Dockerizing FastAPI Service

FastAPI container should:

- install Python dependencies
- expose `/health`
- include parser libraries
- call LLM and embedding providers
- avoid storing secrets in the image

## 12.5 Docker Compose Setup

Compose services:

```text
frontend
api
ai-service
worker
postgres
redis
object-storage-local
```

This gives interviewers a clear production-like story.

## 12.6 PostgreSQL + pgvector Deployment

Use Postgres with pgvector for:

- relational SaaS data
- document metadata
- extraction results
- vector chunks

Make migrations part of deployment.

## 12.7 Redis Queue Deployment

Redis backs background jobs.

Monitor:

- waiting jobs
- active jobs
- failed jobs
- retry counts
- oldest queued job

## 12.8 Worker Deployment

Workers run slow processing:

- parse documents
- extract fields
- generate embeddings
- run workflows
- run evals

Scale workers separately from APIs.

## 12.9 Environment Variables

Use `.env.example` to document:

- database URL
- Redis URL
- object storage keys
- AI provider keys
- auth secrets
- app URLs

Never commit real secrets.

## 12.10 CI/CD Basics

CI should run:

- lint
- typecheck
- unit tests
- build
- migration check

CD deploys after checks pass.

## 12.11 Health Checks

Health endpoints:

```text
GET /health
GET /ready
```

`/health` says the service is alive. `/ready` checks dependencies.

## 12.12 Error Logs

Logs should include:

- request ID
- user/workspace ID where safe
- document ID
- job ID
- error type
- duration

Avoid document content.

## 12.13 AI Cost Monitoring

Track:

- model
- feature
- prompt tokens
- completion tokens
- cost estimate
- workspace
- date

Add budget alerts later.

## 12.14 AI Latency Monitoring

Track slow points:

- parsing
- embedding
- retrieval
- LLM completion
- workflow total

Use background jobs for slow tasks.

## 12.15 Queue Monitoring

A queue dashboard should show:

- active jobs
- failed jobs
- retry rate
- average processing time
- dead-letter jobs

## 12.16 Scaling Document Processing

Scale by:

- adding workers
- limiting file sizes
- chunking large documents
- batching embeddings
- retrying transient provider failures
- storing intermediate status

## 12.17 Handling Large Documents

Large documents need:

- page limits
- chunking
- async processing
- progress status
- partial failure handling
- user messaging

## 12.18 Handling Slow AI Responses

Use:

- streaming for chat
- background jobs for workflows
- timeouts
- retries
- fallback models
- status updates

## 12.19 Production README

README sections:

- product overview
- architecture
- local setup
- environment variables
- services
- API examples
- evaluation
- security notes
- limitations
- roadmap

## 12.20 Demo Video Preparation

Demo flow:

1. Upload contract.
2. Show processing status.
3. Show extracted fields.
4. Ask a cited question.
5. Compare two documents.
6. Show evaluation or usage dashboard.
7. Explain architecture.

## Capstone Scope For Module 12

Recommended files:

```text
docker-compose.yml
docs/
  deployment.md
  demo-script.md
  production-readme-checklist.md
```

## Module 12 Assignment

Build:

- Docker Compose skeleton
- health endpoints
- `.env.example`
- deployment README
- demo script

Acceptance criteria:

- all services are documented
- secrets are not committed
- health checks are clear
- README explains architecture and limitations

## Quiz

1. Why use Docker Compose?
2. Why separate workers from APIs?
3. What should `/ready` check?
4. What AI usage metrics matter?
5. How do you handle large documents?
6. What belongs in a production README?

## Answer Key

1. To run the multi-service stack reproducibly.
2. Slow jobs should not block request handlers.
3. Dependencies like database, Redis, and external service readiness.
4. Model, feature, tokens, cost, latency, status, workspace.
5. Use limits, chunking, async jobs, progress, and partial failures.
6. Setup, architecture, env vars, APIs, evals, security, limitations, roadmap.

## Interview Questions

1. How would you deploy this AI SaaS?
2. How do you monitor LLM cost?
3. How do you scale document processing?
4. How do you handle queue failures?
5. What would you include in the demo video?

## Source Links

- Docker documentation: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- FastAPI deployment: https://fastapi.tiangolo.com/deployment/
- Next.js deployment: https://nextjs.org/docs/app/building-your-application/deploying
