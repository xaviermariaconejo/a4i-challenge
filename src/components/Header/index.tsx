import { useState, type FC } from "react";
import { Settings } from "../Settings";

interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title = "A4I Challenge" }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);

  return (
    <>
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button
            onClick={handleOpenSettings}
            className="p-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
            aria-label="Open settings"
          >
            ⚙️ Settings
          </button>
        </div>
      </header>
      {isSettingsOpen && <Settings onClose={handleCloseSettings} />}
    </>
  );
};
