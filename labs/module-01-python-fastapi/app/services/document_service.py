import logging
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.models.documents import DocumentUploadResponse

logger = logging.getLogger(__name__)

UPLOAD_DIR = Path("uploads")
ALLOWED_EXTENSIONS = {"pdf", "txt"}


class UnsupportedFileTypeError(Exception):
    pass


def get_extension(file_name: str) -> str:
    if "." not in file_name:
        return ""

    return file_name.rsplit(".", 1)[-1].lower()


def validate_extension(extension: str) -> None:
    if extension not in ALLOWED_EXTENSIONS:
        raise UnsupportedFileTypeError(f"Unsupported file type: {extension or 'unknown'}")


async def save_uploaded_document(file: UploadFile) -> DocumentUploadResponse:
    extension = get_extension(file.filename or "")
    validate_extension(extension)

    document_id = f"doc_{uuid4().hex}"
    safe_file_name = Path(file.filename or f"upload.{extension}").name
    saved_file_name = f"{document_id}_{safe_file_name}"

    UPLOAD_DIR.mkdir(exist_ok=True)
    destination = UPLOAD_DIR / saved_file_name

    content = await file.read()
    destination.write_bytes(content)

    logger.info(
        "Document uploaded",
        extra={
            "document_id": document_id,
            "file_name": safe_file_name,
            "size_bytes": len(content),
            "extension": extension,
        },
    )

    return DocumentUploadResponse(
        document_id=document_id,
        file_name=safe_file_name,
        content_type=file.content_type or "application/octet-stream",
        size_bytes=len(content),
        extension=extension,
        status="uploaded",
    )

