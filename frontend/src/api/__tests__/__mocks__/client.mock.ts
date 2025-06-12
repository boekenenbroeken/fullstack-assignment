import { Mock, vi } from 'vitest';

type MockResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

export const mockFetchSuccess = <T>(data: T) => {
  (global.fetch as unknown as Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as MockResponse);
};

export const mockFetchFailure = () => {
  (global.fetch as unknown as Mock).mockResolvedValueOnce({
    ok: false,
    json: async () => ({}),
  } as MockResponse);
};

export const mockFetch = () => {
  global.fetch = vi.fn();
};

export const restoreFetch = (originalFetch: typeof global.fetch) => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
};
