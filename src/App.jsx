import React from "react";
import { Footer, Header, ServerWakeupBanner } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ease-in-out">
        <Header />
        <ServerWakeupBanner />
        <main className="grow w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
