import type { RawDriver, MappedDriver } from '../types/ergast.js';

export const driverMapper = (driver: RawDriver): MappedDriver => {
  const { driverId, givenName = '', familyName = '', nationality = '' } = driver;

  return {
    id: driverId,
    name: `${givenName} ${familyName}`.trim(),
    nationality,
  };
};
