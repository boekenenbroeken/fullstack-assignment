import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { request, BASE } from '../client';
import {
  mockFetch,
  restoreFetch,
  mockFetchSuccess,
  mockFetchFailure,
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
