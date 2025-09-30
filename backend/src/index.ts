import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { appConfig } from './config';
import { connectRedis } from './config/redis';
import prisma from './config/database';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to Redis
    await connectRedis();
    console.log('✅ Redis connected successfully');

    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    const PORT = appConfig.port;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${appConfig.nodeEnv} mode`);
      console.log(`📍 API available at http://localhost:${PORT}/api`);
      console.log(`💚 Health check at http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  await connectRedis().then(client => client.quit());
  process.exit(0);
});

startServer();

export default app;
