import { Link } from 'react-router-dom';
import ErrorIcon from './assets/car-error.svg?react';

export const ErrorScreen = () => (
  <div className="flex flex-col justify-center items-center h-screen text-center px-4">
    <ErrorIcon className="w-36 mb-6" />
    <h1 className="text-3xl font-extrabold mb-4">🚨 Red Flag!</h1>
    <p className="text-lg text-gray-600 mb-8">Engine failure. Something broke under the hood.</p>
    <Link
      to="/"
      className="inline-flex items-center px-6 py-3 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition"
    >
      Back to World Champions
    </Link>
  </div>
);
