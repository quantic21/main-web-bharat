"""Backend tests for Ether Board of Advisors."""
import io
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Read from frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.strip().split("=", 1)[1]
                break
BASE_URL = BASE_URL.rstrip("/")

API = f"{BASE_URL}/api"


# ---------- Director application ----------
class TestDirectorApplication:
    def test_director_no_file(self):
        data = {
            "full_name": "TEST_Alice Director",
            "email": "test_alice_director@example.com",
            "category": "A",
            "sector_expertise": "Finance",
            "board_experience": "10+ years on multiple boards",
            "statement_of_purpose": "I aim to contribute strategic financial oversight.",
            "eligibility_confirmed": "true",
        }
        r = requests.post(f"{API}/applications/director", data=data, timeout=60)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("status") == "success"
        assert isinstance(body.get("id"), str) and len(body["id"]) > 0
        pytest.director_id_no_file = body["id"]

    def test_director_with_cv_file(self):
        data = {
            "full_name": "TEST_Bob DirectorCV",
            "email": "test_bob_cv@example.com",
            "category": "B",
            "sector_expertise": "Technology",
            "board_experience": "15 years CTO",
            "statement_of_purpose": "Technology strategy advisory.",
            "eligibility_confirmed": "true",
        }
        cv_bytes = b"%PDF-1.4 fake cv content for testing"
        files = {"cv": ("cv.pdf", io.BytesIO(cv_bytes), "application/pdf")}
        r = requests.post(f"{API}/applications/director", data=data, files=files, timeout=60)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("status") == "success"
        assert isinstance(body.get("id"), str)
        pytest.director_id_with_cv = body["id"]


# ---------- Company enquiry ----------
class TestCompanyEnquiry:
    def test_company_enquiry_json(self):
        payload = {
            "company_name": "TEST_Acme Corp",
            "contact_name": "TEST_Jane Contact",
            "email": "test_acme_contact@example.com",
            "board_priorities": "We seek board advisors with FMCG and digital transformation expertise.",
        }
        r = requests.post(f"{API}/enquiries/company", json=payload, timeout=60)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("status") == "success"
        assert isinstance(body.get("id"), str)
        pytest.company_id = body["id"]


# ---------- Admin listing ----------
class TestAdminListing:
    def test_admin_lists_and_excludes_file_data(self):
        r = requests.get(f"{API}/admin/applications", timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "directors" in data
        assert "companies" in data
        assert isinstance(data["directors"], list)
        assert isinstance(data["companies"], list)

        dir_ids = {d.get("id") for d in data["directors"]}
        co_ids = {c.get("id") for c in data["companies"]}

        # Verify created records present
        assert getattr(pytest, "director_id_no_file", None) in dir_ids
        assert getattr(pytest, "director_id_with_cv", None) in dir_ids
        assert getattr(pytest, "company_id", None) in co_ids

        # Ensure no _id leaked and file data_base64 excluded
        for d in data["directors"]:
            assert "_id" not in d
            cv = d.get("cv")
            if cv:
                assert "data_base64" not in cv, "CV data_base64 should be excluded from admin listing"
                # metadata should still be present
                assert "filename" in cv
            idc = d.get("id_certification")
            if idc:
                assert "data_base64" not in idc

        for c in data["companies"]:
            assert "_id" not in c


# ---------- Validation ----------
class TestValidation:
    def test_director_missing_required_fields(self):
        r = requests.post(f"{API}/applications/director", data={"full_name": "x"}, timeout=30)
        assert r.status_code in (400, 422)

    def test_company_invalid_email(self):
        payload = {
            "company_name": "TEST_X",
            "contact_name": "TEST_Y",
            "email": "not-an-email",
            "board_priorities": "abc",
        }
        r = requests.post(f"{API}/enquiries/company", json=payload, timeout=30)
        assert r.status_code in (400, 422)
