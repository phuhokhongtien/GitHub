import { Router } from 'express';
import healthRouter from './health';

const router = Router();

router.use('/health', healthRouter);

router.get('/', (_req, res) => {
  res.json({
    message: 'Kendy MCP Assistant API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
    },
  });
});

export default router;
