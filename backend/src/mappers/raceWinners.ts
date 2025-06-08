import { driverMapper } from './driver';
import { MappedRace, Race } from '../types/ergast';

export const raceWinnersMapper = (races: Race[]): MappedRace[] =>
  races.map((race) => {
    const rawDriver = race.Results?.[0]?.Driver;

    return {
      raceName: race.raceName,
      date: race.date,
      round: race.round,
      circuitName: race.Circuit?.circuitName ?? 'Unknown Circuit',
      winner: rawDriver
        ? driverMapper(rawDriver)
        : {
            id: 'unknown',
            name: '',
            nationality: 'Unknown',
          },
    };
  });
