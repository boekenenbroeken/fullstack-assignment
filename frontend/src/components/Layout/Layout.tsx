import type { ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
};

export const Layout = ({ children }: Props) => (
  <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-9">{children}</div>
);
