import { Race, RawRace } from '../types/ergast';
import { driverMapper } from './driver';

export const racesMapper = (races: RawRace[]): Race[] =>
  races.map((race) => {
    const driver = race.Results[0].Driver;
    const team = race.Results[0].Constructor;

    return {
      id: race.id,
      name: race.raceName,
      round: race.round,
      winner: driverMapper(driver),
      team: {
        id: team.constructorId,
        name: team.name,
      },
    };
  });
