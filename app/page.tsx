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
import CopyToClipboardButton from "@/component/CopyToClipboardButton";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("session:", session);
  const router = useRouter();
  const textToCopy = 'A78P1';

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login"); // Redirect to login if no session
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Optionally render a loading state while checking session
  }
  
  return (
    <main className="w-screen h-full">
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
      {/* --------------- navbar ---------------- */}

      <div className="px-10 w-full h-screen">
        <div className="w-full my-10 flex flex-col gap-3">
          <h1 className="font-quick text-3xl font-medium">
            Hi, Akbar Rismawan
          </h1>
          <div className="flex flex-row gap-2">
            <picture>
              <Image src={logo} alt="user" width={35} height={35} />
            </picture>
            <h1 className="font-quick text-2xl">
              SMK Madinatul Quran | Teacher
            </h1>
          </div>
          <div className="flex gap-2">
            <h1 className="font-quick text-2xl font-medium text-[#2F3E46]">
              Class code : <span className="font-semibold">{textToCopy}</span>
            </h1>
            <CopyToClipboardButton text={textToCopy}/>
          </div>
        </div>
        {/* ------------ dashboard --------------- */}

        <div className="">
          <p className="font-quick text-lg text-[#495057] my-1">Overview</p>
          <div className="w-full border"></div>
        </div>

        <div className="w-full h-screen flex flex-col bg-gray-100 rounded-md my-5">
          <div className="my-8 mx-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-3">
                <div className="w-16 h-16 bg-[#023E8A] rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="text-white w-[50px] h-[50px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-quick text-3xl font-medium">
                    Today, 27 July 2024
                  </h1>
                  <p className="font-quick text-md">
                    This will show daily data in real-time
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-12">
                <div className="border border-gray-500 rounded-md px-3 py-3">
                  <div className="flex flex-row gap-10">
                    <p className="">Students</p>
                    <UsersIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <h1 className="font-quick font-medium text-3xl pt-3">22</h1>
                </div>
                <div className="border border-gray-500 rounded-md px-3 py-3">
                  <div className="flex flex-row gap-10">
                    <p className="">Attendace</p>
                    <UsersIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <h1 className="font-quick font-medium text-3xl pt-3">20</h1>
                </div>
                <div className="border border-gray-500 rounded-md px-3 py-3">
                  <div className="flex flex-row gap-10">
                    <p className="">Absent</p>
                    <UsersIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <h1 className="font-quick font-medium text-3xl pt-3">1</h1>
                </div>
                <div className="border border-gray-500 rounded-md px-3 py-3">
                  <div className="flex flex-row gap-10">
                    <p className="">Permission</p>
                    <UsersIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <h1 className="font-quick font-medium text-3xl pt-3">1</h1>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-full border bordergra my-7"></div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h1 className="font-quick font-medium text-2xl ">
                Students Attendace
              </h1>
              <p className="font-quick font-medium text-[#ADB5BD]">
                keep track students attendace on a daily basis.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-row justify-between w-full my-7">
              <div className="flex gap-5">
                <div className="rounded-md px-7 py-4 bg-[#023E8A]">
                  <h1 className="font-quick text-xl font-medium text-white">
                    All Students
                  </h1>
                </div>
                <div className="rounded-md px-7 py-4 bg-[#FFBC25]">
                  <h1 className="font-quick text-xl font-medium text-white">
                    This Class
                  </h1>
                </div>
                <div className="rounded-md px-7 py-4 bg-[#023E8A]">
                  <h1 className="font-quick text-xl font-medium text-white">
                    Absen
                  </h1>
                </div>
                <div className="rounded-md px-7 py-4 bg-[#023E8A]">
                  <h1 className="font-quick text-xl font-medium text-white">
                    Permission
                  </h1>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-row items-center border border-[#495057] rounded-md px-4 w-[467px] gap-3">
                  <MagnifyingGlassIcon className="w-6 text-[#212529]" />
                  <p className="text-[#6C757D] font-quick font-medium text-lg">
                    Search Something?
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between border border-[#495057] rounded-md px-4 gap-3">
                  <FunnelIcon className="w-6 text-[#212529]" />
                  <p className="text-[#6C757D] font-quick font-medium text-lg">
                    Filter
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
          <Table>
            <Thead>
              <Tr>
                <Th>NIK</Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Clock In</Th>
                <Th>Clock Out</Th>
                <Th>Coordinate</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Td>
                <span>SMKMQ0001</span>
              </Td>
              <Td>
                <span>Fatin Nayhan</span>
              </Td>
              <Td>
                <span>18 July 2024</span>
              </Td>
              <Td>
                <span>Attendace</span>
              </Td>
              <Td>
                <span>07:30</span>
              </Td>
              <Td>
                <span>15:00</span>
              </Td>
              <Td>
                <div className="flex gap-2 pl-[30rem] py-[59px]">
                  <MapPinIcon className="text-[#FFBC25] w-5" />
                  <p className="font-quick font-semibold text-[#212529]">
                    View Location
                  </p>
                </div>
              </Td>
            </Tbody>
          </Table>
          {/* pagination */}
          <div className="w-full bg-[#ADB5BD] py-4 px-6">
            <h1 className="font-quick font-semibold text-lg">Page 1 of 3</h1>
          </div>
          {/* pagination */}
        </div>
      </div>
    </main>
  );
}
