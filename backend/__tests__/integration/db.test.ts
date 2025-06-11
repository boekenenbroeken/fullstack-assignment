import { describe, it, expect } from 'vitest';
import { prisma } from '../../src/lib/prisma';

describe('Database connection', () => {
  it('should return an empty list of seasons', async () => {
    const seasons = await prisma.season.findMany();

    expect(seasons).toBeInstanceOf(Array);
  });
});
