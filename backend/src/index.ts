import app from './app';
import config from './config/env';
import prisma from './config/database';
import { connectRedis } from './config/redis';

const startServer = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    await connectRedis();
    console.log('✅ Redis connected successfully');

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
      console.log(`📍 Health check available at http://localhost:${config.port}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

const shutdown = async (): Promise<void> => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
