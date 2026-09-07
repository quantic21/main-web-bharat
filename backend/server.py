import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException, Query, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import base64
import logging
import httpx
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend proxy)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]

MAX_FILE_BYTES = 8 * 1024 * 1024  # 8 MB

app = FastAPI(title="Ether Board of Advisors")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url.path}: {exc}", exc_info=True)
    origin = request.headers.get("origin", "*")
    headers = {
        "Access-Control-Allow-Origin": origin if origin else "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    }
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"},
        headers=headers,
    )

api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ----------------------------- Models -----------------------------
def now_iso():
    return datetime.now(timezone.utc).isoformat()


class StoredFile(BaseModel):
    filename: str
    content_type: str
    size: int
    data_base64: str


class DirectorApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["director"] = "director"
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    category: Optional[str] = None
    sector_expertise: str
    board_experience: str
    thought_leadership_links: Optional[str] = None
    statement_of_purpose: str
    eligibility_confirmed: bool = True
    cv: Optional[StoredFile] = None
    id_certification: Optional[StoredFile] = None
    created_at: str = Field(default_factory=now_iso)


class CompanyEnquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["company"] = "company"
    company_name: str
    contact_name: str
    email: EmailStr
    phone: Optional[str] = None
    website: Optional[str] = None
    sector: Optional[str] = None
    board_priorities: str
    created_at: str = Field(default_factory=now_iso)


class CompanyEnquiryCreate(BaseModel):
    company_name: str
    contact_name: str
    email: EmailStr
    phone: Optional[str] = None
    website: Optional[str] = None
    sector: Optional[str] = None
    board_priorities: str


# ----------------------------- Email -----------------------------
async def send_confirmation_email(recipient: str, subject: str, html: str, reply_to: Optional[str] = None):
    payload = {
        "to": [recipient],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as hc:
            resp = await hc.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Email send failed: {e}")
        return False


def email_shell(title: str, body: str) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1EA;padding:40px 0;font-family:Georgia,'Times New Roman',serif;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid rgba(17,17,17,0.08);">
          <tr><td style="padding:40px 48px;border-bottom:1px solid rgba(176,141,87,0.4);">
            <div style="font-size:11px;letter-spacing:3px;color:#B08D57;text-transform:uppercase;">An Initiative by Etherwire</div>
            <div style="font-size:22px;color:#111111;margin-top:8px;letter-spacing:1px;">Ether Board of Advisors</div>
          </td></tr>
          <tr><td style="padding:40px 48px;color:#111111;">
            <h1 style="font-size:26px;font-weight:normal;margin:0 0 20px;color:#111111;">{title}</h1>
            <div style="font-size:15px;line-height:1.7;color:#333333;font-family:Helvetica,Arial,sans-serif;">{body}</div>
          </td></tr>
          <tr><td style="padding:24px 48px;background:#111111;color:#F5F1EA;font-family:Helvetica,Arial,sans-serif;font-size:12px;">
            Only 18 Will Be Profiled &middot; Etherwire
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


# ----------------------------- File helper -----------------------------
async def read_upload(upload: Optional[UploadFile]) -> Optional[StoredFile]:
    if upload is None or not upload.filename:
        return None
    content = await upload.read()
    if len(content) > MAX_FILE_BYTES:
        raise HTTPException(status_code=413, detail=f"File '{upload.filename}' exceeds 8MB limit")
    return StoredFile(
        filename=upload.filename,
        content_type=upload.content_type or "application/octet-stream",
        size=len(content),
        data_base64=base64.b64encode(content).decode("utf-8"),
    )


# ----------------------------- Sheet & SMTP Helpers -----------------------------
async def push_to_google_sheet(payload: dict):
    """Sends submission data to the Google Apps Script Webhook."""
    webhook_url = os.environ.get("GOOGLE_SHEET_WEBHOOK_URL")
    if not webhook_url:
        logger.warning("GOOGLE_SHEET_WEBHOOK_URL not set in .env")
        return
    try:
        async with httpx.AsyncClient(timeout=10, follow_redirects=True) as hc:
            resp = await hc.post(webhook_url, json=payload)
            resp.raise_for_status()
            logger.info("Successfully pushed submission to Google Sheet.")
    except Exception as e:
        logger.error(f"Failed to push to Google Sheet: {e}")


def send_admin_smtp_notification(applicant_name: str, applicant_email: str, form_type: str, details: Optional[dict] = None):
    """Sends an SMTP notification email to the admin with a direct Google Sheet link."""
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_user = os.environ.get("SMTP_USERNAME")
    smtp_pass = os.environ.get("SMTP_PASSWORD")
    admin_email = os.environ.get("ADMIN_EMAIL")
    sheet_link = os.environ.get("GOOGLE_SHEET_ADMIN_LINK", "#")

    if not all([smtp_host, smtp_user, smtp_pass, admin_email]):
        logger.warning("SMTP settings incomplete. Admin email skipped.")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🔔 New {form_type} Received: {applicant_name}"
    msg["From"] = smtp_user
    msg["To"] = admin_email

    extra_rows = ""
    if details:
        if details.get("phone"):
            extra_rows += f"""
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">{details['phone']}</td>
            </tr>"""
        if details.get("linkedin"):
            extra_rows += f"""
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">LinkedIn:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="{details['linkedin']}" target="_blank">{details['linkedin']}</a></td>
            </tr>"""

    html_content = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #ddd; padding: 25px; border-radius: 8px;">
        <h2 style="color: #111; margin-top: 0;">New Response Submitted</h2>
        <p>A new <strong>{form_type}</strong> has just been submitted on your website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 120px; border-bottom: 1px solid #eee;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{applicant_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:{applicant_email}">{applicant_email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Type:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{form_type}</td>
          </tr>
          {extra_rows}
        </table>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="{sheet_link}" target="_blank" style="background-color: #B08D57; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            📊 View All Responses in Google Sheet
          </a>
        </div>
      </div>
    </div>
    """
    msg.attach(MIMEText(html_content, "html"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        logger.info(f"Admin SMTP notification sent to {admin_email}.")
    except Exception as e:
        logger.error(f"Failed to send admin SMTP notification: {e}")


async def run_background_post_processing(sheet_data: dict, applicant_name: str, applicant_email: str, form_type: str, email_subject: str, email_body: str):
    try:
        await push_to_google_sheet(sheet_data)
    except Exception as e:
        logger.error(f"Background Google Sheet task error: {e}")

    try:
        await asyncio.to_thread(send_admin_smtp_notification, applicant_name, applicant_email, form_type, sheet_data)
    except Exception as e:
        logger.error(f"Background SMTP task error: {e}")

    try:
        await send_confirmation_email(applicant_email, email_subject, email_body)
    except Exception as e:
        logger.error(f"Background confirmation email task error: {e}")


# ----------------------------- Routes -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Ether Board of Advisors API"}


@api_router.post("/applications/director")
async def create_director_application(
    background_tasks: BackgroundTasks,
    full_name: str = Form(...),
    email: EmailStr = Form(...),
    phone: Optional[str] = Form(None),
    linkedin: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    sector_expertise: str = Form(...),
    board_experience: str = Form(...),
    thought_leadership_links: Optional[str] = Form(None),
    statement_of_purpose: str = Form(...),
    eligibility_confirmed: bool = Form(False),
    cv: Optional[UploadFile] = File(None),
    id_certification: Optional[UploadFile] = File(None),
):
    cv_file = await read_upload(cv)
    id_file = await read_upload(id_certification)

    application = DirectorApplication(
        full_name=full_name,
        email=email,
        phone=phone,
        linkedin=linkedin,
        category=category,
        sector_expertise=sector_expertise,
        board_experience=board_experience,
        thought_leadership_links=thought_leadership_links,
        statement_of_purpose=statement_of_purpose,
        eligibility_confirmed=eligibility_confirmed,
        cv=cv_file,
        id_certification=id_file,
    )
    try:
        await db.applications.insert_one(application.model_dump())
    except Exception as db_err:
        logger.warning(f"MongoDB insert skipped or failed (local DB offline): {db_err}")

    sheet_data = {
        "created_at": application.created_at,
        "form_type": "Director Application",
        "sheet_name": "Director Application",
        "tab": "Director Application",
        "type": "Director Application",
        "full_name": full_name,
        "name": full_name,
        "email": email,
        "phone": phone or "",
        "sector_expertise": sector_expertise or "",
        "board_experience": board_experience or "",
        "statement_of_purpose": statement_of_purpose or "",
        "linkedin": linkedin or "",
        "thought_leadership_links": thought_leadership_links or "",
        "category": category or "",
    }

    body = (
        f"Dear {full_name},<br><br>"
        "Thank you for putting yourself forward for consideration to the Ether Board of Advisors. "
        "Your application has been received and enters our curated selection process.<br><br>"
        "Every submission is reviewed with care. Should your profile progress beyond initial screening, "
        "our team will reach out regarding the panel interview stage.<br><br>"
        "From qualified to chosen.<br><br>"
        "&mdash; The Etherwire Team"
    )

    background_tasks.add_task(
        run_background_post_processing,
        sheet_data,
        full_name,
        email,
        "Director Application",
        "Your Application to the Ether Board of Advisors",
        email_shell("Application Received", body),
    )

    return {"status": "success", "id": application.id}


@api_router.post("/enquiries/company")
async def create_company_enquiry(payload: CompanyEnquiryCreate, background_tasks: BackgroundTasks):
    enquiry = CompanyEnquiry(**payload.model_dump())
    try:
        await db.enquiries.insert_one(enquiry.model_dump())
    except Exception as db_err:
        logger.warning(f"MongoDB insert skipped or failed (local DB offline): {db_err}")

    sheet_data = {
        "created_at": enquiry.created_at,
        "form_type": "Company Enquiry",
        "sheet_name": "Company Enquiry",
        "tab": "Company Enquiry",
        "type": "Company Enquiry",
        "company_name": payload.company_name,
        "contact_name": payload.contact_name,
        "full_name": f"{payload.contact_name} ({payload.company_name})",
        "name": payload.contact_name,
        "email": payload.email,
        "phone": payload.phone or "",
        "sector_expertise": payload.sector or "",
        "sector": payload.sector or "",
        "board_experience": payload.board_priorities or "",
        "board_priorities": payload.board_priorities or "",
        "statement_of_purpose": "",
        "website": payload.website or "",
        "linkedin": payload.website or "",
        "thought_leadership_links": "",
        "category": "",
    }

    body = (
        f"Dear {payload.contact_name},<br><br>"
        f"Thank you for your enquiry on behalf of {payload.company_name}. "
        "We have received your board priorities and will be in touch to explore how the Ether Board of "
        "Advisors can align distinguished, board-ready leadership with your organisation.<br><br>"
        "&mdash; The Etherwire Team"
    )

    background_tasks.add_task(
        run_background_post_processing,
        sheet_data,
        payload.contact_name,
        payload.email,
        f"Company Enquiry ({payload.company_name})",
        "Your Enquiry to the Ether Board of Advisors",
        email_shell("Enquiry Received", body),
    )

    return {"status": "success", "id": enquiry.id}


@api_router.get("/admin/applications")
async def list_applications(kind: str = Query("all", pattern="^(all|director|company)$")):
    result = {}
    if kind in ("all", "director"):
        docs = await db.applications.find({}, {"_id": 0, "cv.data_base64": 0, "id_certification.data_base64": 0}).sort("created_at", -1).to_list(1000)
        result["directors"] = docs
    if kind in ("all", "company"):
        docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        result["companies"] = docs
    return result


app.include_router(api_router)

origins = [o.strip() for o in os.environ.get('CORS_ORIGINS', '*').split(',') if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins if origins else ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
