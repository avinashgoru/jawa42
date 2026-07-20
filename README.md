# Jawa Motorcycles — Digital Experience

Production-ready Next.js frontend with an Express lead-capture API for the Jawa / Yezdi motorcycle lineup.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Zustand |
| Backend | Express, Mongoose, Nodemailer |
| Data | Local JS modules (`src/data/*`) + MongoDB for leads |

## Project structure

```
Jawa-42/
├── frontend/          # Next.js app
│   ├── public/        # Static assets (logo)
│   └── src/
│       ├── app/       # Routes & API
│       ├── components/
│       ├── data/      # Models, dealers, cities, competitors
│       ├── lib/       # Shared helpers (motion, validation)
│       ├── store/     # Zustand stores
│       └── utils/     # Pricing, email
└── backend/           # Express lead API
```

## Setup

```bash
npm install
```

### Environment

Copy examples and fill in real values (never commit secrets):

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Required:

- `MONGODB_URI` — MongoDB Atlas / local connection string
- `BACKEND_URL` — Express URL (default `http://localhost:5000`)
- Email credentials for booking confirmations (see backend `.env.example`)

### Develop

```bash
npm run dev
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:5000  

### Build

```bash
npm run build
npm start
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/models` | Full model range |
| `/gallery` | Visual gallery |
| `/compare` | Competitor comparison |
| `/configurator` | Build & enquire |
| `/pricing` | On-road pricing + EMI |
| `/specs` | Technical specifications |
| `/dealers` | Dealer locator |
| `/book` | Test ride booking |

## Notes

- Product imagery currently loads from configured CDN hosts (`next.config.mjs`). Prefer local assets in `public/` for production when available.
- Rotate any MongoDB credentials that were previously committed to source control.
