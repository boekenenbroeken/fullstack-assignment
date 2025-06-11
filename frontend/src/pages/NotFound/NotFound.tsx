import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="flex flex-col justify-center items-center h-screen text-center px-4">
    <h1 className="text-5xl font-extrabold mb-4">🏁 404 — Off the track</h1>
    <p className="text-lg text-gray-600 mb-8">
      You missed the corner. This page doesn't exist — maybe your pit crew can help.
    </p>
    <Link
      to="/"
      className="inline-flex items-center px-6 py-3 text-white bg-black rounded-lg shadow hover:bg-gray-900 transition"
    >
      Back to World Champions
    </Link>
  </div>
);
