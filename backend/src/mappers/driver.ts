import type { RawDriver, Driver } from '../types/ergast';

export const driverMapper = (driver: RawDriver): Driver => {
  const { driverId, givenName = '', familyName = '', nationality = '' } = driver;

  const id = driverId || 'unknown';
  const name = `${givenName} ${familyName}`.trim();
  const mappedNationality = nationality || 'Unknown';

  return {
    id,
    name,
    nationality: mappedNationality,
  };
};
