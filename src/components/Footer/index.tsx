import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-primary-dark text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center">
        <span className="text-sm">
          © {new Date().getFullYear()} A4I Challenge. All rights reserved.
        </span>

        {/* TODO: Add react router dom to fulfill that */}
        {/* <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/terms">Términos</a>
          <a href="/privacy">Privacidad</a>
          <a href="/contact">Contacto</a>
        </div> */}
      </div>
    </footer>
  );
};
