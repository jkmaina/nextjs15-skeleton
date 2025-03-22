'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-2xl font-semibold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors"
        >
          Go home
        </button>
      </div>
    </div>
  );
}