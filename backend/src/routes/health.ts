import { Router } from 'express';
import { database } from '../config/database.js';

export const healthRouter = Router();

healthRouter.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get('/health/database', async (_request, response) => {
  try {
    await database.query('SELECT 1');

    response.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('PostgreSQL health check failed', error);

    response.status(503).json({
      status: 'error',
      database: 'unavailable',
      timestamp: new Date().toISOString(),
    });
  }
});
