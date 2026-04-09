import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 *
 * Why a singleton? PrismaClient opens a connection pool to the database.
 * If you `new PrismaClient()` in every file, you'd open hundreds of pools
 * and exhaust your database connections fast. One instance, shared globally,
 * keeps a single managed pool for the lifetime of the server process.
 *
 * In development with hot-reload (ts-node-dev), Node modules are re-evaluated
 * on each reload, which would create a new PrismaClient every time and leak
 * connections. The `globalThis` trick caches it on the global object so
 * hot-reloads reuse the same instance instead of creating a new one.
 */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
