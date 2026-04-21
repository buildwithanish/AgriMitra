# AI Village Brain

AI Village Brain is a full-stack agriculture intelligence SaaS platform designed to feel like a funded startup product. The repository includes:

- A premium React + Tailwind frontend with animated marketing pages and role-based dashboards
- A Node.js + Express + MongoDB backend with JWT authentication and AI simulation APIs
- A Flutter mobile application structure for future expansion

## Product Highlights

- Landing page with animated hero slider and startup-style storytelling
- Feature catalog covering 22 smart agriculture capabilities
- Farmer dashboard with weather, soil, alerts, charts, and AI recommendations
- Admin panel with analytics, revenue, user management, and operational insights
- AI simulation endpoints for crop planning, fertilizer optimization, pest detection, yield prediction, market pricing, insurance risk, crop health scoring, and digital twin simulation
- Integrations for weather, WhatsApp, voice AI, Firebase-style notifications, and satellite monitoring mocks
- Subscription flow with a `₹99/month` plan and mock checkout API
- Dark mode, English/Hindi language toggle, and voice input support

## Monorepo Structure

```text
.
|-- client/        # React + Vite + Tailwind frontend
|-- server/        # Express + MongoDB + Socket.IO API
|-- mobile/        # Flutter app structure
|-- package.json   # Workspace scripts
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create env files from the examples:

- `client/.env` from `client/.env.example`
- `server/.env` from `server/.env.example`

### 3. Start MongoDB

The backend expects MongoDB at `mongodb://127.0.0.1:27017/ai-village-brain` by default.

### 4. Run the platform

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Demo Credentials

The backend seeds demo users automatically when the database is empty.

- Admin: `admin@aivillagebrain.com` / `Admin@123`
- Farmer: `farmer@aivillagebrain.com` / `Farmer@123`

## API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### AI

- `POST /api/ai/crop-recommendation`
- `POST /api/ai/fertilizer-optimization`
- `POST /api/ai/pest-detection`
- `POST /api/ai/yield-prediction`
- `POST /api/ai/market-price-prediction`
- `POST /api/ai/crop-health-score`
- `POST /api/ai/insurance-risk`
- `POST /api/ai/digital-twin`

### Dashboards and Operations

- `GET /api/dashboard/farmer`
- `GET /api/dashboard/admin`
- `GET /api/admin/users`
- `GET /api/admin/analytics`
- `GET /api/sensors`
- `POST /api/sensors`
- `GET /api/notifications`
- `POST /api/subscriptions/checkout`

### Integrations

- `GET /api/integrations/weather`
- `POST /api/integrations/whatsapp`
- `POST /api/integrations/voice`
- `POST /api/integrations/firebase`

## Frontend Design Direction

- Green + white premium palette with glassmorphism panels
- Motion powered by Framer Motion
- Responsive card grids and dashboard layouts
- Recharts visualizations for KPIs, pricing, and forecast trends

## Mobile App

The `mobile` folder includes a Flutter structure with API service and dashboard tabs so the web platform can later be mirrored into a native app.
