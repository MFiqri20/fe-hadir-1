"use client";
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
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import DoughnutChart from "@/component/DoughnutChart";
import React from "react";
import Footer from "@/component/Footer";
import TableJadwal from "@/component/JadwalTable";
import DoughnutComponent from "./component/DONUTCHART";
import TeacherTable from "./component/TeacherSchedule";
import SiswaPage from "./component dashboard/SiswaPage";
import notAccess from "/public/images/not-access1.png";
import GuruPage from "./component dashboard/GuruPage";
import AccessDeniedPage from "./component/access_denied";

const Dashboard = ({ params }: { params: { role: string } }) => {
  const role = params.role;
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session && status !== "unauthenticated") {
      router.push("/login"); // Redirect to login if no session
    }
  }, [session, status, router]);

  // Render loading state while checking session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Check for the role and render the appropriate page
  if (role.toLowerCase() === "guru") {
    return (
      <main className="w-screen h-full">
        <GuruPage role="guru" />
      </main>
    );
  }

  if (role.toLowerCase() === "admin") {
    router.push("/admin");
  }

  if (role.toLowerCase() === "murid") {
    return (
      <main className="w-screen h-full">
        <SiswaPage />
      </main>
    );
  }

  return <AccessDeniedPage />;
};



export default Dashboard;
