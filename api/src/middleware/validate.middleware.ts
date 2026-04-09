import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

/**
 * Reusable Validation Middleware Factory
 *
 * Instead of calling schema.safeParse(req.body) inside every route handler,
 * this factory wraps that logic into middleware you can slot into any route:
 *
 *   router.post('/register', validate(registerSchema), handler)
 *
 * It uses schema.parse() (throws on failure) rather than safeParse() because
 * we want to catch the ZodError here and format it ourselves before it bubbles up.
 *
 * On success it reassigns req.body to the parsed (and coerced) value — this means
 * downstream handlers receive clean, type-safe data with defaults applied.
 *
 * Error response shape:
 *  { error: "Validation failed", details: [{ field: "email", message: "..." }] }
 *
 * NOTE: Currently auth.routes.ts uses safeParse inline. You can refactor to use
 * this middleware instead — it keeps routes cleaner and validation consistent.
 */
export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // parse() throws ZodError if validation fails, returns typed data if it passes
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          // Flatten Zod's error tree into a simple array of { field, message } objects
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'), // nested fields become "address.street"
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Internal validation error' });
    }
  };
};
