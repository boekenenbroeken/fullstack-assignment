import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Loader } from '../Loader';
import styles from '../Loader.module.css';

vi.mock('../assets/racing-car.svg?react', () => ({
  default: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="racing-car-icon" {...props} />
  ),
}));

describe('Loader', () => {
  it('renders road container', () => {
    const { container } = render(<Loader />);
    const road = container.querySelector(`.${styles.road}`);
    expect(road).toBeInTheDocument();
  });

  it('renders racing car icon', () => {
    render(<Loader />);
    expect(screen.getByTestId('racing-car-icon')).toBeInTheDocument();
  });

  it('renders finish line', () => {
    const { container } = render(<Loader />);
    const finish = container.querySelector(`.${styles.finish}`);
    expect(finish).not.toBeNull();
  });
});
