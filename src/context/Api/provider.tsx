import { useState, type PropsWithChildren, type FC } from "react";

import { API_KEY } from "../../config/constants";
import { ApiContext } from "./context";

export const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [key, setKey] = useState<string>(API_KEY);

  return (
    <ApiContext.Provider
      value={{
        key,
        setKey,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
