import type { FC, PropsWithChildren } from "react";
import { ApiProvider } from "./context/Api/provider";
import { SocketProvider } from "./context/Socket/provider";

// Add here all generic providers
export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApiProvider>
      <SocketProvider>{children}</SocketProvider>
    </ApiProvider>
  );
};
