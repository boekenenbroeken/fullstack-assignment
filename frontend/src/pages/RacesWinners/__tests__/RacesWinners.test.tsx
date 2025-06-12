import { render, screen } from '@testing-library/react';
import { Champion, Race } from 'api/types/models';
import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RacesWinners } from '../RacesWinners';

const hydrateRaces = vi.fn();
const hydrateChampions = vi.fn();
const useRacesStore = vi.fn();
const useChampionsStore = vi.fn();

vi.mock('store/races', () => ({
  useRacesStore: () => useRacesStore(),
}));

vi.mock('store/champions', () => ({
  useChampionsStore: () => useChampionsStore(),
}));

vi.mock('components/Card/Card', () => ({
  Card: ({
    driver,
    driverNationality,
    team,
    entries,
    isHighlighted,
  }: {
    driver: string;
    driverNationality: string;
    team: string;
    entries: { label: string; value: string }[];
    isHighlighted?: boolean;
  }) => (
    <div data-testid="card">
      {driver} ({driverNationality}) - {team} - {entries[0]?.value ?? ''}
      {isHighlighted ? ' (Champion)' : ''}
    </div>
  ),
}));

vi.mock('components/DataBoundary/DataBoundary', () => ({
  DataBoundary: ({
    loading,
    error,
    empty,
    children,
  }: {
    loading: boolean;
    error: boolean;
    empty?: boolean;
    children: ReactNode;
  }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;
    if (empty) return <div>No data</div>;
    return <>{children}</>;
  },
}));

vi.mock('utils/useDelayedLoader', () => ({
  useDelayedLoader: (loading: boolean) => loading,
}));

type StoreConfig = {
  races?: Race[];
  racesLoading?: boolean;
  racesError?: boolean;
  champions?: Champion[];
  championsLoading?: boolean;
  championsError?: boolean;
};

const setStores = ({
  races = [],
  racesLoading = false,
  racesError = false,
  champions = [],
  championsLoading = false,
  championsError = false,
}: StoreConfig) => {
  useRacesStore.mockReturnValue({
    data: races,
    loading: racesLoading,
    error: racesError,
    hydrate: hydrateRaces,
  });

  useChampionsStore.mockReturnValue({
    data: champions,
    loading: championsLoading,
    error: championsError,
    hydrate: hydrateChampions,
  });
};

const renderComponent = (path = '/2022') => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:season" element={<RacesWinners />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('RacesWinners', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    setStores({ racesLoading: true, championsLoading: true });
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    setStores({});
    renderComponent();
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders full data state', () => {
    setStores({
      races: [
        {
          name: 'Silverstone GP',
          winner: { id: 'driver-1', name: 'Lewis Hamilton', nationality: 'British' },
          team: { id: 'team-1', name: 'Mercedes' },
          id: 1,
          date: '2022-07-03',
          circuitName: 'Silverstone Circuit',
          round: '10',
        },
      ],
      champions: [
        {
          season: '2022',
          driver: { id: 'driver-1', name: 'alonso', nationality: 'Spanish' },
          team: { id: 'team-1', name: 'Mercedes' },
        },
      ],
    });

    renderComponent();
    expect(screen.getByText(/2022 Race Winners/i)).toBeInTheDocument();
    expect(screen.getByTestId('card')).toHaveTextContent(
      'Lewis Hamilton (British) - Mercedes - Silverstone GP (Champion)',
    );
  });
});
