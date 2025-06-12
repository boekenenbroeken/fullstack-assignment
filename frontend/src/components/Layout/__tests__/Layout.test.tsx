import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Layout } from '../Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child">Hello World</div>
      </Layout>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies correct container styles', () => {
    const { container } = render(
      <Layout>
        <div>Test</div>
      </Layout>,
    );

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('max-w-screen-xl');
    expect(wrapper).toHaveClass('mx-auto');
    expect(wrapper).toHaveClass('px-4');
  });
});
