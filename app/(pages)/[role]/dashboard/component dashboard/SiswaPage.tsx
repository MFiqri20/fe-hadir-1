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
import DoughnutChart from "@/component/DoughnutChart";
import React from "react";
import Footer from "@/component/Footer";
import { Chart, ChartOptions, LegendItem } from "chart.js";
import { ChartData } from "chart.js";
import TableJadwal from "@/component/JadwalTable";
import DoughnutComponent from "../component/DONUTCHART";
import TeacherTable from "../component/TeacherSchedule";
import useCrudModule from "@/hook/useCRUD";
import {
  CreateAbsenSiswaPayload,
  DataJadwalHariIniResponse,
} from "@/app/lib/(absen)";

const SiswaPage = () => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(24);
  const [hours, setHours] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds, minutes, hours]);

  const { data, isFetching } =
    useCrudModule().useList<DataJadwalHariIniResponse>(
      "/jadwal/hari-ini-siswa"
    );

    const router = useRouter()

  console.log("data", data);

  return (
    <section>
      <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture>
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="flex gap-10">
          <a href="/murid/dashboard" className="font-quick text-[#FFBC25] text-base">
            Dashboard
          </a>
          <a
            href={`/murid/attendance`}
            className="font-quick text-white text-base"
          >
            Attendance
          </a>
          <a href="" className="font-quick text-white text-base">
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
              <a
                onClick={async () => {
                  await signOut();
                  router.push('/login')
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*  */}
      <div className="w-screen px-8">
        <div className="flex w-full my-10 items-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-quick text-3xl font-medium">
              Hi, Ramzi Respati
            </h1>
            <div className="flex flex-row gap-2">
              <picture>
                <Image src={logo} alt="user" width={35} height={35} />
              </picture>
              <h1 className="font-quick text-3xl">
                SMK Madinatul Quran | Student
              </h1>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <hr className="w-full border border-[#6C757D]" />
        {/*  */}

        <div className="flex w-full justify-between mt-6">
          <div className="">
            <h1 className="font-quick font-semibold text-4xl text-[#212529]">
              Today`s Class
            </h1>
            <h1 className="font-quick font-medium text-lg text-[#495057] w-[708px] mt-2">
              Today`s class is a{" "}
              <span className="font-bold">{data?.data.mapel} class</span> , please enter
              the class that is already available in the schedule or click
              button beside.
            </h1>
          </div>
          <button className="btn btn-outline font-semibold text-[24px] px-16 h-[98px]">
            Enter class
          </button>
        </div>

        <TableJadwal />
        {/*  */}

        <TeacherTable />
        <hr className="w-full border border-[#6C757D] mt-8" />
        {/*  */}
        <div className="flex md:flex-row flex-col my-8 justify-evenly">
          <DoughnutComponent
            title="Weekly"
            absen={25}
            attendece={25}
            permission={50}
          />
          <DoughnutComponent
            title="Monthly"
            absen={25}
            attendece={25}
            permission={50}
          />
          <DoughnutComponent
            title="Semester Basis"
            absen={25}
            attendece={25}
            permission={50}
          />
        </div>
        {/*  */}
        <div className="flex w-full justify-between mb-32">
          <h1 className="font-quick font-medium text-lg text-[#495057] w-[708px]">
            This will kindly remind you of your attendance each time you clock
            in, whether it be weekly, monthly, or per semester.
          </h1>
          <button className="btn btn-outline font-semibold text-[16px]">
            Download Recap
          </button>
        </div>
      </div>
      {/*  */}
      <Footer />
    </section>
  );
};

export default SiswaPage;
