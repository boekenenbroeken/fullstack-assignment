import { prisma } from './src/lib/prisma';
import { syncSeason } from './src/services/syncService';

const START_YEAR = 2005;
const END_YEAR = new Date().getFullYear();
const DELAY_MS = 200;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  console.log(`🚀 Syncing seasons from ${START_YEAR} to ${END_YEAR}...`);

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    console.log(`📦 Syncing ${year}...`);
    await syncSeason(year);
    await sleep(DELAY_MS);
  }

  console.log('✅ All seasons synced!');
};

main()
  .catch((e) => {
    console.error('❌ Failed to seed seasons:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
