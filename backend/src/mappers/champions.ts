import { Champion, ChampionApiResponse } from '../types/ergast.js';
import { driverMapper } from './driver.js';

export const championMapper = (data: ChampionApiResponse): Champion => {
  const standingsTable = data.MRData?.StandingsTable;
  if (!standingsTable) throw new Error('Missing StandingsTable');

  const { season } = standingsTable;
  const standingsList = standingsTable.StandingsLists?.[0];
  if (!standingsList) throw new Error(`Missing StandingsList for season ${season}`);

  const driverStanding = standingsList.DriverStandings?.[0];
  if (!driverStanding) throw new Error(`Missing DriverStanding for season ${season}`);

  const driver = driverStanding.Driver;
  const constructor = driverStanding.Constructors?.[0];

  console.log({ constructor, driver });
  if (!driver || !constructor) {
    throw new Error(`Incomplete data for season ${season}`);
  }

  return {
    season,
    driver: driverMapper(driver),
    team: {
      id: constructor.constructorId,
      name: constructor.name,
    },
  };
};
