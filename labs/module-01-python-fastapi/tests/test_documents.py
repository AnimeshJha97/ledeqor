from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_upload_pdf_document() -> None:
    response = client.post(
        "/documents/upload",
        files={"file": ("invoice.pdf", b"fake pdf bytes", "application/pdf")},
    )

    body = response.json()

    assert response.status_code == 200
    assert body["file_name"] == "invoice.pdf"
    assert body["content_type"] == "application/pdf"
    assert body["size_bytes"] == len(b"fake pdf bytes")
    assert body["extension"] == "pdf"
    assert body["status"] == "uploaded"
    assert body["document_id"].startswith("doc_")


def test_upload_txt_document() -> None:
    response = client.post(
        "/documents/upload",
        files={"file": ("policy.txt", b"Leave policy text", "text/plain")},
    )

    assert response.status_code == 200
    assert response.json()["extension"] == "txt"


def test_rejects_unsupported_file_type() -> None:
    response = client.post(
        "/documents/upload",
        files={"file": ("image.png", b"not allowed", "image/png")},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported file type: png"

