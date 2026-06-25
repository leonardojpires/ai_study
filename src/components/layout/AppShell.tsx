import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen min-h-screen flex bg-linear-to-tr from-blue-50 to-slate-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        <MobileHeader />
        <div className="flex-1 flex flex-col items-center justify-start">
          {children}
        </div>
      </main>
    </div>
  );
}