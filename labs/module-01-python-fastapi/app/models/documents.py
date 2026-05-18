from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class DocumentUploadResponse(BaseModel):
    document_id: str
    file_name: str
    content_type: str
    size_bytes: int
    extension: str
    status: str

