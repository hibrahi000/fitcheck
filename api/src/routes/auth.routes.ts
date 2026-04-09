import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { registerSchema, loginSchema } from '../schema/auth.schema';
import { authenticate } from '../middleware/auth.middleware';

/**
 * Auth Routes — POST /register, POST /login, GET /me
 *
 * Mounted in app.ts at /api/v1/auth, so the full paths are:
 *   POST /api/v1/auth/register
 *   POST /api/v1/auth/login
 *   GET  /api/v1/auth/me
 *
 * Pattern used here: route handler does validation + DB work inline.
 * As the app grows you'd extract the DB logic into a service layer
 * (e.g. AuthService) and keep routes as thin wiring only.
 */

// bcrypt cost factor — 10 means 2^10 hashing rounds.
// Higher = slower to brute-force, but also slower to hash on your server.
// 10 is the industry-standard default for web apps.
const SALT_ROUNDS = 10;

const router = Router();

// ─── POST /register ──────────────────────────────────────────────────────────

router.post('/register', async (req, res) => {
  // safeParse validates without throwing — returns { success, data } or { success, error }
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    // flatten().fieldErrors gives a clean { email: ["..."], password: ["..."] } shape
    // instead of Zod's raw nested error object which is noisy and hard to consume
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }

  // hashSync is blocking but acceptable here — registration is infrequent.
  // For high-throughput endpoints, prefer the async bcrypt.hash() instead.
  const hash = bcrypt.hashSync(result.data.password, SALT_ROUNDS);

  try {
    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        password_hash: hash,
        name: result.data.name,
        gender: result.data.gender,
      },
    });

    // Sign a JWT with a subset of user data as the payload.
    // Never put sensitive fields (password_hash, etc.) inside a JWT —
    // the payload is base64-encoded, not encrypted, so it's readable by anyone.
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    return res.status(201).json({ token });
  } catch (error: any) {
    // Prisma error P2002 = unique constraint violation (duplicate email)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── POST /login ─────────────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    // Check both "user exists" and "password matches" in one condition.
    // Intentionally use the same error message for both cases — telling an
    // attacker which one failed would let them enumerate valid email addresses.
    if (!user || !(await bcrypt.compare(result.data.password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    return res.json({ token });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /me ─────────────────────────────────────────────────────────────────

// `authenticate` middleware runs first — it verifies the JWT and attaches
// req.user before the handler below ever executes.
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      // `select` is safer than querying everything and deleting fields after —
      // it guarantees password_hash is never fetched from the DB at all.
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ user });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
