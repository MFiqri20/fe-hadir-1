"use cliet";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import React from "react";
import notAccess from "/public/images/not-access1.png";
import AdminNotif from "./components/guru";
import SiswaNotif from "./components/siswa";


const Notification = ({ params }: { params: { role: string } }) => {
  var role = params.role;

  if (role === "guru") {
    return (
      <main className="w-screen h-full">
        <AdminNotif />
      </main>
    );
  }
  if (role.toLowerCase() === "murid") {
    return (
      <main className="w-screen h-full">
        <SiswaNotif />
      </main>
    );
  }
  return (
    <main className="w-screen h-full flex flex-col items-center justify-center">
      <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture>
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="flex gap-10">
          <a href="/dashboard" className="font-quick text-white text-base">
            Dashboard
          </a>
          <a href="/" className="font-quick text-[#FFBC25] text-base">
            Attendance
          </a>
          <a href="#" className="font-quick text-white text-base">
            Userdata
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full">
              <picture>
                <Image src={profile} alt="user" width={80} height={80} />
              </picture>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-32">
        <picture>
          <Image src={notAccess} alt="notAccess" className="w-[100%]" />
        </picture>
      </div>
    </main>
  );
};

export default Notification;
