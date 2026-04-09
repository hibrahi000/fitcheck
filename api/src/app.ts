import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

/**
 * Express App Setup
 *
 * This file creates and configures the Express application.
 * It is kept separate from server.ts intentionally:
 *  - app.ts  = what the app is (middleware, routes)
 *  - server.ts = how it runs (port, process lifecycle)
 *
 * This separation lets you import `app` in tests without starting a real server.
 */

// Load .env variables into process.env before anything else reads them
dotenv.config();

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────

// cors() allows browsers on other origins (e.g. your React Native app) to call
// this API. Without it, browsers block cross-origin requests by default.
app.use(cors());

// express.json() parses incoming request bodies with Content-Type: application/json
// and makes the parsed object available as req.body
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

// All auth routes are prefixed with /api/v1/auth
// The /v1/ prefix lets you introduce breaking changes as /v2/ without removing v1
app.use('/api/v1/auth', authRoutes);

// Health check — used by Docker, load balancers, and uptime monitors to confirm
// the process is alive and accepting connections
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

export default app;
