import { describe, it, expect } from 'vitest';
import { driverMapper } from '../driver';
import {
  mockRawDriver,
  mockIncompleteRawDriver,
  mockUndefinedDriverId,
} from './__mocks__/driver.mock';

describe('driverMapper', () => {
  it('should map a valid RawDriver to Driver', () => {
    const result = driverMapper(mockRawDriver);
    expect(result).toEqual({
      id: 'hamilton',
      name: 'Lewis Hamilton',
      nationality: 'British',
    });
  });

  it('should handle empty driver names and nationality gracefully', () => {
    const result = driverMapper(mockIncompleteRawDriver);
    expect(result).toEqual({
      id: 'unknown',
      name: '',
      nationality: 'Unknown',
    });
  });

  it('should fallback to unknown id if driverId is undefined', () => {
    const result = driverMapper(mockUndefinedDriverId);
    expect(result).toEqual({
      id: 'unknown',
      name: 'Test Driver',
      nationality: 'Testland',
    });
  });
});
