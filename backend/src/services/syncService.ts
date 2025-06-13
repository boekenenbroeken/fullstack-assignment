import { prisma } from '../lib/prisma';
import { getRaces, getSeasonChampion } from './f1Service';

export const syncSeason = async (year: number) => {
  const champion = await getSeasonChampion(year);
  const races = await getRaces(year);

  if (!champion || !races?.length) {
    console.warn(`⚠️ Incomplete data for ${year}, skipping.`);

    return;
  }

  await prisma.driver.upsert({
    where: { id: champion.driver.id },
    update: {},
    create: {
      id: champion.driver.id,
      name: champion.driver.name,
      nationality: champion.driver.nationality,
    },
  });

  const season = await prisma.season.upsert({
    where: { year },
    update: {},
    create: {
      year,
      champion: { connect: { id: champion.driver.id } },
    },
    select: { id: true },
  });

  await prisma.driver.createMany({
    data: races.map((race) => race.winner),
    skipDuplicates: true,
  });

  const teams = [
    { id: champion.team.id, name: champion.team.name ?? 'Unknown Team' },
    ...races.map((race) => ({
      id: race.team.id,
      name: race.team.name ?? 'Unknown Team',
    })),
  ];

  const uniqueTeams = Array.from(new Map(teams.map((team) => [team.id, team])).values());

  await prisma.team.createMany({
    data: uniqueTeams,
    skipDuplicates: true,
  });

  await prisma.driverSeason.createMany({
    data: races.map((race) => ({
      driverId: race.winner.id,
      teamId: race.team.id,
      seasonId: season.id,
    })),
    skipDuplicates: true,
  });

  await prisma.race.createMany({
    data: races.map((race) => ({
      name: race.name,
      round: race.round,
      seasonId: season.id,
      winnerId: race.winner.id,
    })),
    skipDuplicates: true,
  });

  console.log(`✅ Synced season ${year}`);
};
