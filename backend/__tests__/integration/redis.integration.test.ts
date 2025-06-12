import { describe, expect, it } from 'vitest';

import { redis } from '../../src/lib/redis';

describe('Redis integration', () => {
  it('should connect, set, and get a key', async () => {
    const key = 'test:integration';
    await redis.set(key, '✅', 'EX', 10);
    const result = await redis.get(key);

    expect(result).toBe('✅');
  });
});
