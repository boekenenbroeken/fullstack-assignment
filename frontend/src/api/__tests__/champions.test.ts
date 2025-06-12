import { describe, expect, it, type Mocked, vi } from 'vitest';

import { fetchChampions } from '../champions';
import * as client from '../client';
import type { Champion } from '../types/models';

vi.mock('../client', () => ({
  request: vi.fn(),
}));

describe('fetchChampions()', () => {
  it('should call request with correct url without years', async () => {
    const mockData: Champion[] = [];

    const mockedClient = client as Mocked<typeof client>;
    mockedClient.request.mockResolvedValueOnce(mockData);

    const result = await fetchChampions();
    expect(mockedClient.request).toHaveBeenCalledWith('/champions');
    expect(result).toEqual(mockData);
  });

  it('should call request with correct url with years', async () => {
    const mockData: Champion[] = [];

    const mockedClient = client as Mocked<typeof client>;
    mockedClient.request.mockResolvedValueOnce(mockData);

    const result = await fetchChampions('2023');
    expect(mockedClient.request).toHaveBeenCalledWith('/champions?years=2023');
    expect(result).toEqual(mockData);
  });
});
