import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import { Routes } from '../Routes';

vi.mock('pages/WorldsChampions/WorldsChampions', () => ({
  WorldsChampions: () => <div>WorldsChampions Page</div>,
}));

vi.mock('pages/RacesWinners/RacesWinners', () => ({
  RacesWinners: () => <div>RacesWinners Page</div>,
}));

vi.mock('pages/NotFound/NotFound', () => ({
  NotFound: () => <div>NotFound Page</div>,
}));

describe('Routes', () => {
  it('renders WorldsChampions for root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(screen.getByText('WorldsChampions Page')).toBeInTheDocument();
  });

  it('renders RacesWinners for season path', () => {
    render(
      <MemoryRouter initialEntries={['/race/2022']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(screen.getByText('RacesWinners Page')).toBeInTheDocument();
  });

  it('renders NotFound for unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(screen.getByText('NotFound Page')).toBeInTheDocument();
  });
});
