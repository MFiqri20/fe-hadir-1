"use client";
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import Footer from "@/component/Footer";
import useCrudModule from "@/hook/useCRUD";
import {
  CreateAbsenGuruPayload,
  DataJadwalHariIniResponse,
} from "@/app/lib/(absen)";
import { signOut } from "next-auth/react";
import useAuthModule from "@/app/lib/(auth)/lib";
import NavbarResponsive from "@/component/NavbarResponsive";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Navbar from "@/component/Navbar";
import Recap from "./component/recap";

const RecapPage = () => {
  const { useProfile } = useAuthModule();
  const { data: dataProfil } = useProfile();

  return (
    <section className="w-screen h-screen overflow-x-hidden font-quick">
      <Navbar
        title1="Dashboard"
        title2="Attendance"
        title3="Recap"
        role="guru"
        userData="recap"
      />

      <div className="w-screen px-8">
        <div className="flex w-full justify-between items-center mt-[58px]">
          <div className="flex flex-col gap-3 md:w-full">
            <h1 className="font-quick text-2xl md:text-3xl font-medium">
              Hi, {dataProfil?.data.nama}
            </h1>
            <div className="flex flex-row gap-2">
              <picture>
                <Image src={logo} alt="user" width={35} height={35} />
              </picture>
              <h1 className="font-quick text-lg md:text-3xl">
                SMK Madinatul Quran | Teacher
              </h1>
            </div>
          </div>
          <div className="flex flex-col w-full items-end gap-2">
            <button className="btn btn-outline md:px-8 h-[60px] w-[213px] px-2 text-lg font-semibold font-quick hover:text-white md:text-lg hover:bg-[#023E8A]">
              Dowload Recap
            </button>
            <h1 className="font-quick font-medium text-[#495057]">
              Download to excel or pdf
            </h1>
          </div>
          <picture>
            <Image src={profile} alt="user" className="md:hidden w-12 md:w-0" />
          </picture>
        </div>
        {/*  */}
        <hr className="w-full border border-[#6C757D] mt-12" />
        {/*  */}
        <div className="w-full flex justify-between items-center mt-12">
          <h1 className="font-medium text-2xl">Weekly Recap</h1>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex font-quick font-semibold m-1 text-lg"
            >
              <ChevronDownIcon className="w-5 mr-2" />
              <h1>Weekly</h1>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
            >
              <li>
                <a href="">Wekly</a>
              </li>
              <li>
                <a href="">Monthly</a>
              </li>
              <li>
                <a href="">Semester Basis</a>
              </li>
            </ul>
          </div>
        </div>
        {/*  */}
        <Recap />
        {/*  */}
        <div className="w-full flex justify-between items-center">
          <h1 className="font-quick md:text-xl text-[14px] w-[200px] md:w-[708px]">
            This will kindly remind you of your attendance each time you clock
            in, whether it be weekly, monthly, or per semester.
          </h1>
          <button className="btn btn-outline md:px-4 px-2 font-semibold font-quick hover:text-white md:text-lg hover:bg-[#023E8A]">Dowload Recap</button>
        </div>
      </div>
    </section>
  );
};

export default RecapPage;
