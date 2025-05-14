import { useState, useEffect, type PropsWithChildren, type FC } from "react";

import { socket } from "../../socket";
import {
  SOCKET_ACTION_TYPES,
  SOCKET_EVENT_TYPES,
  SOCKET_EVENTS,
} from "../../socket/constants";
import type { Insurance } from "../../types/Insurance";
import { InsuranceContext } from "./context";

export const InsuranceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [insurance, setInsurance] = useState<Insurance | null>(null);

  useEffect(() => {
    const handleAction = (payload: {
      type: string;
      action?: string;
      payload?: Insurance;
    }) => {
      console.log("DEBUGGER", payload);
      if (
        payload.type !== SOCKET_EVENT_TYPES.ACTION ||
        !payload.action ||
        payload.action !== SOCKET_ACTION_TYPES.INSURANCE_QUOTE ||
        !payload.payload
      )
        return;

      setInsurance(payload.payload);
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleAction);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleAction);
    };
  }, []);

  return (
    <InsuranceContext.Provider
      value={{
        insurance,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};
