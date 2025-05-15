import type { FC } from "react";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export const Error: FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <svg
            className="mx-auto h-12 w-12 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Establishing connection…
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            If it takes too long, try again later or check your API Key. That
            can be found in the settings section.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
