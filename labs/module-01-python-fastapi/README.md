# Module 1 Lab: AI-Ready FastAPI Document Upload Service

## Goal

Build the first backend service for Orvion DocIntel.

This service does not extract PDF text yet. That comes later. For now, it proves you can create a Python API, accept document uploads, validate files, save them locally, return metadata, and test the behavior.

## What You Will Build

Endpoints:

- `GET /health`
- `POST /documents/upload`

Features:

- file upload using FastAPI
- extension validation
- local storage
- metadata response
- Pydantic response models
- pytest tests
- safe logging

## Setup

From this lab folder:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Run the API:

```powershell
uvicorn app.main:app --reload
```

Open:

```text
http://localhost:8000/docs
```

## Run Tests

```powershell
pytest
```

## API Contract

### Health

Request:

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

### Upload Document

Request:

```http
POST /documents/upload
Content-Type: multipart/form-data
```

Form field:

```text
file
```

Response:

```json
{
  "document_id": "doc_...",
  "file_name": "invoice.pdf",
  "content_type": "application/pdf",
  "size_bytes": 12345,
  "extension": "pdf",
  "status": "uploaded"
}
```

## Acceptance Criteria

- [ ] `/health` returns `200`.
- [ ] `/documents/upload` accepts `.pdf`.
- [ ] `/documents/upload` accepts `.txt`.
- [ ] unsupported extensions return `400`.
- [ ] uploaded files are saved in `uploads/`.
- [ ] tests pass.

## Why This Matters For Orvion DocIntel

Every later feature starts with uploaded documents:

- PDF text extraction
- document classification
- structured extraction
- embeddings
- RAG
- citations
- workflows
- evaluation

This lab creates the first stable entry point into that pipeline.

