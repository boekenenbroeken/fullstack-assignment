import { vi } from 'vitest';

export const mockFetchSuccess = (data: any) => {
  (global.fetch as any).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
};

export const mockFetchFailure = () => {
  (global.fetch as any).mockResolvedValueOnce({
    ok: false,
  });
};

export const mockFetch = () => {
  global.fetch = vi.fn();
};

export const restoreFetch = (originalFetch: typeof global.fetch) => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
};
