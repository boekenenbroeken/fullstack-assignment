import { prisma } from '../lib/prisma';
import { getSeasonChampion, getRaceWinners } from './f1Service';

export const syncSeason = async (year: number) => {
  const existing = await prisma.season.findUnique({ where: { year } });

  if (existing) return;

  const champion = await getSeasonChampion(String(year));
  const races = await getRaceWinners(String(year));

  if (!champion || races.length === 0) {
    throw new Error(`No data available for season ${year}`);
  }

  const championDriver = await prisma.driver.upsert({
    where: { name: champion.name },
    update: {},
    create: {
      name: champion.name,
      nationality: champion.nationality,
    },
  });

  const season = await prisma.season.create({
    data: {
      year,
      championId: championDriver.id,
    },
  });

  for (const race of races) {
    const winner = await prisma.driver.upsert({
      where: { name: race.winner.name },
      update: {},
      create: {
        name: race.winner.name,
        nationality: race.winner.nationality,
      },
    });

    await prisma.race.create({
      data: {
        name: race.raceName,
        round: parseInt(race.round),
        date: new Date(race.date),
        circuit: race.circuitName,
        seasonId: season.id,
        winnerId: winner.id,
      },
    });
  }

  console.log(`✅ Season ${year} synced successfully.`);
};
