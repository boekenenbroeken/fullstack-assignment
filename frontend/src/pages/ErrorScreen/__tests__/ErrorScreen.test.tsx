import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorScreen } from '../ErrorScreen';

vi.mock('./assets/car-error.svg?react', () => ({
  default: () => <svg data-testid="error-icon" />,
}));

describe('ErrorScreen', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <ErrorScreen />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();

    expect(screen.getByText(/Red Flag!/i)).toBeInTheDocument();

    expect(screen.getByText(/Engine failure detected/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Back to World Champions/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });
});
