import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DataBoundary } from '../DataBoundary';

vi.mock('components/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

vi.mock('pages/ErrorScreen/ErrorScreen', () => ({
  ErrorScreen: () => <div data-testid="error-screen" />,
}));

describe('DataBoundary', () => {
  it('renders loader when loading', () => {
    render(
      <DataBoundary loading={true} error={false}>
        <div>Children</div>
      </DataBoundary>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error screen when error', () => {
    render(
      <DataBoundary loading={false} error={true}>
        <div>Children</div>
      </DataBoundary>,
    );
    expect(screen.getByTestId('error-screen')).toBeInTheDocument();
  });

  it('renders error screen when empty', () => {
    render(
      <DataBoundary loading={false} error={false} empty={true}>
        <div>Children</div>
      </DataBoundary>,
    );
    expect(screen.getByTestId('error-screen')).toBeInTheDocument();
  });

  it('renders children when no loading/error/empty', () => {
    render(
      <DataBoundary loading={false} error={false}>
        <div data-testid="children">Children</div>
      </DataBoundary>,
    );
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });
});
