import { Link } from 'react-router-dom';

import ErrorIcon from './assets/car-error.svg?react';

export const ErrorScreen = () => (
  <div className="flex flex-col justify-center items-center h-screen text-center px-4">
    <ErrorIcon className="w-36 mb-8 drop-shadow-lg" data-testid="error-icon" />
    <h1 className="text-4xl font-extrabold text-red-600 mb-4">🚨 Red Flag!</h1>
    <p className="text-lg text-gray-700 max-w-md mb-10">
      Engine failure detected. The pit crew is on it — please try again later.
    </p>
    <Link
      to="/"
      className="inline-flex items-center px-6 py-3 text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 active:bg-red-800 transition"
    >
      Back to World Champions
    </Link>
  </div>
);
