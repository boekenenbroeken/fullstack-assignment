import { render, screen } from '@testing-library/react';
import type { SVGProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FlagIcon } from '../FlagIcon';

vi.mock('../assets/spain.svg?react', () => ({
  default: (props: SVGProps<SVGSVGElement>) => <svg data-testid="spanish-flag" {...props} />,
}));

vi.mock('../assets/placeholder.svg?react', () => ({
  default: (props: SVGProps<SVGSVGElement>) => <svg data-testid="placeholder-flag" {...props} />,
}));

describe('FlagIcon', () => {
  it('renders correct flag icon for known nationality', () => {
    render(<FlagIcon nationality="Spanish" />);
    expect(screen.getByTestId('spanish-flag')).toBeInTheDocument();
  });

  it('normalizes nationality (case insensitive, trim)', () => {
    render(<FlagIcon nationality="  sPaNiSh  " />);
    expect(screen.getByTestId('spanish-flag')).toBeInTheDocument();
  });

  it('renders placeholder for unknown nationality', () => {
    render(<FlagIcon nationality="Martian" />);
    expect(screen.getByTestId('placeholder-flag')).toBeInTheDocument();
  });

  it('sets correct aria-label', () => {
    render(<FlagIcon nationality="Spanish" />);
    const svg = screen.getByLabelText('Spanish flag');
    expect(svg).toBeInTheDocument();
  });

  it('logs warning for unknown nationality', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<FlagIcon nationality="Alien" />);
    expect(warn).toHaveBeenCalledWith('Unknown nationality: "Alien"');
    warn.mockRestore();
  });
});
