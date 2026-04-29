<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

<img src="https://socialify.git.ci/Hibrahi000/fitcheck/image?description=1&font=Raleway&language=1&name=1&owner=1&stargazers=1&theme=Dark" alt="FitCheck" width="100%" />

<br /><br />

<strong>Stop guessing your size. Start knowing it.</strong><br />
<sub>AI-powered fit predictor &nbsp;·&nbsp; learns your body &nbsp;·&nbsp; reads any size chart &nbsp;·&nbsp; tells you exactly what to buy</sub>

<br /><br />

[![FitCheck](https://img.shields.io/badge/FitCheck-AI%20Powered-FF6B35?style=for-the-badge&labelColor=1a1a2e)](https://github.com/Hibrahi000/fitcheck)
[![Status](https://img.shields.io/badge/Status-In%20Development-00d4aa?style=for-the-badge&labelColor=1a1a2e)](https://github.com/Hibrahi000/fitcheck)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=1a1a2e)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-e94560?style=for-the-badge&labelColor=1a1a2e)](LICENSE)

<br />

[The Problem](#the-problem) &nbsp;·&nbsp; [How It Works](#how-it-works) &nbsp;·&nbsp; [Tech Stack](#tech-stack) &nbsp;·&nbsp; [Architecture](#architecture) &nbsp;·&nbsp; [Project Board](#project-board) &nbsp;·&nbsp; [Getting Started](#getting-started) &nbsp;·&nbsp; [API Docs](#api-docs)

</div>

---

## The Problem

**30-40% of online clothing gets returned.** The #1 reason? Wrong fit.

Size charts are inconsistent across brands — a Medium at Zara is not a Medium at H&M. Existing solutions are one-shot predictions with no learning loop. Nobody builds a fit profile that actually gets smarter with every purchase.

**FitCheck fixes that.**

---

<table>
<tr>
<td align="center" width="33%">
<h3>📏 Smart Fit Profile</h3>
Enter your measurements once. Your profile grows more accurate with every purchase you rate.
</td>
<td align="center" width="33%">
<h3>🤖 OCR Size Charts</h3>
Screenshot any brand's chart. Tesseract + OpenAI Vision extract the data automatically — no manual input.
</td>
<td align="center" width="33%">
<h3>🔄 Brand Calibration</h3>
The algorithm recalibrates per brand, per garment type. A Medium at Zara ≠ a Medium at H&M.
</td>
</tr>
</table>

---

## How It Works

```text
📏 Enter your measurements once
      ↓
📸 Screenshot any size chart
      ↓
🤖 OCR extracts the data automatically
      ↓
📊 Algorithm compares your body to the chart
      ↓
✅ "You're a Medium — slightly loose in chest, fitted at waist"
      ↓
🔄 Rate the fit after purchase → predictions get smarter
```

---

## Tech Stack

### 📱 Mobile

![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

### ⚙️ API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

### 🧠 OCR / AI

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Tesseract](https://img.shields.io/badge/Tesseract_OCR-4285F4?style=flat-square&logo=google&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_Vision-412991?style=flat-square&logo=openai&logoColor=white)

### 🔧 DevOps & Testing

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white)

---

## Architecture

```text
┌─────────────────────────────────────────────────────-┐
│                    MOBILE APP                        │
│              React Native + Expo + TS                │
│                                                      │
│   [ Auth ]  [ Measurements ]  [ Scan ]  [ Results ]  │
│      │            │              │           │       │
└──────┼────────────┼──────────────┼───────────┼───────┘
       │            │              │           │
       ▼            ▼              ▼           ▼
┌─────────────────────────────────────────────────────-┐
│                   API GATEWAY                        │
│           Node.js + Express + TypeScript             │
│                                                      │
│   [ Auth ]  [ Measurements ]  [ Charts ]  [ Recs ]   │
│      │            │              │           │       │
│      ▼            ▼              ▼           ▼       │
│  ┌───────────────────────────────────────────────┐   │
│  │           Prisma ORM + PostgreSQL             │   │
│  │                                               │   │
│  │  Users · Measurements · SizeCharts            │   │
│  │  Recommendations · Feedback · Calibrations    │   │
│  └───────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────-┘
                       │
                       │ image upload
                       ▼
┌─────────────────────────────────────────────────────┐
│                   OCR SERVICE                       │
│               Python + FastAPI                      │
│                                                     │
│   [ Tesseract ] ──→ [ OpenAI Vision (fallback) ]    │
│         │                    │                      │
│         ▼                    ▼                      │
│   ┌─────────────────────────────────────────┐       │
│   │  Structured Size Data (JSON)            │       │
│   │  "S": { chest: 36, waist: 30 }          │       │
│   │  "M": { chest: 38, waist: 32 }          │       │
│   │  "L": { chest: 40, waist: 34 }          │       │
│   └─────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────┘
```

---

## Project Structure

```text
api/src/
├── app.ts                     # Express app factory — middleware stack, route mounts
├── server.ts                  # Process entry point — binds to PORT
├── config/
│   └── prisma.ts              # PrismaClient singleton (globalThis hot-reload safe)
├── middleware/
│   ├── auth.middleware.ts     # Bearer token verification, req.user augmentation
│   └── validate.middleware.ts # Reusable Zod validation middleware factory
├── routes/
│   ├── auth.routes.ts         # POST /register, POST /login, GET /me
│   └── measurements.ts        # POST /measurements (built, pending mount — FC-004)
├── schema/
│   ├── auth.schema.ts         # registerSchema, loginSchema + inferred types
│   └── measurements.schema.ts # createMeasurementSchema with at-least-one refine
├── controllers/               # (planned) thin handlers delegating to services
├── services/                  # (planned) business logic layer
└── types/                     # (planned) shared TypeScript interfaces
```

---

## Security Decisions

Deliberate choices made in the auth layer — not accidental:

| Decision | Where | Why |
|----------|-------|-----|
| Generic login error message | `POST /login` | Prevents user enumeration — attacker can't tell if an email is registered |
| Prisma `select` over fetch-then-strip | `GET /me` | `password_hash` is never fetched from the DB at all, not just hidden from the response |
| bcrypt cost factor 10 | `SALT_ROUNDS = 10` | 2^10 rounds — industry default balancing brute-force resistance and server latency |
| Minimal JWT payload | `{ userId, email }` only | JWT payloads are base64-encoded, not encrypted — sensitive fields never go in |
| `TokenExpiredError` vs `JsonWebTokenError` | `auth.middleware.ts` | Clients know whether to re-authenticate (expired) or treat the token as tampered (invalid) |

---

## Project Board

> Tracking development across 3 sprints. Each ticket follows `FC-XXX` naming.

### 🏃 Sprint 1 — Foundation

| Ticket | Feature | Status | Notes |
|--------|---------|--------|-------|
| `FC-001` | User Registration | ✅ Done | Zod validation, bcrypt hashing, Prisma, JWT on register |
| `FC-002` | User Login + Auth | ✅ Done | POST /login, GET /me, JWT middleware, validate middleware |
| `FC-003` | Auth Middleware & Schema Layer | ✅ Done | authenticate, validate factory, measurement schema |
| `FC-004` | Measurement Input | 🔨 Up Next | Handler built — needs mounting in app.ts + integration test |
| `FC-005` | Measurement Retrieval | ⬜ Planned | GET current measurements for authed user |
| `FC-006` | Size Chart Upload | ⬜ Planned | Image upload → trigger OCR |
| `FC-007` | OCR Processing | ⬜ Planned | Tesseract + OpenAI Vision pipeline |
| `FC-008` | Size Recommendation | ⬜ Planned | Compare measurements to chart → result |

### 🏃 Sprint 2 — Feedback Loop

| Ticket | Feature | Status | Notes |
|--------|---------|--------|-------|
| `FC-009` | Purchase Feedback | ⬜ Planned | Rate actual fit after buying |
| `FC-010` | Brand Calibration | ⬜ Planned | ML adjusts per user per brand |
| `FC-011` | Fit History | ⬜ Planned | Past recommendations + accuracy |
| `FC-012` | Measurement Update | ⬜ Planned | Update measurements, track over time |

### 🏃 Sprint 3 — Mobile App

| Ticket | Feature | Status | Notes |
|--------|---------|--------|-------|
| `FC-013` | Auth Screens | ⬜ Planned | Login/Register in React Native |
| `FC-014` | Measurement Input UI | ⬜ Planned | Body measurement form |
| `FC-015` | Camera Integration | ⬜ Planned | Capture or select size chart |
| `FC-016` | Results Screen | ⬜ Planned | Recommendation with fit notes |
| `FC-017` | Feedback UI | ⬜ Planned | Post-purchase rating flow |

---

## Data Model

```text
Users
  ├── 1:M ── UserMeasurements
  │                 │
  ├── 1:M ── SizeCharts
  │                 │
  │                 └── 1:M ── SizeRecommendations ◄── FK ── UserMeasurements
  │                                   │
  │                                   └── 1:M ── PurchaseFeedback
  │
  └── 1:M ── BrandCalibrations (unique per user + brand + garment type)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use the Docker container)

### Setup

```bash
# clone
git clone https://github.com/Hibrahi000/fitcheck.git
cd fitcheck

# start the database
docker-compose up -d

# install dependencies
cd api
npm install

# environment
cp .env.example .env
# edit .env with your DATABASE_URL and JWT_SECRET

# run migrations
npx prisma migrate dev

# start dev server (hot reload)
npm run dev
```

Server runs at `http://localhost:3000`

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string — `postgresql://user:pass@host:5432/fitcheck` |
| `JWT_SECRET` | ✅ | Secret key for signing and verifying JWTs — use a long random string in production |
| `PORT` | ❌ | HTTP port the server listens on (default: `3000`) |

### Quick Test

```bash
# register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "securepass123", "name": "Test User"}'

# login → copy the token from the response
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "securepass123"}'

# get current user (paste your token)
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer <token>"
```

---

## API Docs

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Status | Description |
|--------|----------|------|--------|-------------|
| `POST` | `/api/v1/auth/register` | ❌ | ✅ Live | Create account, returns JWT |
| `POST` | `/api/v1/auth/login` | ❌ | ✅ Live | Login → JWT token |
| `GET`  | `/api/v1/auth/me` | 🔒 JWT | ✅ Live | Get current user (no password) |

### Measurements — `/api/v1/measurements`

| Method | Endpoint | Auth | Status | Description |
|--------|----------|------|--------|-------------|
| `POST` | `/api/v1/measurements` | 🔒 JWT | 🔨 In Progress | Handler built, mounting in FC-004 |
| `GET`  | `/api/v1/measurements` | 🔒 JWT | ⬜ Planned | Get current measurements |

### Size Charts & Recommendations

| Method | Endpoint | Auth | Status | Description |
|--------|----------|------|--------|-------------|
| `POST` | `/api/v1/size-charts` | 🔒 JWT | ⬜ Planned | Upload size chart image |
| `GET`  | `/api/v1/recommendations/:id` | 🔒 JWT | ⬜ Planned | Get size recommendation |
| `POST` | `/api/v1/feedback` | 🔒 JWT | ⬜ Planned | Submit fit feedback |

---

## What I Learned Building This

Some of the things that clicked while building FitCheck from scratch:

- **`safeParse` vs `parse` in Zod** — `safeParse` returns errors gracefully, which is what you want in production. `parse` throws and will crash your server if validation fails without a try/catch.

- **Express hangs if you don't end the response cycle** — returning a value from a route handler is not the same as calling `res.json()`. Without it, the HTTP connection sits open waiting forever.

- **Every Prisma call needs `await`** — forgot this once and the query never executed. Express hung because it was waiting for data that never came back from the database.

- **`bcrypt.compare` fails silently on unhashed passwords** — if your registration route isn't actually hashing before saving, login will always fail and you'll spend 20 minutes wondering why.

- **`ts-node-dev --respawn --transpile-only`** — hot reloading for TypeScript dev. Never manually `npm run build && npm run start` during development again.

- **Generic error messages prevent user enumeration** — `/login` returns `"Invalid email or password"` whether the email doesn't exist or the password is wrong. Returning different messages would let an attacker discover which emails are registered. One condition, one message.

- **`declare global namespace Express` for typed middleware** — to make `req.user` available downstream without TypeScript errors, you augment Express's `Request` interface via module declaration. Without it you're casting `req as any` everywhere, which defeats the point of TypeScript.

- **`globalThis` prevents Prisma connection pool exhaustion in dev** — `ts-node-dev` re-evaluates modules on every hot-reload. Without caching `PrismaClient` on `globalThis`, each reload opens a new connection pool and silently leaks database connections until Postgres refuses new ones.

---

## Author

<div align="center">

**Hashmat Ibrahimi** — Backend engineer, 6+ years building production APIs and GraphQL platforms.

<br />

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hashmat-ibrahimi)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:Hashmat.ibrahimi.21@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hibrahi000/fitcheck)

<br />

<a href="https://github.com/Hibrahi000/fitcheck">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fgithub.com%2FHibrahi000%2Ffitcheck&color=FF6B35&bgcolor=1a1a2e&margin=10" alt="Scan to open repo on mobile" />
</a>

<sub>Scan to open on mobile</sub>

</div>
