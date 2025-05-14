import { createContext } from "react";

import type { Insurance } from "../../types/Insurance";

export interface InsuranceContextType {
  insurance: Insurance | null;
}

export const InsuranceContext = createContext<InsuranceContextType | null>(
  null
);
