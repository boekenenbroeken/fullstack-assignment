import { describe, it, expect, vi, type Mocked } from 'vitest';
import { fetchChampions } from '../champions';
import type { Champion } from '../types/models';
import * as client from '../client';

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
