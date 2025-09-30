import { createClient } from 'redis';
import { appConfig } from './index';

const redisClient = createClient({
  socket: {
    host: appConfig.redis.host,
    port: appConfig.redis.port,
  },
  password: appConfig.redis.password,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
};

export default redisClient;
