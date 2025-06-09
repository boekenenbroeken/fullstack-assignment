import { syncSeason } from './src/services/syncService';
import { prisma } from './src/lib/prisma';

const startYear = 2005;

const endYear = new Date().getFullYear();

const main = async () => {
  console.log(`🚀 Syncing seasons from ${startYear} to ${endYear}...`);

  for (let year = startYear; year <= endYear; year++) {
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
