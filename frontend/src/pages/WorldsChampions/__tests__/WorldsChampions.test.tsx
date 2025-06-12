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
  Card: (props: {
    driver: string;
    driverNationality: string;
    team: string;
    entries: [{ label: string; value: string }];
  }) => (
    <div data-testid="card">
      {props.driver} ({props.driverNationality}) - {props.team} - {props.entries[0].value}
    </div>
  ),
}));

vi.mock('components/DataBoundary/DataBoundary', () => ({
  DataBoundary: (props: {
    loading: boolean;
    error: boolean;
    empty: boolean;
    children: React.ReactNode;
  }) => {
    if (props.loading) return <div>Loading...</div>;
    if (props.error) return <div>Error occurred</div>;
    if (props.empty) return <div>No data</div>;
    return <>{props.children}</>;
  },
}));

vi.mock('utils/useDelayedLoader', () => ({
  useDelayedLoader: (loading: boolean) => loading,
}));

const setChampionsStore = ({
  data = [],
  loading = false,
  error = false,
}: {
  data?: Champion[];
  loading?: boolean;
  error?: boolean;
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
