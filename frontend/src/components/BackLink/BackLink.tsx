import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  readonly to: string;
  readonly children: ReactNode;
};

export const BackLink = ({ to, children }: Props) => (
  <Link to={to} className="text-gray-500 hover:text-black transition-colors flex items-center">
    <ArrowLeftIcon className="h-4 w-4 mr-2" />
    {children}
  </Link>
);
