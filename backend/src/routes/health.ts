import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import redisClient from '../config/redis';

const router = Router();

/**
 * Health check endpoint
 * GET /health
 */
router.get('/health', async (_req: Request, res: Response) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    const dbStatus = 'connected';

    // Check Redis connection
    const redisStatus = redisClient.isOpen ? 'connected' : 'disconnected';

    res.status(200).json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
