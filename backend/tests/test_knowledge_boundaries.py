import asyncio
import importlib.util
import sys
import types
from io import BytesIO
from unittest.mock import AsyncMock, Mock

import pytest
from fastapi import HTTPException, UploadFile

# The session service imports the optional reranker at module load time. Keep
# these boundary tests runnable in the lightweight test environment as well.
if importlib.util.find_spec("torch") is None:
    torch_stub = types.ModuleType("torch")
    torch_stub.cuda = types.SimpleNamespace(is_available=lambda: False)
    sys.modules["torch"] = torch_stub

from app.router import chat_service
from app.router import knowledge_service as knowledge_service_module
from app.router.knowledge_service import KnowledgeService
from app.utils import image_extractor


class _MimeDetector:
    def __init__(self, _mime: str):
        self._mime = _mime

    def from_buffer(self, _content: bytes) -> str:
        return self._mime


def test_single_upload_uses_actual_content_size_when_size_is_missing(monkeypatch):
    async def run_test():
        monkeypatch.setattr(knowledge_service_module.magic, "Magic", lambda mime=True: _MimeDetector("text/plain"))
        store = Mock()
        store.get_document = AsyncMock()
        monkeypatch.setattr(knowledge_service_module, "VectorStoreService", lambda: store)

        upload = UploadFile(filename="notes.txt", file=BytesIO(b"valid content"))
        upload.size = None

        result = await KnowledgeService().handle_add_vector_single(upload, "user-1")

        assert result == "notes.txt"
        store.get_document.assert_awaited_once_with(files=[upload], user_id="user-1")

    asyncio.run(run_test())


def test_single_upload_rejects_actual_content_over_limit(monkeypatch):
    async def run_test():
        monkeypatch.setattr(knowledge_service_module, "MAX_FILE_SIZE", 4)
        store = Mock()
        store.get_document = AsyncMock()
        monkeypatch.setattr(knowledge_service_module, "VectorStoreService", lambda: store)

        upload = UploadFile(filename="notes.txt", file=BytesIO(b"12345"))
        upload.size = 0

        with pytest.raises(HTTPException) as exc_info:
            await KnowledgeService().handle_add_vector_single(upload, "user-1")

        assert getattr(exc_info.value, "status_code", None) == 400
        store.get_document.assert_not_awaited()

    asyncio.run(run_test())


def test_multiple_uploads_use_actual_total_size(monkeypatch):
    async def run_test():
        monkeypatch.setattr(knowledge_service_module, "MAX_FOLDER_SIZE", 5)

        first = UploadFile(filename="a.txt", file=BytesIO(b"123"))
        second = UploadFile(filename="b.txt", file=BytesIO(b"456"))
        first.size = 0
        second.size = 0

        with pytest.raises(HTTPException) as exc_info:
            await KnowledgeService().handle_add_vector_multiple([first, second], "user-1")

        assert getattr(exc_info.value, "status_code", None) == 400

    asyncio.run(run_test())


def test_image_path_is_resolved_inside_document_directory(monkeypatch, tmp_path):
    monkeypatch.setattr(image_extractor, "get_data_path", lambda: str(tmp_path))
    md5 = "a" * 32
    image_dir = image_extractor.get_image_storage_dir("user-1", md5)
    image_path = tmp_path / "extracted_images" / "user-1" / md5 / "page.png"
    image_path.write_bytes(b"png")

    assert image_extractor.resolve_image_path("user-1", md5, "page.png") == str(image_path.resolve())

    with pytest.raises(ValueError):
        image_extractor.resolve_image_path("user-1", md5, "../outside.txt")
    with pytest.raises(ValueError):
        image_extractor.resolve_image_path("user-1", "not-an-md5", "page.png")
    with pytest.raises(ValueError):
        image_extractor.resolve_image_path("user-1", md5, "page.txt")

    assert image_dir == str((tmp_path / "extracted_images" / "user-1" / md5).resolve())


def test_batch_images_only_reads_supported_image_files(monkeypatch, tmp_path):
    monkeypatch.setattr(image_extractor, "get_data_path", lambda: str(tmp_path))
    md5 = "b" * 32
    image_dir = image_extractor.get_image_storage_dir("user-1", md5)
    (tmp_path / "extracted_images" / "user-1" / md5 / "page.PNG").write_bytes(b"png")
    (tmp_path / "extracted_images" / "user-1" / md5 / "secret.txt").write_bytes(b"secret")

    result = asyncio.run(KnowledgeService().handle_get_batch_images("user-1", md5))

    assert set(result["images"]) == {"page.PNG"}
    assert result["images"]["page.PNG"].startswith("data:image/png;base64,")
    assert image_dir == str((tmp_path / "extracted_images" / "user-1" / md5))


def test_all_sessions_query_is_scoped_to_user(monkeypatch):
    async def run_test():
        calls: list[str | None] = []

        async def get_all_session_ids(user_id: str | None = None) -> list[str]:
            calls.append(user_id)
            return ["session-1"]

        monkeypatch.setattr(chat_service.sm.session_manager, "get_all_session_ids", get_all_session_ids)

        result = await chat_service.ChatService().handle_get_all_sessions("user-1")

        assert result == ["session-1"]
        assert calls == ["user-1"]

    asyncio.run(run_test())
