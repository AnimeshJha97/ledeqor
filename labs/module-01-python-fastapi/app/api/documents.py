from fastapi import APIRouter, File, HTTPException, UploadFile

from app.models.documents import DocumentUploadResponse
from app.services.document_service import UnsupportedFileTypeError, save_uploaded_document

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)) -> DocumentUploadResponse:
    try:
        return await save_uploaded_document(file)
    except UnsupportedFileTypeError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

