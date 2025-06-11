import type { ReactNode } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { ErrorScreen } from '@/pages/ErrorScreen/ErrorScreen';

type Props = {
  loading: boolean;
  error: boolean;
  empty?: boolean;
  children: ReactNode;
};

export const DataBoundary = ({ loading, error, empty = false, children }: Props) => {
  if (loading) return <Loader />;
  if (error) return <ErrorScreen />;
  if (empty) return <ErrorScreen />;

  return <>{children}</>;
};
