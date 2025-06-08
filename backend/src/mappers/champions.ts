import { Champion, ChampionApiResponse } from '../types/ergast.js';

export const championsMapper = (data: ChampionApiResponse[]): Champion[] =>
  data.map((item) => {
    const standingsTable = item.MRData?.StandingsTable;
    if (!standingsTable) throw new Error('Missing StandingsTable');

    const { season } = standingsTable;
    const standingsList = standingsTable.StandingsLists?.[0];
    if (!standingsList) throw new Error(`Missing StandingsList for season ${season}`);

    const driverStanding = standingsList.DriverStandings?.[0];
    if (!driverStanding) throw new Error(`Missing DriverStanding for season ${season}`);

    const driver = driverStanding.Driver;
    const constructor = driverStanding.Constructors?.[0];

    if (!driver || !constructor) {
      throw new Error(`Incomplete data for season ${season}`);
    }

    return {
      season,
      driver: {
        id: driver.driverId,
        name: `${driver.givenName} ${driver.familyName}`,
        nationality: driver.nationality,
      },
      constructorName: constructor.name,
    };
  });
