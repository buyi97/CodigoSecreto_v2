import { config } from 'dotenv';

config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MAX_ROOMS: parseInt(process.env.MAX_ROOMS || '100', 10),
};

// Validate required env vars
if (!env.FRONTEND_URL) {
  throw new Error('FRONTEND_URL is required');
}

if (!env.NODE_ENV) {
  throw new Error('NODE_ENV is required');
}