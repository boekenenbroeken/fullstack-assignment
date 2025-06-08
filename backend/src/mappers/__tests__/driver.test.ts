import { describe, it, expect } from 'vitest';

import { driverMapper } from '../driver';
import { mockRawDriver, mockIncompleteRawDriver } from './__mocks__/driver.mock';

describe('driverMapper', () => {
  it('should map a valid RawDriver to MappedDriver', () => {
    const result = driverMapper(mockRawDriver);

    expect(result).toEqual({
      id: 'hamilton',
      name: 'Lewis Hamilton',
      nationality: 'British',
    });
  });

  it('should handle empty driver names gracefully', () => {
    const result = driverMapper(mockIncompleteRawDriver);

    expect(result).toEqual({
      id: 'unknown',
      name: '',
      nationality: 'Unknown',
    });
  });
});
