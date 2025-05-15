import type { FC } from "react";

import { ChatPanel } from "../../components/ChatPanel";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { InsuranceQuote } from "../../components/InsuranceQuote";
import { ChatProvider } from "../../context/Chat/provider";
import { InsuranceProvider } from "../../context/Insurance/provider";

export const Home: FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="container flex-1 p-6 grid grid-cols-2 grid-rows-1 gap-4 items-start">
        <InsuranceProvider>
          <InsuranceQuote />
        </InsuranceProvider>
        <ChatProvider>
          <ChatPanel />
        </ChatProvider>
      </main>
      <Footer />
    </div>
  );
};
