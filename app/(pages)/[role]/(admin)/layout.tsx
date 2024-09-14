"use client";
import { ReactNode, useEffect, useState } from "react";
import SideBar from "./components/sideBar";
import Image from "next/image";
import NavBar from "./components/navbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname || "admin/");
  useEffect(() => {
    setCurrentPath(pathname ?? "admin/");
  }, [pathname]);
  return (
    <div className="h-screen w-screen font-quick flex overflow-hidden">
      <SideBar
        setCurrentPath={setCurrentPath}
        onHoverChange={setIsSidebarExpanded}
      />
      <div
        className={`flex-1 h-screen overflow-auto transition-[padding-left] duration-200`}
      >
        <NavBar currentPath={currentPath} />
        {children}
      </div>
    </div>
  );
}
