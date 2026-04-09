import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * JWT Authentication Middleware
 *
 * Middleware in Express is a function with the signature (req, res, next).
 * - Calling next() passes control forward to the next handler in the chain.
 * - Returning res.json() short-circuits the chain — nothing after it runs.
 *
 * This middleware:
 *  1. Reads the Authorization header — expected format: "Bearer <token>"
 *  2. Verifies the token's signature using JWT_SECRET
 *  3. Decodes the payload and attaches it to req.user so any route
 *     mounted after this middleware knows who the requester is
 *
 * Usage on a route:  router.get('/me', authenticate, handler)
 */

// The shape of data we embed inside the JWT when we sign it (see auth.routes.ts).
// Exported so routes can type req.user without re-declaring the interface.
export interface JwtPayload {
  userId: string;
  email: string;
}

// Augment Express's built-in Request type so TypeScript knows req.user exists.
// Without this, TypeScript would error: "Property 'user' does not exist on Request".
// The `declare global` block merges our addition into Express's namespace globally.
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  // "Bearer <token>" — split on the space, take the second part
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // jwt.verify throws if the token is expired, tampered with, or signed
    // with a different secret. The cast tells TypeScript the payload shape.
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    // Distinguish expired vs. invalid — clients can use this to decide
    // whether to prompt re-login (expired) or treat the token as corrupted.
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
