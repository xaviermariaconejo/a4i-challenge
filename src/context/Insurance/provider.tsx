import { useState, useEffect, type PropsWithChildren, type FC } from "react";

import type { Insurance } from "../../types/Insurance";
import { InsuranceContext } from "./context";
import {
  SOCKET_EVENT_TYPES,
  SOCKET_ACTION_TYPES,
  SOCKET_EVENTS,
} from "../Socket/constants";
import { useSocket } from "../Socket/hook";

export const InsuranceProvider: FC<PropsWithChildren> = ({ children }) => {
  const { socket } = useSocket();
  const [insurance, setInsurance] = useState<Insurance | null>(null);

  useEffect(() => {
    const handleAction = (payload: {
      type: string;
      action?: string;
      payload?: Insurance;
    }) => {
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
  }, [socket]);

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
