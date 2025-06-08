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
  nationality: 'Unknown',
};
