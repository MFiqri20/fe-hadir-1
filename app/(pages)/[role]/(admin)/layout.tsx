"use client";
import { ReactNode, useState } from "react";
import SideBar from "./components/sideBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="h-screen w-screen font-quick flex overflow-hidden">
      <SideBar onHoverChange={setIsSidebarExpanded} />
      <div
        className={`flex-1 h-screen overflow-auto transition-[padding-left] duration-300`}
      >
        {children}
      </div>
    </div>
  );
}
