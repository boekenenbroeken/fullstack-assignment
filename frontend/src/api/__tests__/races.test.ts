import { describe, expect, it, type Mocked, vi } from 'vitest';

import * as client from '../client';
import { fetchRaces } from '../races';
import type { Race } from '../types/models';

vi.mock('../client', () => ({
  request: vi.fn(),
}));

describe('fetchRaces()', () => {
  it('should call request with correct url', async () => {
    const mockData: Race[] = [];

    const mockedClient = client as Mocked<typeof client>;
    mockedClient.request.mockResolvedValueOnce(mockData);

    const result = await fetchRaces('2022');
    expect(mockedClient.request).toHaveBeenCalledWith('/races/2022');
    expect(result).toEqual(mockData);
  });
});
