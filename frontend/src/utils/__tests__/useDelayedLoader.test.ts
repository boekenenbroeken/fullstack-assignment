import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDelayedLoader } from '../useDelayedLoader';

describe('useDelayedLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should show loader initially', () => {
    const { result } = renderHook(() => useDelayedLoader(true));
    expect(result.current).toBe(true);
  });

  it('should hide loader after delay when isLoading becomes false', () => {
    const { result, rerender } = renderHook(({ isLoading }) => useDelayedLoader(isLoading), {
      initialProps: { isLoading: true },
    });

    expect(result.current).toBe(true);

    rerender({ isLoading: false });

    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(false);
  });

  it('should reset timer if loading becomes true again', () => {
    const { result, rerender } = renderHook(({ isLoading }) => useDelayedLoader(isLoading), {
      initialProps: { isLoading: true },
    });

    expect(result.current).toBe(true);

    rerender({ isLoading: false });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);

    rerender({ isLoading: true });

    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(true);
  });
});
