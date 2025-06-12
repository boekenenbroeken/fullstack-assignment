import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { NotFound } from '../NotFound';

describe('NotFound', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText(/404 — Off the track/i)).toBeInTheDocument();

    expect(screen.getByText(/You missed the corner. This page doesn't exist/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Back to World Champions/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });
});
