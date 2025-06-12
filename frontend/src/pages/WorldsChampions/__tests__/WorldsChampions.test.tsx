import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WorldsChampions } from '../WorldsChampions';

type Champion = {
  season: string;
  driver: { id: string; name: string; nationality: string };
  team: { id: string; name: string };
};

const hydrateChampions = vi.fn();
const useChampionsStore = vi.fn();

vi.mock('store/champions', () => ({
  useChampionsStore: () => useChampionsStore(),
}));

vi.mock('components/Card/Card', () => ({
  Card: ({ driver, driverNationality, team, entries }: any) => (
    <div data-testid="card">
      {driver} ({driverNationality}) - {team} - {entries[0].value}
    </div>
  ),
}));

vi.mock('components/DataBoundary/DataBoundary', () => ({
  DataBoundary: ({ loading, error, empty, children }: any) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;
    if (empty) return <div>No data</div>;
    return children;
  },
}));

vi.mock('utils/useDelayedLoader', () => ({
  useDelayedLoader: (loading: boolean) => loading,
}));

const setChampionsStore = ({
  data = [],
  loading = false,
  error = null,
}: {
  data?: Champion[];
  loading?: boolean;
  error?: any;
}) => {
  useChampionsStore.mockReturnValue({
    data,
    loading,
    error,
    hydrate: hydrateChampions,
  });
};

const renderComponent = () => {
  render(
    <MemoryRouter>
      <WorldsChampions />
    </MemoryRouter>,
  );
};

describe('WorldsChampions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    setChampionsStore({ loading: true });
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders full data state', () => {
    setChampionsStore({
      data: [
        {
          season: '2022',
          driver: { id: 'driver-1', name: 'Max Verstappen', nationality: 'Dutch' },
          team: { id: 'team-1', name: 'Red Bull Racing' },
        },
      ],
    });

    renderComponent();

    expect(screen.getByText('🏆 F1 World Champions')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toHaveTextContent(
      'Max Verstappen (Dutch) - Red Bull Racing - 2022',
    );
  });
});
