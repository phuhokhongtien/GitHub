import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import redisClient from '../config/redis';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const dbHealthy = await checkDatabase();
    const redisHealthy = await checkRedis();

    const status = dbHealthy && redisHealthy ? 'healthy' : 'unhealthy';
    const statusCode = dbHealthy && redisHealthy ? 200 : 503;

    res.status(statusCode).json({
      status,
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'connected' : 'disconnected',
        redis: redisHealthy ? 'connected' : 'disconnected',
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

async function checkDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

async function checkRedis(): Promise<boolean> {
  try {
    if (!redisClient.isOpen) {
      return false;
    }
    await redisClient.ping();
    return true;
  } catch (error) {
    console.error('Redis health check failed:', error);
    return false;
  }
}

export default router;
