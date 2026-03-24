import { Router } from 'express';
import * as z from 'zod';
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const router = Router();

const registrationSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

router.post('/register', async (req, res) => {
  const result = registrationSchema.safeParse(req.body);

  if (result.error) return res.status(400).json({ errors: result.error.message });

  const hash = bcrypt.hashSync(result.data.password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        password_hash: hash,
        name: result.data.name,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    res.json({ message: 'user created', token });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'email already exists' });
    }
    res.status(500).json({ error: 'something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  const login = loginSchema.safeParse(req.body);

  if (login.error) return res.status(400).json({ errors: login.error.message });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: login.data.email,
      },
    });

    const token = jwt.sign(
      { userId: user?.id, email: user?.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    return user && (await bcrypt.compare(login.data.password, user.password_hash))
      ? res.json({ message: 'user logged in', token })
      : res.status(401).json({ errors: 'invalid email and or password' });
  } catch (error: any) {
    return error.code === 'P2025'
      ? res.status(401).json({ errors: 'invalid email and or password' })
      : res.status(500).json({ error: 'something went wrong' });
  }
});

export default router;
