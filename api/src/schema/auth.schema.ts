import { z } from 'zod';

/**
 * Auth Schemas — Zod validation shapes for auth endpoints.
 *
 * Zod lets you define the shape AND type of data in one place.
 * `z.infer<typeof schema>` extracts a TypeScript type from the schema
 * so you never have to write the type manually — it stays in sync automatically.
 *
 * These schemas are the single source of truth for what register/login bodies
 * must look like. Routes import them and call `.safeParse(req.body)`.
 * `.safeParse` never throws — it returns { success, data } or { success, error }.
 */

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// TypeScript types inferred directly from the schemas above.
// Use these as parameter types in controllers/services.
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
