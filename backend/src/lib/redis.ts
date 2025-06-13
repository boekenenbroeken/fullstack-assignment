import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';
export const redis = new Redis(redisUrl);

redis.on('connect', () => console.log('🔌 Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err));
