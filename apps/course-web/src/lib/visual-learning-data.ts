export type VisualDiagram = {
  id: string;
  title: string;
  moduleIds: number[];
  description: string;
  chart: string;
};

export const visualDiagrams: VisualDiagram[] = [
  {
    id: "ai-hierarchy",
    title: "AI vs ML vs Deep Learning vs LLM",
    moduleIds: [2],
    description: "Shows how the core AI terms fit together before diving into implementation.",
    chart: `flowchart TB
  A["Artificial Intelligence"] --> B["Machine Learning"]
  A --> C["Rule-Based Systems"]
  B --> D["Deep Learning"]
  D --> E["Transformers"]
  E --> F["Large Language Models"]
  F --> G["Prompting, RAG, Extraction"]`
  },
  {
    id: "document-ingestion",
    title: "Document Ingestion Pipeline",
    moduleIds: [3, 8, 13],
    description: "The path from uploaded document to parsed, classified, stored document record.",
    chart: `flowchart LR
  A["Upload File"] --> B["Store Original"]
  B --> C["Create Document Record"]
  C --> D["Queue Processing Job"]
  D --> E["Parse Text + Metadata"]
  E --> F{"Enough Text?"}
  F -- "No" --> G["Mark OCR Required"]
  F -- "Yes" --> H["Classify Document"]
  H --> I["Ready For Extraction"]`
  },
  {
    id: "extraction-pipeline",
    title: "Structured Extraction Pipeline",
    moduleIds: [4, 5],
    description: "How parsed document text becomes validated business data.",
    chart: `flowchart TB
  A["Parsed Text"] --> B["Select Schema"]
  B --> C["Build Prompt"]
  C --> D["LLM Structured Output"]
  D --> E["Pydantic Validation"]
  E --> F{"Low Confidence?"}
  F -- "Yes" --> G["Human Review"]
  F -- "No" --> H["Store Extraction"]
  G --> H`
  },
  {
    id: "embedding-search",
    title: "Embedding Search Flow",
    moduleIds: [6],
    description: "The semantic search flow that powers retrieval before RAG.",
    chart: `flowchart LR
  A["Document Pages"] --> B["Chunks"]
  B --> C["Embedding Model"]
  C --> D["Vector Store"]
  E["User Query"] --> F["Query Embedding"]
  F --> G["Similarity Search"]
  D --> G
  G --> H["Ranked Chunks + Metadata"]`
  },
  {
    id: "rag-flow",
    title: "RAG Answer Flow",
    moduleIds: [7],
    description: "The grounded question-answering loop with retrieval and citations.",
    chart: `flowchart TB
  A["Question"] --> B["Retrieve Relevant Chunks"]
  B --> C["Build Source Context"]
  C --> D["Generate Answer"]
  D --> E{"Supported By Sources?"}
  E -- "Yes" --> F["Answer With Citations"]
  E -- "No" --> G["I Do Not Know"]`
  },
  {
    id: "saas-architecture",
    title: "Full Stack AI SaaS Architecture",
    moduleIds: [8, 12],
    description: "The production-style service layout for the course project.",
    chart: `flowchart TB
  UI["Next.js Frontend"] --> API["Product API"]
  API --> DB["MongoDB / Postgres"]
  API --> Storage["Object Storage"]
  API --> Queue["Redis Queue"]
  Queue --> AI["Python/FastAPI AI Worker"]
  AI --> Providers["LLM + Embedding APIs"]
  AI --> DB`
  },
  {
    id: "agent-workflow",
    title: "Controlled Agent Workflow",
    moduleIds: [9],
    description: "Safe business workflow pattern for contract and invoice review.",
    chart: `flowchart LR
  A["Workflow Request"] --> B["Validate Permissions"]
  B --> C["Allowed Tools Only"]
  C --> D["Run Steps"]
  D --> E["Validate Output Schema"]
  E --> F{"High Risk?"}
  F -- "Yes" --> G["Human Approval"]
  F -- "No" --> H["Save Result"]`
  },
  {
    id: "evaluation-pipeline",
    title: "AI Evaluation Pipeline",
    moduleIds: [10],
    description: "How to evaluate extraction, retrieval, answers, citations, latency, and cost.",
    chart: `flowchart TB
  A["Golden Dataset"] --> B["Run Pipeline"]
  B --> C["Score Extraction"]
  B --> D["Score Retrieval"]
  B --> E["Check Citations"]
  B --> F["Track Cost + Latency"]
  C --> G["Quality Dashboard"]
  D --> G
  E --> G
  F --> G`
  },
  {
    id: "deployment-architecture",
    title: "Deployment Architecture",
    moduleIds: [12],
    description: "How frontend, APIs, workers, database, queue, storage, and monitoring fit together.",
    chart: `flowchart TB
  A["User"] --> B["Deployed Frontend"]
  B --> C["API Service"]
  C --> D["Database"]
  C --> E["Object Storage"]
  C --> F["Queue"]
  F --> G["Worker Pool"]
  G --> H["AI Providers"]
  C --> I["Logs + Metrics"]
  G --> I`
  }
];

