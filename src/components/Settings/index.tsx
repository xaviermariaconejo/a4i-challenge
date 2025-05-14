import type { FC } from "react";

interface SettingsProps {
  onClose: () => void;
}

export const Settings: FC<SettingsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl leading-none"
            aria-label="Close settings"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Ajustes de la aplicación…
        </p>
      </div>
    </div>
  );
};
