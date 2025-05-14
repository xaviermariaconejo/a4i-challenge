import { useContext } from "react";

import { InsuranceContext } from "./context";

export function useInsurance() {
  const context = useContext(InsuranceContext);
  if (!context) {
    throw new Error("useInsurance must be used inside InsuranceProvider");
  }
  return context;
}
