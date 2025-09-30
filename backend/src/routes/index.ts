import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Register route modules
router.use('/', healthRouter);

// API info endpoint
router.get('/', (_req, res) => {
  res.json({
    name: 'Kendy MCP Assistant API',
    version: '1.0.0',
    status: 'running',
  });
});

export default router;
