import { Loader } from 'components/Loader/Loader';
import { ErrorScreen } from 'pages/ErrorScreen/ErrorScreen';
import type { ReactNode } from 'react';

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
