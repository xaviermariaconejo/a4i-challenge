import { useState, type ChangeEvent, type FC } from "react";
import { useApi } from "../../context/Api/hook";

interface SettingsProps {
  onClose: () => void;
}

export const Settings: FC<SettingsProps> = ({ onClose }) => {
  const { key, setKey } = useApi();
  const [settingValue, setSettingValue] = useState<string>(key);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettingValue(e.target.value);
  };

  const handleSave = () => {
    setKey(settingValue);
    onClose();
  };

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
        <div className="mb-4">
          <label
            htmlFor="settingInput"
            className="block text-gray-700 dark:text-gray-300 mb-1"
          >
            Change your Api Key:
          </label>
          <input
            id="settingInput"
            type="text"
            value={settingValue}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="Type here..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
