export type CapstoneChecklistItem = {
  id: string;
  label: string;
};

export type CapstonePhase = {
  id: string;
  number: number;
  title: string;
  summary: string;
  theoryNeeded: string[];
  implementationChecklist: CapstoneChecklistItem[];
  filesToCreate: string[];
  apiRoutes: string[];
  databaseTables: string[];
  acceptanceCriteria: string[];
  interviewStoryUnlocked: string;
};

export const capstonePhases: CapstonePhase[] = [
  {
    id: "project-setup",
    number: 1,
    title: "Project Setup",
    summary: "Create the production-style foundation for frontend, API, AI service, database, queue, and environment management.",
    theoryNeeded: ["Module 1 Python/FastAPI", "Module 8 SaaS architecture", "Module 12 deployment basics"],
    implementationChecklist: [
      { id: "monorepo", label: "Create monorepo structure" },
      { id: "frontend", label: "Set up Next.js frontend" },
      { id: "api", label: "Set up API layer" },
      { id: "ai-service", label: "Set up FastAPI AI service" },
      { id: "db-redis", label: "Configure PostgreSQL/pgvector and Redis" },
      { id: "env", label: "Create environment variable templates" }
    ],
    filesToCreate: ["apps/course-web", "apps/api", "apps/ai-service", "docker-compose.yml", ".env.example"],
    apiRoutes: ["GET /health", "GET /ready"],
    databaseTables: ["users", "organizations", "workspaces"],
    acceptanceCriteria: ["All services run locally", "Health checks respond", "Environment variables are documented"],
    interviewStoryUnlocked: "I can explain how I structured a multi-service AI SaaS from day one."
  },
  {
    id: "upload-processing",
    number: 2,
    title: "Upload + Processing",
    summary: "Upload PDFs, store originals, create document records, queue processing, parse text, and track status.",
    theoryNeeded: ["Module 3 Document AI", "Module 8 async processing", "Module 11 secure upload"],
    implementationChecklist: [
      { id: "upload-ui", label: "Build upload UI" },
      { id: "document-record", label: "Create document record" },
      { id: "storage", label: "Store original file" },
      { id: "queue-job", label: "Queue processing job" },
      { id: "parse-text", label: "Extract text and metadata" },
      { id: "status", label: "Show processing status" }
    ],
    filesToCreate: ["document-upload.tsx", "document_service.py", "parser_service.py", "jobs/document-processing.ts"],
    apiRoutes: ["POST /documents", "GET /documents/:id", "POST /documents/:id/process"],
    databaseTables: ["documents", "document_pages", "jobs"],
    acceptanceCriteria: ["PDF uploads work", "Parser stores page-aware text", "UI shows queued/processing/ready/failed"],
    interviewStoryUnlocked: "I can describe document ingestion, storage, parsing, and async job tracking."
  },
  {
    id: "classification",
    number: 3,
    title: "Classification",
    summary: "Detect whether a document is an invoice, contract, policy, proposal, SOP, or unknown.",
    theoryNeeded: ["Module 3 classification", "Module 4 LLM API engineering"],
    implementationChecklist: [
      { id: "rules", label: "Add rule-based classifier" },
      { id: "llm-fallback", label: "Add LLM fallback classifier" },
      { id: "confidence", label: "Store confidence and rationale" },
      { id: "manual-correction", label: "Allow manual correction" }
    ],
    filesToCreate: ["classification_service.py", "classification_prompts.py", "document-type-badge.tsx"],
    apiRoutes: ["POST /documents/:id/classify", "PATCH /documents/:id/type"],
    databaseTables: ["documents.document_type", "documents.classification_confidence"],
    acceptanceCriteria: ["Document type appears in library", "Unknown documents are handled", "User can correct classification"],
    interviewStoryUnlocked: "I can explain deterministic plus AI fallback classification."
  },
  {
    id: "extraction",
    number: 4,
    title: "Structured Extraction",
    summary: "Extract typed business fields from invoices, contracts, policies, and proposals with validation and review.",
    theoryNeeded: ["Module 5 structured extraction", "Module 4 schema validation"],
    implementationChecklist: [
      { id: "schemas", label: "Create extraction schemas" },
      { id: "prompts", label: "Create schema-specific prompts" },
      { id: "validate", label: "Validate output with Pydantic" },
      { id: "store", label: "Store extraction result" },
      { id: "review", label: "Show low-confidence review UI" }
    ],
    filesToCreate: ["extraction.py", "extraction_service.py", "extracted-fields-panel.tsx"],
    apiRoutes: ["POST /documents/:id/extract", "GET /documents/:id/extraction"],
    databaseTables: ["extraction_results", "extracted_fields"],
    acceptanceCriteria: ["Invoice and contract fields display", "Missing fields use null", "Evidence/page numbers are shown"],
    interviewStoryUnlocked: "I can explain how I made LLM output usable as validated business data."
  },
  {
    id: "search",
    number: 5,
    title: "Embeddings + Search",
    summary: "Chunk documents, generate embeddings, store vectors, and search by meaning with metadata filters.",
    theoryNeeded: ["Module 6 embeddings", "Module 8 metadata design"],
    implementationChecklist: [
      { id: "chunk", label: "Chunk page-aware text" },
      { id: "embed", label: "Generate embeddings" },
      { id: "store-vectors", label: "Store vectors with metadata" },
      { id: "search-api", label: "Create semantic search API" },
      { id: "filters", label: "Add workspace/type/date filters" }
    ],
    filesToCreate: ["chunking_service.py", "embedding_service.py", "search_service.py", "search-page.tsx"],
    apiRoutes: ["POST /documents/search"],
    databaseTables: ["document_chunks"],
    acceptanceCriteria: ["Search returns relevant chunks", "Results include source metadata", "Tenant filters apply before search"],
    interviewStoryUnlocked: "I can explain semantic search, chunking, metadata, and vector privacy."
  },
  {
    id: "rag",
    number: 6,
    title: "RAG Q&A",
    summary: "Answer document questions with retrieval, grounded generation, source citations, and unknown-answer handling.",
    theoryNeeded: ["Module 7 RAG", "Module 10 faithfulness/citations"],
    implementationChecklist: [
      { id: "single-doc", label: "Single-document Q&A" },
      { id: "workspace-qa", label: "Workspace Q&A" },
      { id: "citations", label: "Map citations to chunks/pages" },
      { id: "unknown", label: "Handle unknown answers safely" }
    ],
    filesToCreate: ["rag_service.py", "citation_service.py", "document-chat.tsx"],
    apiRoutes: ["POST /documents/:id/questions", "POST /workspaces/:id/questions"],
    databaseTables: ["rag_runs", "ai_usage_events"],
    acceptanceCriteria: ["Answers include citations", "Missing answers are refused", "Single and workspace Q&A are separate"],
    interviewStoryUnlocked: "I can explain a production RAG pipeline and how I reduce hallucination."
  },
  {
    id: "comparison",
    number: 7,
    title: "Document Comparison",
    summary: "Compare two documents across clauses, pricing, dates, payment terms, and risk differences.",
    theoryNeeded: ["Module 7 comparison", "Module 5 extraction"],
    implementationChecklist: [
      { id: "select-docs", label: "Select two documents" },
      { id: "retrieve-sections", label: "Retrieve comparable sections" },
      { id: "diff-summary", label: "Generate difference summary" },
      { id: "risk-highlight", label: "Highlight risks" }
    ],
    filesToCreate: ["comparison_service.py", "compare-documents.tsx"],
    apiRoutes: ["POST /documents/compare"],
    databaseTables: ["comparison_runs"],
    acceptanceCriteria: ["Comparison uses both documents", "Differences are cited", "Risk summary is clear"],
    interviewStoryUnlocked: "I can explain how retrieval and extraction support document comparison."
  },
  {
    id: "workflows",
    number: 8,
    title: "AI Workflows",
    summary: "Add controlled workflows for contract risk review, invoice summaries, SOP checklists, and proposal action items.",
    theoryNeeded: ["Module 9 workflows", "Module 11 safety"],
    implementationChecklist: [
      { id: "workflow-model", label: "Create workflow run model" },
      { id: "contract-risk", label: "Build contract risk workflow" },
      { id: "invoice-summary", label: "Build invoice approval summary" },
      { id: "sop-checklist", label: "Build SOP checklist generator" },
      { id: "audit", label: "Store workflow audit trail" }
    ],
    filesToCreate: ["workflows/contract_review.py", "workflows/invoice_approval.py", "workflow-results.tsx"],
    apiRoutes: ["POST /workflows/contract-review", "POST /workflows/invoice-summary"],
    databaseTables: ["workflow_runs"],
    acceptanceCriteria: ["Workflow state is persisted", "Outputs are schema-validated", "High-risk outputs require review"],
    interviewStoryUnlocked: "I can explain the difference between uncontrolled agents and safe business workflows."
  },
  {
    id: "evals",
    number: 9,
    title: "Evaluation Layer",
    summary: "Measure extraction accuracy, retrieval quality, citation correctness, hallucination behavior, latency, and cost.",
    theoryNeeded: ["Module 10 evaluation", "Module 4 prompt versioning"],
    implementationChecklist: [
      { id: "golden-data", label: "Create golden datasets" },
      { id: "extraction-eval", label: "Score extraction accuracy" },
      { id: "rag-eval", label: "Score RAG cases" },
      { id: "citation-check", label: "Check citation correctness" },
      { id: "usage", label: "Track latency/tokens/cost" }
    ],
    filesToCreate: ["evals/run_extraction_eval.py", "evals/run_rag_eval.py", "usage_tracking.py"],
    apiRoutes: ["GET /admin/quality", "POST /evals/run"],
    databaseTables: ["eval_runs", "ai_usage_events"],
    acceptanceCriteria: ["Eval scripts run repeatably", "Prompt versions are recorded", "Failures are categorized"],
    interviewStoryUnlocked: "I can explain how I measured AI reliability instead of just trusting outputs."
  },
  {
    id: "polish",
    number: 10,
    title: "Production Polish",
    summary: "Finish auth, workspace management, RBAC, delete flows, usage dashboard, deployment, README, and demo.",
    theoryNeeded: ["Module 11 security", "Module 12 deployment", "Module 14 interviews"],
    implementationChecklist: [
      { id: "auth", label: "Finish authentication" },
      { id: "rbac", label: "Add role-based access" },
      { id: "delete", label: "Add document deletion workflow" },
      { id: "usage-dashboard", label: "Create usage dashboard" },
      { id: "readme-demo", label: "Prepare README and demo video" }
    ],
    filesToCreate: ["README.md", "docs/architecture.md", "docs/demo-script.md"],
    apiRoutes: ["DELETE /documents/:id", "GET /admin/usage"],
    databaseTables: ["audit_logs", "memberships"],
    acceptanceCriteria: ["Demo flow works", "README is clear", "Known limitations are documented", "Architecture diagram is ready"],
    interviewStoryUnlocked: "I can present the project like a launchable AI SaaS, with limitations and roadmap."
  }
];

