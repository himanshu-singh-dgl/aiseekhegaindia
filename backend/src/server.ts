import { buildApp } from './app.js';
import { database } from './config/database.js';
import { env } from './config/env.js';

const app = buildApp();
const server = app.listen(env.port, env.host, () => {
  console.log(`Backend listening on http://${env.host}:${env.port}`);
});

async function shutdown(signal: NodeJS.Signals) {
  console.log(`${signal} received, shutting down`);

  server.close(async (error) => {
    if (error) {
      console.error('HTTP server shutdown failed', error);
      process.exitCode = 1;
    }

    await database.end();
    process.exit();
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

server.on('error', async (error) => {
  console.error('Backend failed to start', error);
  await database.end();
  process.exit(1);
});
