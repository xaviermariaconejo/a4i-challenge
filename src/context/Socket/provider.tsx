import {
  type PropsWithChildren,
  type FC,
  useMemo,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

import { SOCKET_URL } from "./constants";
import { SocketContext } from "./context";
import { useApi } from "../Api/hook";
import { Error } from "../../pages/Error";
import { SERVER_URL } from "../../config/constants";

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { key } = useApi();
  const [isLoading, setIsLoading] = useState(true);

  const socket = useMemo<Socket>(() => {
    setIsLoading(true);
    return io(SERVER_URL, {
      path: SOCKET_URL,
      extraHeaders: { "x-api-key": key },
    });
  }, [key]);

  useEffect(() => {
    const onConnect = () => {
      // TODO: Add here a log with a better service
      console.log("Socket connected");
      setIsLoading(false);
    };

    const onError = () => {
      // TODO: Add here a log with a better service
      console.error("Error on socket connections");
      setIsLoading(false);
    };

    socket.on("connect", onConnect);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onError);
      socket.disconnect();
    };
  }, [socket]);

  if (isLoading || !socket.connected) {
    return <Error />;
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
