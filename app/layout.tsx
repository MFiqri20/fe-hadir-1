// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/component/NextAuthProvider";
import ReactQuery from "@/component/ReactQuery";
import { Session } from "next-auth";
import { ReactNode } from "react";
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import {
  AcademicCapIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";
// import LogoutButton from "@/components/LogoutButton"; // Import the new client component

interface NextAuthProps {
  children: ReactNode;
  session: Session | null | undefined;
}

const inter = Inter({ subsets: ["latin"] });

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});


export const metadata: any = {
  title: "Hadir Pak",
  description: "Absen Application",
};

export default function RootLayout({ children, session }: any) {
  return (
    <html lang="en" data-theme="">
      <body className={`${quicksand.variable} overflow-x-hidden`}>
        <NextAuthProvider session={session}>
          <ReactQuery >{children}</ReactQuery>
        </NextAuthProvider>
      </body>
    </html>
  );
}
