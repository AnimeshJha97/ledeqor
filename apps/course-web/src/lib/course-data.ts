export type Lecture = {
  id: string;
  title: string;
  kind?: "concept" | "build" | "interview" | "strategy";
};

export type CourseModule = {
  id: number;
  slug: string;
  title: string;
  purpose: string;
  status: "complete" | "outline" | "planned";
  sourceFile: string;
  outcome: string;
  lectures: Lecture[];
  labSlug?: string;
};

export const courseModules: CourseModule[] = [
  {
    id: 0,
    slug: "career-transition-strategy",
    title: "Career Strategy & Product Direction",
    purpose: "Position your 5 years of MERN experience as leverage for applied AI engineering roles.",
    status: "complete",
    sourceFile: "01-career-transition-strategy.md",
    outcome: "Clear target role, product direction, capstone scope, and interview positioning.",
    lectures: [
      { id: "0.1", title: "Why MERN-only positioning is limiting", kind: "strategy" },
      { id: "0.2", title: "AI Engineer vs ML Engineer vs Data Scientist", kind: "strategy" },
      { id: "0.3", title: "Best target roles for your background", kind: "strategy" },
      { id: "0.4", title: "Why document intelligence is a strong portfolio project", kind: "strategy" },
      { id: "0.5", title: "How Orvion DocIntel fits under Orvion Labs", kind: "strategy" },
      { id: "0.6", title: "What companies expect from Applied AI Engineers", kind: "strategy" },
      { id: "0.7", title: "What to learn and what to ignore in the first 2 months", kind: "strategy" },
      { id: "0.8", title: "Final 8-week learning and build strategy", kind: "strategy" }
    ]
  },
  {
    id: 1,
    slug: "python-for-ai-engineering",
    title: "Python for AI Engineering",
    purpose: "Learn Python as a production backend engineer building AI services, not as random scripting.",
    status: "complete",
    sourceFile: "03-python-for-ai-engineering.md",
    outcome: "Build an AI-ready FastAPI document upload service with tests and clean structure.",
    labSlug: "module-01-python-fastapi",
    lectures: [
      { id: "1.1", title: "Python setup for AI development", kind: "build" },
      { id: "1.2", title: "Python syntax for JavaScript developers", kind: "concept" },
      { id: "1.3", title: "Variables, functions, loops, and modules", kind: "concept" },
      { id: "1.4", title: "Lists, dictionaries, tuples, and sets", kind: "concept" },
      { id: "1.5", title: "Type hints and clean Python code", kind: "concept" },
      { id: "1.6", title: "Classes and object-oriented Python", kind: "concept" },
      { id: "1.7", title: "Dataclasses and Pydantic models", kind: "build" },
      { id: "1.8", title: "Error handling and exception design", kind: "build" },
      { id: "1.9", title: "Working with files, JSON, and environment variables", kind: "build" },
      { id: "1.10", title: "Async Python basics", kind: "concept" },
      { id: "1.11", title: "Virtual environments and dependency management", kind: "build" },
      { id: "1.12", title: "FastAPI introduction", kind: "build" },
      { id: "1.13", title: "Building clean API routes", kind: "build" },
      { id: "1.14", title: "Request validation with Pydantic", kind: "build" },
      { id: "1.15", title: "Python project folder structure", kind: "build" },
      { id: "1.16", title: "Testing with pytest", kind: "build" },
      { id: "1.17", title: "Logging in Python applications", kind: "build" },
      { id: "1.18", title: "Building your first AI-ready FastAPI service", kind: "build" }
    ]
  },
  {
    id: 2,
    slug: "ai-ml-llm-foundations",
    title: "AI, ML, Generative AI & LLM Foundations",
    purpose: "Build the vocabulary and mental models needed to explain AI clearly as a software engineer.",
    status: "complete",
    sourceFile: "04-ai-ml-llm-foundations.md",
    outcome: "Explain core AI, ML, embeddings, transformers, inference, hallucination, and RAG tradeoffs.",
    lectures: [
      { id: "2.1", title: "What is Artificial Intelligence?" },
      { id: "2.2", title: "What is Machine Learning?" },
      { id: "2.3", title: "What is Deep Learning?" },
      { id: "2.4", title: "What is Generative AI?" },
      { id: "2.5", title: "What is an LLM?" },
      { id: "2.6", title: "How LLMs understand language" },
      { id: "2.7", title: "What are tokens?" },
      { id: "2.8", title: "What is context window?" },
      { id: "2.9", title: "What are embeddings?" },
      { id: "2.10", title: "What is semantic similarity?" },
      { id: "2.11", title: "What is cosine similarity?" },
      { id: "2.12", title: "What is a transformer?" },
      { id: "2.13", title: "Training vs fine-tuning vs prompting" },
      { id: "2.14", title: "What is inference?" },
      { id: "2.15", title: "Temperature, top-p, max tokens, stop sequences" },
      { id: "2.16", title: "Hallucination and grounding" },
      { id: "2.17", title: "Prompting vs RAG vs fine-tuning" },
      { id: "2.18", title: "What AI concepts are important for interviews" },
      { id: "2.19", title: "What ML theory can wait" }
    ]
  },
  {
    id: 3,
    slug: "document-ai-fundamentals",
    title: "Document AI Fundamentals",
    purpose: "Understand PDF, OCR, layout, metadata, classification, and extraction challenges.",
    status: "complete",
    sourceFile: "05-document-ai-fundamentals.md",
    outcome: "Build a document text extraction and metadata pipeline.",
    lectures: [
      { id: "3.1", title: "What is Document AI?" },
      { id: "3.2", title: "Why business documents are hard to process" },
      { id: "3.3", title: "Digital PDFs vs scanned PDFs" },
      { id: "3.4", title: "Text extraction from PDFs" },
      { id: "3.5", title: "OCR basics" },
      { id: "3.6", title: "Layout-aware document processing" },
      { id: "3.7", title: "Handling tables" },
      { id: "3.8", title: "Handling multi-page documents" },
      { id: "3.9", title: "Metadata extraction" },
      { id: "3.10", title: "Document classification" },
      { id: "3.11", title: "Entity extraction" },
      { id: "3.12", title: "Key-value extraction" },
      { id: "3.13", title: "Clause extraction from contracts" },
      { id: "3.14", title: "Invoice field extraction" },
      { id: "3.15", title: "Policy document understanding" },
      { id: "3.16", title: "Common document parsing failures" },
      { id: "3.17", title: "How document AI systems are designed in production" }
    ]
  },
  {
    id: 4,
    slug: "llm-api-engineering",
    title: "LLM API Engineering",
    purpose: "Use LLM APIs professionally with structured outputs, retries, streaming, fallback, and cost control.",
    status: "complete",
    sourceFile: "06-llm-api-engineering.md",
    outcome: "Build reusable AI service calls for summaries, classification, and extraction.",
    lectures: [
      { id: "4.1", title: "Anatomy of an LLM API request" },
      { id: "4.2", title: "System prompt vs user prompt" },
      { id: "4.3", title: "Designing prompts for business documents" },
      { id: "4.4", title: "Zero-shot prompting" },
      { id: "4.5", title: "Few-shot prompting" },
      { id: "4.6", title: "Structured JSON outputs" },
      { id: "4.7", title: "Schema-based response validation" },
      { id: "4.8", title: "Handling malformed model responses" },
      { id: "4.9", title: "Retry and fallback strategies" },
      { id: "4.10", title: "Streaming AI responses" },
      { id: "4.11", title: "Token usage and cost tracking" },
      { id: "4.12", title: "Prompt versioning" },
      { id: "4.13", title: "Prompt templates" },
      { id: "4.14", title: "Prompt injection basics" },
      { id: "4.15", title: "Building a reusable AI service layer" }
    ]
  },
  {
    id: 5,
    slug: "structured-document-extraction",
    title: "Structured Document Extraction",
    purpose: "Turn documents into useful business data through schemas, validation, and review flows.",
    status: "complete",
    sourceFile: "07-structured-document-extraction.md",
    outcome: "Extract and store invoice, contract, policy, and proposal fields.",
    lectures: [
      { id: "5.1", title: "What is structured extraction?" },
      { id: "5.2", title: "Why JSON outputs matter" },
      { id: "5.3", title: "Designing extraction schemas" },
      { id: "5.4", title: "Pydantic models for document extraction" },
      { id: "5.5", title: "Invoice extraction schema" },
      { id: "5.6", title: "Contract extraction schema" },
      { id: "5.7", title: "HR policy extraction schema" },
      { id: "5.8", title: "Proposal extraction schema" },
      { id: "5.9", title: "Handling missing fields" },
      { id: "5.10", title: "Confidence scoring" },
      { id: "5.11", title: "Validation and correction" },
      { id: "5.12", title: "Human review workflow" },
      { id: "5.13", title: "Exporting extracted data" },
      { id: "5.14", title: "Storing extracted fields in database" },
      { id: "5.15", title: "Extraction accuracy testing" }
    ]
  },
  {
    id: 6,
    slug: "embeddings-vector-search",
    title: "Embeddings, Vector Search & Semantic Search",
    purpose: "Learn chunking, embedding generation, vector storage, metadata filtering, hybrid search, and reranking.",
    status: "outline",
    sourceFile: "08-embeddings-vector-search.md",
    outcome: "Search documents by meaning and return relevant chunks.",
    lectures: [
      { id: "6.1", title: "What are embeddings?" },
      { id: "6.2", title: "Why keyword search is not enough" },
      { id: "6.3", title: "Semantic search explained" },
      { id: "6.4", title: "Cosine similarity" },
      { id: "6.5", title: "Embedding models" },
      { id: "6.6", title: "Chunking strategies" },
      { id: "6.7", title: "Chunk size and overlap" },
      { id: "6.8", title: "Metadata design" },
      { id: "6.9", title: "Vector databases" },
      { id: "6.10", title: "pgvector vs Pinecone vs Qdrant vs Weaviate" },
      { id: "6.11", title: "Storing embeddings" },
      { id: "6.12", title: "Searching embeddings" },
      { id: "6.13", title: "Filtering by metadata" },
      { id: "6.14", title: "Hybrid search" },
      { id: "6.15", title: "Reranking basics" },
      { id: "6.16", title: "Search quality debugging" }
    ]
  },
  {
    id: 7,
    slug: "rag-for-business-documents",
    title: "RAG for Business Documents",
    purpose: "Build grounded document Q&A with citations, unknown-answer handling, and comparison flows.",
    status: "outline",
    sourceFile: "09-rag-for-business-documents.md",
    outcome: "Ask questions over one or many documents with cited, grounded answers.",
    lectures: [
      { id: "7.1", title: "What is RAG?" },
      { id: "7.2", title: "Why RAG is needed for document intelligence" },
      { id: "7.3", title: "RAG pipeline overview" },
      { id: "7.4", title: "Ingestion pipeline" },
      { id: "7.5", title: "Retrieval pipeline" },
      { id: "7.6", title: "Generation pipeline" },
      { id: "7.7", title: "Context construction" },
      { id: "7.8", title: "Source citations" },
      { id: "7.9", title: "Grounded answering" },
      { id: "7.10", title: "Handling unknown answers" },
      { id: "7.11", title: "Single-document Q&A" },
      { id: "7.12", title: "Multi-document Q&A" },
      { id: "7.13", title: "Cross-document search" },
      { id: "7.14", title: "Document comparison" },
      { id: "7.15", title: "Contract risk analysis using RAG" },
      { id: "7.16", title: "Policy Q&A using RAG" },
      { id: "7.17", title: "Invoice search using RAG" },
      { id: "7.18", title: "RAG failure cases" },
      { id: "7.19", title: "RAG debugging" },
      { id: "7.20", title: "RAG interview questions" }
    ]
  }
];

const remainingModules: CourseModule[] = [
  {
    id: 8,
    slug: "full-stack-ai-saas-architecture",
    title: "Full Stack AI SaaS Architecture",
    purpose: "Design Orvion DocIntel as a real SaaS with frontend, backend, AI service, database, queues, storage, auth, and observability.",
    status: "complete",
    sourceFile: "10-full-stack-ai-saas-architecture.md",
    outcome: "Create the complete architecture blueprint, API contracts, schema plan, job model, and UI route map.",
    lectures: []
  },
  {
    id: 9,
    slug: "agentic-document-workflows",
    title: "Agentic Document Workflows",
    purpose: "Build controlled document workflows with safe tool calling, schema validation, workflow state, and human review.",
    status: "complete",
    sourceFile: "11-agentic-document-workflows.md",
    outcome: "Implement classifier, contract review, invoice approval, comparison, and checklist workflows safely.",
    lectures: []
  },
  {
    id: 10,
    slug: "ai-evaluation-observability",
    title: "AI Evaluation, Testing & Observability",
    purpose: "Evaluate extraction, retrieval, citations, hallucination risk, latency, token usage, and cost like a production AI engineer.",
    status: "complete",
    sourceFile: "12-ai-evaluation-observability.md",
    outcome: "Build golden datasets, eval scripts, usage tracking, prompt regression checks, and a quality dashboard plan.",
    lectures: []
  },
  {
    id: 11,
    slug: "ai-security-privacy",
    title: "AI Security, Privacy & Compliance",
    purpose: "Protect sensitive business documents with tenant isolation, RBAC, prompt injection defenses, safe logging, and deletion workflows.",
    status: "complete",
    sourceFile: "13-ai-security-privacy.md",
    outcome: "Create the security model for document access, vector privacy, secure uploads, audit logs, and PII-aware processing.",
    lectures: []
  },
  {
    id: 12,
    slug: "deployment-scaling-llmops",
    title: "Deployment, Scaling & LLMOps",
    purpose: "Prepare the multi-service AI SaaS for local Docker, deployment, monitoring, health checks, cost control, and demo readiness.",
    status: "complete",
    sourceFile: "14-deployment-scaling-llmops.md",
    outcome: "Create Docker, environment, health check, deployment, monitoring, README, and demo video plans.",
    lectures: []
  },
  {
    id: 13,
    slug: "orvion-docintel-capstone-blueprint",
    title: "Capstone Build: Orvion DocIntel",
    purpose: "Build the full Orvion DocIntel product in ten implementation phases from setup to production polish.",
    status: "complete",
    sourceFile: "15-orvion-docintel-capstone-blueprint.md",
    outcome: "Turn the entire course into a portfolio-grade product with upload, extraction, search, RAG, workflows, evals, security, and deployment.",
    lectures: []
  },
  {
    id: 14,
    slug: "ai-engineer-interview-preparation",
    title: "AI Engineer Interview Preparation",
    purpose: "Convert your learning and capstone into interview answers, system design stories, mock interviews, and salary positioning.",
    status: "complete",
    sourceFile: "16-ai-engineer-interview-preparation.md",
    outcome: "Prepare your pitch, project deep dive, AI concepts, system design answers, behavioral stories, and final checklist.",
    lectures: []
  },
  {
    id: 15,
    slug: "resume-linkedin-job-strategy",
    title: "Resume, LinkedIn & Job Strategy",
    purpose: "Reposition your profile from MERN-only to senior full-stack engineer building applied AI products.",
    status: "complete",
    sourceFile: "17-resume-linkedin-job-strategy.md",
    outcome: "Create the AI-focused resume, LinkedIn profile, GitHub proof, case study, outreach scripts, and application tracker.",
    lectures: []
  }
];

export const allModules = [...courseModules, ...remainingModules];

export function getModule(slug: string) {
  return allModules.find((module) => module.slug === slug);
}

export function getCourseStats() {
  const completed = allModules.filter((module) => module.status === "complete").length;
  const lectureCount = allModules.reduce((total, module) => total + module.lectures.length, 0);
  return {
    moduleCount: allModules.length,
    completed,
    lectureCount
  };
}
