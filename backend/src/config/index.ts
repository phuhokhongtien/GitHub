import { config } from 'dotenv';

// Load environment variables
config();

interface Config {
  port: number;
  nodeEnv: string;
  database: {
    url: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
}

export const appConfig: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/kendy_mcp',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
  },
};
