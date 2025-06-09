import { syncSeason } from './src/services/syncService';
import { prisma } from './src/lib/prisma';

const START_YEAR = 2005;
const END_YEAR = new Date().getFullYear();

const main = async () => {
  console.log(`🚀 Syncing seasons from ${START_YEAR} to ${END_YEAR}...`);

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    console.log(`📦 Syncing ${year}...`);
    await syncSeason(year);
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
