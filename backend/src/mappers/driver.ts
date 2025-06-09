import type { RawDriver, Driver } from '../types/ergast.js';

export const driverMapper = (driver: RawDriver): Driver => {
  const { driverId, givenName = '', familyName = '', nationality = '' } = driver;

  return {
    id: driverId,
    name: `${givenName} ${familyName}`.trim(),
    nationality,
  };
};
