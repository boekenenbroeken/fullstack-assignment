import 'dotenv/config';

import pLimit from 'p-limit';

import { prisma } from './src/lib/prisma';
import { redis } from './src/lib/redis';
import { syncSeason } from './src/services/syncService';

const START_YEAR = 2005;
const END_YEAR = 2025;
const CONCURRENCY = 3;
const RETRY_LIMIT = 3;

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

async function safeSyncSeason(year: number, retries = RETRY_LIMIT): Promise<void> {
  try {
    console.log(`📦 Syncing ${year}...`);
    await syncSeason(year);
    console.log(`✅ Synced season ${year}`);
  } catch (err) {
    if (retries > 0) {
      const backoff = (RETRY_LIMIT - retries + 1) * 1000;
      console.warn(`⚠️ Failed syncing ${year}. Retrying in ${backoff}ms (${retries} retries left)`);
      await delay(backoff);
      await safeSyncSeason(year, retries - 1);
    } else {
      console.error(`❌ Failed syncing ${year} after multiple retries:`, err);
    }
  }
}

async function main() {
  console.log(`🚀 Syncing seasons from ${START_YEAR} to ${END_YEAR}...`);

  const years = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);
  const limit = pLimit(CONCURRENCY);

  await Promise.all(years.map((year) => limit(() => safeSyncSeason(year))));

  console.log('🎯 All seasons synced!');
  await prisma.$disconnect();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await redis.quit();
    process.exit(0);
  });
