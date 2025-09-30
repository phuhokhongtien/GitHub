import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Health check routes
router.use(healthRouter);

// Add more API routes here
// Example: router.use('/users', userRouter);

export default router;
