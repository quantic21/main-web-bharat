# Ether Board of Advisors & Key Personnel

An editorial-grade web application for **Etherwire's** curated board advisory initiative — profiling hand-selected leaders for distinguished boardroom placement and showcasing Etherwire's key personnel and leadership.

Quiet-luxury aesthetic (ivory `#F7F5F0`, deep charcoal `#141214`, accent burgundy `#A82B52`) with premium motion via **framer-motion** and **lenis** smooth scrolling.

---

## 🏛 Page & Section Structure

1. **Main Platform (`/`)**:
   - **Hero** (Kinetic masked reveal + parallax)
   - **The Initiative** (Ethical AI & Boardroom relevance)
   - **Five Pillars & Profile Your Seat**
   - **Selection Framework** (8 weighted criteria with animated bars)
   - **Onboarding & Selection Process**
   - **Apply / Enquire** (Director Application + Company Enquiry with modal forms)
   - **Closing Footer & Direct Links**

2. **Key Personnel & Leadership (`/team` & `/people`)**:
   - **Executive Spotlight**: Dedicated feature section for Founder & CEO Jyoti Rai with key stats ($5B+ capital raised, $100B+ serviced, G20 Whitepaper, Raghuram Rajan Team).
   - **Interactive Team Directory**: Categorized filter tabs (All Personnel, Leadership & Founders, Board of Directors, Board of Advisors).
   - **Key Leader Profiles**: Detailed cards for Sarita Bahl, Dr. Rajani Tewari, Shri. Soumya Kant Padhi, Dr. V. Aditya Srinivas, Shri. Anand Chamaria, and Jacinta D'Souza.
   - **Bio Slide-over Drawer**: Full career biography, education, awards, key focus areas, and direct LinkedIn profile links.

---

## 🛠 Tech Stack

| Layer     | Technology                                                            |
|-----------|-----------------------------------------------------------------------|
| Frontend  | React (CRA + CRACO), Tailwind CSS, Framer Motion, Lenis, Sonner, Lucide React |
| Backend   | FastAPI, Motor (async MongoDB), Pydantic, Uvicorn, HTTPX              |
| Database  | MongoDB                                                               |
| Email     | Emergent-managed Resend proxy (submission confirmations)              |
| Storage   | Stored as base64 in MongoDB / Static assets in `public/etherwire-pics` |

---

## ⚡ Prerequisites

- **Python 3.11+**
- **Node.js 18+** (NPM or Yarn)
- **MongoDB** running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

---

## 🚀 Getting Started

### 1. Database Setup

Install MongoDB Community Server and ensure it is running on default port `27017`.

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv

# Windows PowerShell:  venv\Scripts\Activate.ps1
# macOS/Linux:         source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="ether_board"
CORS_ORIGINS="*"
EMERGENT_EMAIL_KEY=ek_1bdc9249deb6176c0f5cd4f1a01f9c89
EMAIL_FROM_NAME=Ether Board of Advisors
```

Run the FastAPI backend server (Port `8000`):

```bash
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend (React)

```bash
cd frontend
npm install
```

Create/check `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

Run the development server:

```bash
npm start
```

The application will launch at `http://localhost:3000`.

---

## 📡 API Endpoints

All backend routes are prefixed with `/api`.

| Method | Endpoint                       | Description                                                        |
|--------|--------------------------------|--------------------------------------------------------------------|
| GET    | `/api/`                        | Health check                                                       |
| POST   | `/api/applications/director`   | Director application (multipart form + optional CV / ID uploads)   |
| POST   | `/api/enquiries/company`       | Company enquiry (JSON)                                             |
| GET    | `/api/admin/applications`      | List submissions (`?kind=all\|director\|company`)                  |

---

## 📁 Project Structure

```
.
├── backend/
│   ├── server.py            # FastAPI backend (applications, enquiries, email)
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── package.json
    ├── .env
    ├── public/
    │   └── etherwire-pics/  # High-resolution key personnel imagery
    └── src/
        ├── App.js           # Main routing & layout (/ and /team)
        ├── index.css        # Quiet-luxury styling tokens & typography
        ├── data/
        │   └── teamData.js  # Key personnel data (biographies, stats, photos)
        ├── pages/
        │   └── TeamPage.jsx # Key Personnel & Leadership Page component
        └── components/site/ # Nav, SideRail, Hero, Initiative, ProfileSeat,
                             # Framework, Onboarding, ApplyV2, Closing
```
