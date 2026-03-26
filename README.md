# Interview Platform

A full-stack interview preparation and live session platform with coding problems, code execution, session management, and real-time collaboration features.

## Project Structure

```text
Interview Platform/
  backend/    # Node.js/Express API
  frontend/   # React + Vite client
```

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB (via backend models/lib)
- Realtime/Video: Stream integration (client + server helpers)
- Code Execution: Piston integration

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string
- Required API keys/secrets for auth/realtime/code execution integrations

## Environment Variables

Create `.env` files for both apps.

### Backend (`backend/.env`)

Set the variables required by:

- Database connection
- Auth/webhook provider
- Stream service
- Piston/code execution service
- Server port and allowed origins

Refer to imports/usages in:

- `backend/src/lib/env.js`
- `backend/src/lib/db.js`
- `backend/src/lib/stream.js`
- `backend/src/controllers/*`

### Frontend (`frontend/.env`)

Set client-side variables required by:

- API base URL
- Auth/realtime public keys

Refer to usages in:

- `frontend/src/lib/axios.js`
- `frontend/src/lib/stream.js`
- `frontend/src/hooks/*`

## Installation

Install dependencies for both projects:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run Locally

Start backend:

```bash
cd backend
npm run dev
```

Start frontend (in a separate terminal):

```bash
cd frontend
npm run dev
```

Typical local URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000 (or your configured port)

## Available Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Features

- Browse and solve coding problems
- Create and manage interview sessions
- Session-based problem flow
- Code execution and output panel
- Real-time collaboration/video UI integration
- Dashboard with recent and active sessions

## Deployment Notes

- Frontend includes `vercel.json` for Vercel deployment.
- Deploy backend separately (Render/Railway/Fly/VM/etc.) and point frontend API base URL to deployed backend.
- Ensure CORS and webhook URLs are configured correctly in production.

## Troubleshooting

- If frontend cannot reach backend, verify API base URL and CORS settings.
- If realtime/video fails, verify Stream keys/secrets in both backend and frontend env files.
- If code execution fails, verify Piston endpoint/settings in backend/frontend integration files.
