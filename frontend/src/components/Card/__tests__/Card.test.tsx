import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card component', () => {
  const defaultProps = {
    driver: 'Max Verstappen',
    driverNationality: 'Dutch',
    team: 'Red Bull',
    entries: [{ label: 'Season', value: '2023' }],
  };

  it('renders driver name, team and entries', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('Red Bull')).toBeInTheDocument();
    expect(screen.getByText('Season')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('applies title if highlighted', () => {
    render(<Card {...defaultProps} isHighlighted season="2023" />);

    expect(screen.getByTitle('2023 World Champion')).toBeInTheDocument();
  });

  it('renders aside content if provided', () => {
    render(<Card {...defaultProps} aside={<span data-testid="aside">Aside content</span>} />);

    expect(screen.getByTestId('aside')).toBeInTheDocument();
    expect(screen.getByText('Aside content')).toBeInTheDocument();
  });

  it('applies highlight classes when isHighlighted is true', () => {
    const { container } = render(<Card {...defaultProps} isHighlighted />);
    expect(container.firstChild).toHaveClass('border-2');
    expect(container.firstChild).toHaveClass('shadow-yellow-200');
  });
});
