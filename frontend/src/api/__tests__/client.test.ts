import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { BASE, request } from '../client';
import {
  mockFetch,
  mockFetchFailure,
  mockFetchSuccess,
  restoreFetch,
} from './__mocks__/client.mock';

describe('request()', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    mockFetch();
  });

  afterEach(() => {
    restoreFetch(originalFetch);
  });

  it('should return data when fetch succeeds', async () => {
    const mockData = { message: 'success' };
    mockFetchSuccess(mockData);

    const result = await request('/test');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(`${BASE}/test`);
  });

  it('should throw error when fetch fails', async () => {
    mockFetchFailure();

    await expect(request('/fail')).rejects.toThrow('Network error');
    expect(global.fetch).toHaveBeenCalledWith(`${BASE}/fail`);
  });
});
