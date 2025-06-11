import { RawDriver } from '../../../types/ergast';

export const mockRawDriver: RawDriver = {
  driverId: 'hamilton',
  givenName: 'Lewis',
  familyName: 'Hamilton',
  nationality: 'British',
};

export const mockIncompleteRawDriver: RawDriver = {
  driverId: 'unknown',
  givenName: '',
  familyName: '',
  nationality: '',
};

export const mockUndefinedDriverId: RawDriver = {
  driverId: undefined as unknown as string,
  givenName: 'Test',
  familyName: 'Driver',
  nationality: 'Testland',
};
