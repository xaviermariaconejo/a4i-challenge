import { InsuranceProvider } from "./context/Insurance/provider";
import { ChatProvider } from "./context/Chat/provider";

import { ChatPanel } from "./components/ChatPanel";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { InsuranceQuote } from "./components/InsuranceQuote";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="container flex-1 p-6 grid grid-cols-2 gap-4 items-start">
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
}
