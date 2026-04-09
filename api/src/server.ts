import app from './app';

/**
 * Server Entry Point
 *
 * This file's only job is to start the HTTP server.
 * Keeping it separate from app.ts means tests can import `app` directly
 * without binding to a port — avoiding "port already in use" errors in CI.
 */

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`FitCheck API running on port ${PORT}`);
});
