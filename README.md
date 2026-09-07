# Ether Board of Advisors

An editorial-grade, single-page (long-scroll) website for **Etherwire's** curated board advisory initiative — profiling 18 hand-selected leaders for distinguished boardroom placement.

Quiet-luxury aesthetic (ivory `#F5F1EA`, charcoal `#111111`, antique gold `#B08D57`) with premium motion via **framer-motion** and **lenis** smooth scrolling.

---

## Sections (single long-scroll page)

Hero (kinetic masked reveal + parallax) → The Initiative → Five Pillars → Profile Your Seat → The 18 → **Selection Framework** → How It Works → Onboarding & Selection → Who This Is For → **Apply / Enquire** → Marquee + Final CTA → Footer.

The **Selection Framework** presents 8 numbered, weighted criteria with count-up percentages, animated gold weighting bars, and a one-line description that reveals on hover — plus a summary stat block (`08 Criteria` · `100% Total Weighting`).

The **Apply** section is a two-column layout: an editorial intro with contact details on the left and a light card on the right with tabs — **Apply for Cohort** (director) and **Enquire as Company**.

---

## Tech Stack

| Layer     | Technology                                                            |
|-----------|-----------------------------------------------------------------------|
| Frontend  | React (CRA + CRACO), Tailwind CSS, framer-motion, lenis, sonner, lucide-react |
| Backend   | FastAPI, Motor (async MongoDB), Pydantic, httpx                       |
| Database  | MongoDB                                                               |
| Email     | Emergent-managed Resend proxy (submission confirmations)              |
| Files     | CV / ID uploads stored as base64 in MongoDB                           |

---

## Prerequisites

- **Python 3.11+**
- **Node.js 18+** and **Yarn** (classic 1.22 — this project uses yarn, not npm)
- **MongoDB** running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

---

## 1. MongoDB

Install the MongoDB Community Server and make sure it is running on the default port `27017`.

---

## 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
# Windows:      venv\Scripts\activate
# macOS/Linux:  source venv/bin/activate

pip install -r requirements.txt
# One package is served from Emergent's index:
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/
```

Create `backend/.env`:

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="ether_board"
CORS_ORIGINS="*"
EMERGENT_EMAIL_KEY=ek_1bdc9249deb6176c0f5cd4f1a01f9c89
EMAIL_FROM_NAME=Ether Board of Advisors
```

Run the API (must be port `8001`; the app object is `server:app`):

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

---

## 3. Frontend (React)

```bash
cd frontend
yarn install
```

Create / edit `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Run the dev server:

```bash
yarn start
```

App runs at `http://localhost:3000`.

---

## API Endpoints

All routes are prefixed with `/api`.

| Method | Endpoint                       | Description                                                        |
|--------|--------------------------------|--------------------------------------------------------------------|
| GET    | `/api/`                        | Health check                                                       |
| POST   | `/api/applications/director`   | Director application (multipart form + optional CV / ID uploads)   |
| POST   | `/api/enquiries/company`       | Company enquiry (JSON)                                             |
| GET    | `/api/admin/applications`      | List submissions (`?kind=all\|director\|company`)                  |

### Quick test

```bash
# Company enquiry
curl -X POST http://localhost:8001/api/enquiries/company \
  -H "Content-Type: application/json" \
  -d '{"company_name":"Acme","contact_name":"Jane Doe","email":"jane@acme.com","board_priorities":"Governance depth"}'

# Director application (multipart)
curl -X POST http://localhost:8001/api/applications/director \
  -F "full_name=John Doe" -F "email=john@example.com" -F "category=A" \
  -F "sector_expertise=Renewables" -F "board_experience=20 years" \
  -F "statement_of_purpose=..." -F "eligibility_confirmed=true"
```

---

## Project Structure

```
.
├── backend/
│   ├── server.py            # FastAPI app: applications, enquiries, admin, email
│   ├── requirements.txt
│   └── .env                 # MONGO_URL, DB_NAME, CORS_ORIGINS, EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME
└── frontend/
    ├── package.json
    ├── .env                 # REACT_APP_BACKEND_URL
    └── src/
        ├── App.js           # Single-page site + Lenis smooth scroll + Toaster
        ├── index.css        # Fonts (Cormorant Garamond, Manrope) + design tokens
        ├── lib/motion.jsx   # Reveal / MaskLine framer-motion helpers
        └── components/site/ # Nav, SideRail, Hero, Initiative, ProfileSeat,
                             #   Framework, Onboarding, ApplyV2, Closing
```

---

## Notes

- The frontend calls `${REACT_APP_BACKEND_URL}/api`, so both servers must be running for forms to work.
- **Email** goes through Emergent's managed Resend proxy — it works locally as long as `EMERGENT_EMAIL_KEY` is set. Sending is best-effort and never blocks a form submission.
- **File uploads** (CV / ID) are stored as base64 in MongoDB — no external object storage required for local dev.
