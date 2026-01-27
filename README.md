# Dailygrup Platform

Real-time Brand & CSR monitoring platform for Georgian media.

## Structure
- `frontend/` – React web application (dashboard, mentions, CSR tracker)
- `backend/` – FastAPI backend (API, NLP, scrapers)

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
