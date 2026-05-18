# Module 1: Python for AI Engineering

## Module Purpose

This module teaches Python from a software-engineering perspective.

You are not learning random scripting. You are learning enough Python to build and maintain the AI backend of Orvion DocIntel.

You need Python for:

- FastAPI services
- PDF parsing
- OCR pipelines
- embedding generation
- RAG workflows
- LLM orchestration
- evaluation scripts
- background jobs
- data processing

## Learning Outcomes

By the end of this module, you should be able to:

- set up a Python project
- explain Python syntax as a JavaScript developer
- use lists, dictionaries, tuples, and sets
- write typed functions
- create classes and Pydantic models
- handle errors cleanly
- read files and JSON
- use environment variables
- understand async basics
- create a FastAPI service
- validate requests with Pydantic
- upload files through an API
- write basic pytest tests
- add useful logging

## Final Mini Build

Build an AI-ready FastAPI service with:

- `GET /health`
- `POST /documents/upload`
- local file saving
- file metadata extraction
- basic extension validation
- clean JSON response
- pytest tests
- structured logging

---

## 1.1 Python Setup For AI Development

### Goal

Install and organize Python so every AI project has a clean, reproducible environment.

### Plain-English Explanation

Python projects should not dump dependencies into your global machine. Each project gets its own virtual environment.

This is similar to `node_modules` in JavaScript, but Python uses a virtual environment to isolate installed packages.

### MERN-To-AI Mental Model

| JavaScript / Node | Python |
|---|---|
| `package.json` | `pyproject.toml` or `requirements.txt` |
| `node_modules` | virtual environment packages |
| `npm install` | `pip install` |
| `npm run dev` | `fastapi dev` or `uvicorn` |
| TypeScript types | Python type hints |

### Recommended First Setup

For this course, start simple:

```powershell
python --version
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

Then install project dependencies:

```powershell
pip install fastapi uvicorn python-multipart pydantic pytest httpx
```

Freeze dependencies:

```powershell
pip freeze > requirements.txt
```

### Product Connection

Orvion DocIntel will have a Python AI service. Its environment must be isolated because AI projects often have heavier dependencies than normal APIs.

### Common Mistakes

- Installing everything globally
- Forgetting to activate the virtual environment
- Mixing multiple Python versions
- Not saving dependencies
- Committing `.venv` to Git

---

## 1.2 Python Syntax For JavaScript Developers

### Goal

Translate your JavaScript instincts into Python.

### Key Differences

Python uses indentation instead of braces:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

No `const`, `let`, or `var`:

```python
document_type = "invoice"
confidence = 0.92
```

Truthiness is similar:

```python
if document_type:
    print("Document type exists")
```

No semicolons:

```python
status = "processed"
```

### JavaScript vs Python Example

JavaScript:

```ts
function classifyDocument(fileName: string): string {
  if (fileName.endsWith(".pdf")) {
    return "pdf";
  }
  return "unknown";
}
```

Python:

```python
def classify_document(file_name: str) -> str:
    if file_name.endswith(".pdf"):
        return "pdf"
    return "unknown"
```

### Naming Convention

Python uses `snake_case` for variables and functions.

Use:

```python
extract_document_metadata()
```

Avoid:

```python
extractDocumentMetadata()
```

---

## 1.3 Variables, Functions, Loops, And Modules

### Variables

Python variables are dynamically typed, but you should still use type hints in production code.

```python
file_name: str = "invoice.pdf"
page_count: int = 3
is_scanned: bool = False
```

### Functions

```python
def calculate_file_size_kb(size_bytes: int) -> float:
    return round(size_bytes / 1024, 2)
```

### Loops

```python
documents = ["invoice.pdf", "contract.pdf", "policy.pdf"]

for document in documents:
    print(document)
```

### Modules

A module is just a Python file.

```text
app/
  main.py
  document_utils.py
```

`document_utils.py`:

```python
def get_extension(file_name: str) -> str:
    return file_name.split(".")[-1].lower()
```

`main.py`:

```python
from document_utils import get_extension

print(get_extension("invoice.pdf"))
```

---

## 1.4 Lists, Dictionaries, Tuples, And Sets

### Lists

Use lists for ordered collections.

```python
document_types: list[str] = ["invoice", "contract", "policy"]
```

### Dictionaries

Use dictionaries for key-value data.

```python
metadata: dict[str, str | int] = {
    "file_name": "invoice.pdf",
    "page_count": 3,
}
```

### Tuples

Use tuples for fixed pairs or immutable grouped values.

```python
date_range: tuple[str, str] = ("2026-05-01", "2026-05-31")
```

### Sets

Use sets for uniqueness.

```python
allowed_extensions: set[str] = {"pdf", "txt", "docx"}
```

### Product Connection

Document processing uses all four:

- list of chunks
- dictionary of metadata
- tuple for coordinate ranges or date ranges
- set of allowed document types

---

## 1.5 Type Hints And Clean Python Code

### Goal

Write Python that is easy to understand and safe to change.

### Why Type Hints Matter

Python does not force types at runtime by default, but type hints help:

- editor autocomplete
- code review
- documentation
- refactoring
- fewer accidental bugs

### Example

```python
def detect_document_type(file_name: str, text: str) -> str:
    lowered = text.lower()

    if "invoice" in lowered:
        return "invoice"

    if "agreement" in lowered or "contract" in lowered:
        return "contract"

    return "unknown"
```

### Clean Code Rules

- Use clear function names
- Keep functions small
- Prefer explicit return types
- Avoid clever one-liners
- Raise useful exceptions
- Separate business logic from route handlers

---

## 1.6 Classes And Object-Oriented Python

### Goal

Understand classes enough to organize services, clients, and processors.

### Example

```python
class DocumentClassifier:
    def classify(self, text: str) -> str:
        lowered = text.lower()

        if "invoice" in lowered:
            return "invoice"

        if "agreement" in lowered:
            return "contract"

        return "unknown"
```

Usage:

```python
classifier = DocumentClassifier()
document_type = classifier.classify("This invoice is due in 30 days.")
```

### Product Connection

Later modules may use classes like:

- `DocumentParser`
- `EmbeddingService`
- `RagService`
- `ExtractionService`
- `EvaluationRunner`

---

## 1.7 Dataclasses And Pydantic Models

### Goal

Know when to use plain dataclasses and when to use Pydantic.

### Dataclass

Use dataclasses for simple internal Python data containers.

```python
from dataclasses import dataclass

@dataclass
class UploadedDocument:
    file_name: str
    size_bytes: int
    content_type: str
```

### Pydantic

Use Pydantic for API input/output validation.

```python
from pydantic import BaseModel

class DocumentUploadResponse(BaseModel):
    document_id: str
    file_name: str
    size_bytes: int
    content_type: str
    status: str
```

### Product Connection

Pydantic will validate:

- extraction schemas
- API responses
- LLM structured outputs
- workflow tool inputs

---

## 1.8 Error Handling And Exception Design

### Goal

Fail clearly instead of silently producing bad AI output.

### Basic Try/Except

```python
try:
    size = int("123")
except ValueError:
    size = 0
```

### Custom Exception

```python
class UnsupportedFileTypeError(Exception):
    pass
```

Usage:

```python
def validate_extension(extension: str) -> None:
    allowed = {"pdf", "txt"}

    if extension not in allowed:
        raise UnsupportedFileTypeError(f"Unsupported file type: {extension}")
```

### Product Connection

AI systems fail in many places:

- invalid files
- PDF parsing errors
- malformed LLM JSON
- vector DB errors
- timeouts
- missing citations

Good exceptions make debugging possible.

---

## 1.9 Working With Files, JSON, And Environment Variables

### Files

Use `pathlib` for paths.

```python
from pathlib import Path

upload_dir = Path("uploads")
upload_dir.mkdir(exist_ok=True)
```

### JSON

```python
import json

payload = {"document_type": "invoice"}
json_text = json.dumps(payload)
data = json.loads(json_text)
```

### Environment Variables

```python
import os

api_key = os.getenv("OPENAI_API_KEY")
```

### Product Connection

Orvion DocIntel will use environment variables for:

- LLM API keys
- database URLs
- Redis URLs
- storage credentials
- model names

Never hardcode secrets in code.

---

## 1.10 Async Python Basics

### Goal

Understand `async` and `await` enough to work with FastAPI and AI APIs.

### Plain-English Explanation

Async lets Python wait for slow I/O without blocking the whole server.

Slow I/O includes:

- HTTP calls to LLM APIs
- database queries
- file uploads
- vector database calls

### Example

```python
async def summarize_document(text: str) -> str:
    return "summary placeholder"
```

### JavaScript Comparison

JavaScript:

```ts
async function getSummary() {
  const result = await callModel();
  return result;
}
```

Python:

```python
async def get_summary() -> str:
    result = await call_model()
    return result
```

### Product Connection

FastAPI route handlers are often async:

```python
@app.get("/health")
async def health_check():
    return {"status": "ok"}
```

---

## 1.11 Virtual Environments And Dependency Management

### Goal

Keep dependencies predictable.

### Basic Workflow

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install fastapi uvicorn pytest
pip freeze > requirements.txt
```

Install from requirements:

```powershell
pip install -r requirements.txt
```

### Suggested `.gitignore`

```text
.venv/
__pycache__/
.pytest_cache/
uploads/
.env
```

### Product Connection

Later, Docker will install from `requirements.txt` or `pyproject.toml`.

---

## 1.12 FastAPI Introduction

### Goal

Create the first API service for Orvion DocIntel.

### Minimal FastAPI App

```python
from fastapi import FastAPI

app = FastAPI(title="Orvion DocIntel AI Service")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
```

Run:

```powershell
uvicorn app.main:app --reload
```

Visit:

```text
http://localhost:8000/docs
```

### Why FastAPI

FastAPI is a good fit because it provides:

- clean route definitions
- async support
- Pydantic validation
- automatic OpenAPI docs
- strong Python type integration
- good developer experience

---

## 1.13 Building Clean API Routes

### Goal

Keep route handlers thin and move business logic into services.

### Less Clean

```python
@app.post("/documents/upload")
async def upload_document(file: UploadFile):
    # validation, saving, metadata, response all mixed here
    ...
```

### Cleaner

```python
@router.post("/documents/upload")
async def upload_document(file: UploadFile):
    result = await document_service.save_upload(file)
    return result
```

### Recommended Folder Shape

```text
app/
  main.py
  api/
    documents.py
  core/
    config.py
  models/
    documents.py
  services/
    document_service.py
  utils/
    files.py
tests/
  test_health.py
  test_documents.py
```

---

## 1.14 Request Validation With Pydantic

### Goal

Use schemas so APIs and AI outputs have predictable shapes.

### Response Model

```python
from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: str
```

Route:

```python
@app.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(status="ok")
```

### Product Connection

In later modules, this same pattern will validate extracted invoices:

```python
class InvoiceExtraction(BaseModel):
    invoice_number: str | None = None
    vendor_name: str | None = None
    total_amount: float | None = None
    currency: str | None = None
```

---

## 1.15 Python Project Folder Structure

### Goal

Use a structure that can grow.

### Starting Structure

```text
module-01-python-fastapi/
  app/
    __init__.py
    main.py
    api/
      __init__.py
      documents.py
    models/
      __init__.py
      documents.py
    services/
      __init__.py
      document_service.py
  tests/
    test_health.py
    test_documents.py
  uploads/
  requirements.txt
  README.md
```

### Why This Works

- `api` owns routes
- `models` owns schemas
- `services` owns business logic
- `tests` owns verification
- `uploads` stores local files during early development

---

## 1.16 Testing With pytest

### Goal

Test basic backend behavior.

### Simple Test

```python
def test_addition():
    assert 1 + 1 == 2
```

### FastAPI Test

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
```

### Product Connection

Later, tests will verify:

- extraction output shape
- RAG refusal behavior
- citation presence
- document type classification
- prompt regression cases

---

## 1.17 Logging In Python Applications

### Goal

Log enough to debug without leaking sensitive document data.

### Basic Logging

```python
import logging

logger = logging.getLogger(__name__)

logger.info("Document uploaded", extra={"file_name": "invoice.pdf"})
```

### Safe Logging Rule

Log metadata, not document contents.

Good:

```text
Uploaded invoice.pdf, size 120931 bytes
```

Bad:

```text
Uploaded document text: full contract contents...
```

### Product Connection

Document AI products handle sensitive data. Safe logging starts now.

---

## 1.18 Building Your First AI-Ready FastAPI Service

### Goal

Build the first working backend service for Orvion DocIntel.

### Requirements

Create:

- health route
- document upload route
- Pydantic response models
- file validation
- local file save
- metadata response
- tests
- logs

### API Contract

`GET /health`

Response:

```json
{
  "status": "ok"
}
```

`POST /documents/upload`

Request:

```text
multipart/form-data with file
```

Response:

```json
{
  "document_id": "doc_...",
  "file_name": "invoice.pdf",
  "content_type": "application/pdf",
  "size_bytes": 120931,
  "extension": "pdf",
  "status": "uploaded"
}
```

### Acceptance Criteria

- health route returns `200`
- upload route accepts `.pdf` and `.txt`
- upload route rejects unsupported extensions
- uploaded file is saved locally
- response includes file metadata
- tests pass

---

## Module 1 Assignment

Complete the lab in:

`labs/module-01-python-fastapi/README.md`

Then answer:

1. What is a virtual environment?
2. Why does FastAPI use Pydantic?
3. Why should route handlers stay thin?
4. Why should document text not be logged?
5. What will the upload API enable in Module 3?

## Quiz

1. What is the Python equivalent of `node_modules` isolation?
2. What naming style should Python functions use?
3. When would you use a dictionary?
4. What does `async def` mean?
5. What is the purpose of `response_model` in FastAPI?
6. Why should AI backend code use type hints?
7. What dependency is needed for FastAPI file uploads?
8. What is pytest used for?
9. What should be stored in environment variables?
10. Why is safe logging important in document AI?

## Answer Key

1. A virtual environment.
2. `snake_case`.
3. For key-value data like document metadata.
4. It defines an asynchronous function that can await I/O operations.
5. It validates and documents the response shape.
6. Type hints improve readability, editor support, refactoring, and correctness.
7. `python-multipart`.
8. Testing Python code.
9. Secrets and deployment-specific configuration like API keys and database URLs.
10. Documents may contain confidential business or personal information.

## Interview Questions

1. Why would you choose Python for the AI service?
2. How is FastAPI different from Express?
3. What is Pydantic used for?
4. How would you structure a Python backend project?
5. How do you handle file uploads safely?
6. What are common mistakes when building Python APIs?
7. How do you test a FastAPI endpoint?
8. Why does async matter in AI applications?

## Source Links

- Python tutorial: https://docs.python.org/3/tutorial/
- Python virtual environments: https://docs.python.org/3/library/venv.html
- Python asyncio: https://docs.python.org/3/library/asyncio.html
- FastAPI docs: https://fastapi.tiangolo.com/
- FastAPI request bodies: https://fastapi.tiangolo.com/tutorial/body/
- FastAPI file uploads: https://fastapi.tiangolo.com/tutorial/request-files/
- FastAPI testing: https://fastapi.tiangolo.com/tutorial/testing/
- Pydantic docs: https://docs.pydantic.dev/
- pytest docs: https://docs.pytest.org/

