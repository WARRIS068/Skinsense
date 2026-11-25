# SkinSense

A mobile app that gives non-diagnostic feedback on facial skin from one photo.
It checks acne, hyperpigmentation, dark circles and texture, gives a score,
suggests ingredients, and recommends a dermatologist for severe results.

Not a medical diagnosis.

## Structure (MVC)

- `backend/` - FastAPI server (Python)
  - `controllers/` - routes (Controller)
  - `services/`, `entities/`, `repositories/` - logic, data and database (Model)
  - `database.py` - SQLite setup
- `frontend/` - Expo app (React Native)
  - `screens/` - what the user sees (View)
  - `App.js` - state and handlers (Controller)
  - `services/api.js` - talks to the backend (Model)

## Setup

Backend:
1. `cd backend`
2. `python -m venv .venv`
3. `.venv\Scripts\python -m pip install -r requirements.txt`
4. Create `backend/.env` with `ANTHROPIC_API_KEY=your-key`

Frontend:
1. `cd frontend`
2. `npm install`

## Run

`run.py` is the entry point of the app. It starts the backend and the frontend together.

1. Connect laptop and phone to the same network (phone hotspot, set to Private).
2. Run `ipconfig` and put the laptop IP in `frontend/services/api.js`.
3. From the `skinsense` folder, run `python run.py`
4. Scan the QR code with Expo Go.
5. Press Ctrl+C to stop both.