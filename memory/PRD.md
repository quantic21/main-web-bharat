# Ether Board of Advisors — PRD

## Original Problem Statement
Editorial-grade single-page (long-scroll) site for Etherwire's board advisory initiative — 18 hand-selected leaders. Quiet-luxury aesthetic: ivory (#F5F1EA), charcoal (#111), gold (#B08D57), serif display + humanist sans. Awwwards-level motion (framer-motion + lenis).

## User Choices
- Accent: gold/brass (#B08D57)
- Logo: crafted typographic wordmark "Ether·Board of Advisors"
- Application form: inline expanding section
- Email: Emergent-managed Resend
- Admin: basic API endpoint

## Architecture
- Frontend: React (JS) + Tailwind + framer-motion + lenis smooth scroll. Sections in /app/frontend/src/components/site/. Routing in App.js.
- Backend: FastAPI /app/backend/server.py. MongoDB collections: applications (director), enquiries (company). Files stored base64 in Mongo.
- Email: Emergent Resend proxy (EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME in backend/.env).

## Routes / Endpoints
- Frontend: `/` (original dark inline Apply), `/copy` (redesigned light-card Apply per screenshot)
- API: POST /api/applications/director (multipart + CV/ID uploads), POST /api/enquiries/company (JSON), GET /api/admin/applications

## Implemented (2026-07-21)
- All 12 editorial sections: kinetic hero w/ masked reveal + parallax, Initiative, Five Pillars, Profile Your Seat, The 18 motif, Selection Framework (animated gold bars), How It Works, Onboarding, Who This Is For, Apply (Director/Company toggle), marquee + final CTA, footer.
- Fixed nav + section side-rail indicator, SEO/OG meta.
- Backend forms + Resend confirmation emails + admin listing. Tested 100% pass.
- /copy variant: light card Apply with tabs (Apply for Cohort / Enquire as Company).

## Backlog / Next
- P1: Gate admin endpoint behind auth before production; admin dashboard UI.
- P2: Object storage for large files instead of base64 in Mongo.
- P2: Persist Category & full field set in /copy variant (currently category hardcoded 'A').
