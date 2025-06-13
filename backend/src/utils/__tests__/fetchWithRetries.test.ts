import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchWithRetries } from '../fetchWithRetries';

vi.mock('axios');
const mockedAxiosGet = vi.mocked(axios.get);

function mockAxiosError(status: number): AxiosError {
  return {
    name: 'AxiosError',
    message: `Mocked error with status ${status}`,
    config: {
      headers: {},
      method: 'GET',
      url: 'https://example.com',
    } as InternalAxiosRequestConfig,
    isAxiosError: true,
    toJSON: () => ({}),
    response: {
      status,
      statusText: 'Error',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
      data: null,
    } as AxiosResponse,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchWithRetries', () => {
  it('should return data on first success', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: 'success-data' });

    const result = await fetchWithRetries<string>('https://example.com');
    expect(result).toBe('success-data');
    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
  });

  it('should retry on 429 and succeed', async () => {
    const error429 = mockAxiosError(429);

    mockedAxiosGet
      .mockRejectedValueOnce(error429)
      .mockResolvedValueOnce({ data: 'retried-success' });

    const result = await fetchWithRetries<string>('https://example.com', 2, 10);
    expect(result).toBe('retried-success');
    expect(mockedAxiosGet).toHaveBeenCalledTimes(2);
  });

  it('should throw after exhausting retries', async () => {
    const error429 = mockAxiosError(429);

    mockedAxiosGet
      .mockRejectedValueOnce(error429)
      .mockRejectedValueOnce(error429)
      .mockRejectedValueOnce(error429);

    await expect(fetchWithRetries('https://example.com', 2, 10)).rejects.toEqual(error429);
    expect(mockedAxiosGet).toHaveBeenCalledTimes(3);
  });

  it('should throw immediately on non-429 errors', async () => {
    const error500 = mockAxiosError(500);

    mockedAxiosGet.mockRejectedValueOnce(error500);

    await expect(fetchWithRetries('https://example.com')).rejects.toEqual(error500);
    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
  });
});
