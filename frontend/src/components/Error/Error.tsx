import ErrorIcon from './assets/car-error.svg?react';

export const ErrorState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <p className="text-lg mb-5">Ooops! Something went wrong...</p>
    <ErrorIcon className="w-36" />
  </div>
);
