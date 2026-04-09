<!-- markdownlint-disable MD033 MD041 -->
[![FitCheck](https://img.shields.io/badge/FitCheck-AI%20Powered-FF6B35?style=for-the-badge&labelColor=1a1a2e)](https://github.com/Hibrahi000/fitcheck)
[![Status](https://img.shields.io/badge/Status-In%20Development-00d4aa?style=for-the-badge&labelColor=1a1a2e)](https://github.com/Hibrahi000/fitcheck)
[![License](https://img.shields.io/badge/License-MIT-e94560?style=for-the-badge&labelColor=1a1a2e)](LICENSE)
<!-- markdownlint-enable MD033 MD041 -->

# 👕 FitCheck

**Stop guessing your size. Start knowing it.**

> AI-powered clothing fit predictor that learns your body, reads any size chart, and tells you exactly what to buy.

---

[The Problem](#the-problem) · [How It Works](#how-it-works) · [Tech Stack](#tech-stack) · [Architecture](#architecture) · [Project Board](#project-board) · [Getting Started](#getting-started) · [API Docs](#api-docs)

---

## The Problem

**30-40% of online clothing gets returned.** The #1 reason? Wrong fit.

Size charts are inconsistent across brands — a Medium at Zara is not a Medium at H&M. Existing solutions are one-shot predictions with no learning loop. Nobody builds a fit profile that actually gets smarter with every purchase.

**FitCheck fixes that.**

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

## Project Board

> Tracking development across 3 sprints. Each ticket follows `FC-XXX` naming.

### 🏃 Sprint 1 — Foundation

| Ticket | Feature | Status | Notes |
|--------|---------|--------|-------|
| `FC-001` | User Registration | ✅ Done | Zod validation, bcrypt hashing, Prisma, JWT on register |
| `FC-002` | User Login + Auth | ✅ Done | POST /login, GET /me, JWT middleware, validate middleware |
| `FC-003` | Measurement Input | 🔨 Up Next | Save body measurements tied to auth user |
| `FC-004` | Measurement Retrieval | ⬜ Planned | GET current measurements |
| `FC-005` | Size Chart Upload | ⬜ Planned | Image upload → trigger OCR |
| `FC-006` | OCR Processing | ⬜ Planned | Tesseract + OpenAI Vision pipeline |
| `FC-007` | Size Chart Parsing | ⬜ Planned | Raw OCR → structured size data |
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
| `POST` | `/api/v1/measurements` | 🔒 JWT | 🔨 Next | Save body measurements |
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

- **`safeParse` vs `parse` in Zod** — safeParse returns errors gracefully which is what you want in production. parse just throws and crashes your server if validation fails.

- **Express hangs if you don't end the response cycle** — returning a value from your route handler is not the same as calling `res.json()`. Without `res.json()` or `res.send()`, the HTTP connection just sits there waiting forever.

- **Every Prisma call needs `await`** — forgot this once and the query never executed. Express hung because it was waiting for data that never came back from the database.

- **`bcrypt.compare` fails silently on unhashed passwords** — if your registration route isn't actually hashing before saving to the database, login will always fail and you'll spend 20 minutes wondering why.

- **`ts-node-dev --respawn --transpile-only`** — hot reloading for TypeScript dev. Never manually `npm run build && npm run start` during development again.

---

## Author

**Hashmat Ibrahimi** — Backend engineer, 6+ years building production APIs and GraphQL platforms.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hashmat-ibrahimi)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:Hashmat.ibrahimi.21@gmail.com)
