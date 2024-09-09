"use client";
// image
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
// icon
import { RiNotificationBadgeLine } from "react-icons/ri";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
//
import useAuthModule from "@/app/lib/(auth)/lib";
import SimpleLineChart from "../../(admin)/components/lineMui";
import BasicBars from "../../(admin)/components/barMui";
const AdminDashboard = () => {
  const { useProfile } = useAuthModule();
  const { data: dataProfil } = useProfile();

  return (
    <section className="w-full py-8">
      <div className="flex justify-between items-center mx-6">
        <h1 className="text-4xl font-medium">Dashboard</h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      {/*  */}
      <hr className="w-full border border-[#D9D9D9] mt-8" />
      {/*  */}
      <div className="px-7 py-8">
        <div className="flex justify-between items-cemter">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-3">
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
            <picture>
              <Image src={profile} alt="user" className="md:hidden w-12" />
            </picture>
          </div>
          <div className="w-full md:w-full md:block flex flex-col items-end text-right">
            <h1 className="font-light text-[54px] text-[#495057]">10:37 AM</h1>
            <h1 className="md:text-xl text-[28px] text-[#495057]">
              Monday, 24 August 2024
            </h1>
          </div>
        </div>
        <hr className="w-full border border-[#D9D9D9] mt-8" />
        <h1 className="text-2xl mt-9 w-[998px]">
          Welcome to the school attendance system. Here, you can easily manage
          student, teacher and staff attendance and view real-time attendance
          summaries.
        </h1>
        {/*  */}
        <div className="flex w-full items-center justify-evenly mt-[49px]">
          {/*  */}
          <div className="bg-[#F8F9FA] shadow-lg rounded-lg p-5 flex items-center space-x-4 max-w-xs">
            <div className="bg-[#0077B6] rounded-[30px] p-6">
              <HiOutlineAcademicCap className="text-white text-[50px]" />
            </div>
            <div className="">
              <h2 className="text-gray-800 text-2xl font-semibold">Student</h2>
              <p className="text-3xl font-semibold">100</p>
            </div>
          </div>
          {/*  */}
          <div className="bg-[#F8F9FA] shadow-lg rounded-lg p-5 flex items-center space-x-4 max-w-xs">
            <div className="bg-[#0077B6] rounded-[30px] p-6">
              <FaChalkboardTeacher className="text-white text-[50px]" />
            </div>
            <div className="">
              <h2 className="text-gray-800 text-2xl font-semibold">Teacher</h2>
              <p className="text-3xl font-semibold">15</p>
            </div>
          </div>
          {/*  */}
          <div className="bg-[#F8F9FA] shadow-lg rounded-lg p-5 flex items-center space-x-4 max-w-xs">
            <div className="bg-[#0077B6] rounded-[30px] p-6">
              <GrUserWorker className="text-white text-[50px]" />
            </div>
            <div className="">
              <h2 className="text-gray-800 text-2xl font-semibold">Staff</h2>
              <p className="text-3xl font-semibold">17</p>
            </div>
          </div>
          {/*  */}
          <div className="bg-[#F8F9FA] shadow-lg rounded-lg p-5 flex items-center space-x-4 max-w-xs">
            <div className="bg-[#0077B6] rounded-[30px] p-6">
              <LuUsers2 className="text-white text-[50px]" />
            </div>
            <div className="">
              <h2 className="text-gray-800 text-2xl font-semibold">All</h2>
              <p className="text-3xl font-semibold">132</p>
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
        <div className="flex w-full justify-evenly items-center mt-8">
          <div className="bg-[#F8F9FA] p-4 flex flex-col gap-6 w-[858px] shadow-xl">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-2xl font-semibold text-[#212529]">
                  Attendance Overview
                </h1>
                <h1 className="font-medium">Weekly attendance</h1>
              </div>
              <IoMdMore className="text-2xl" />
            </div>
            <div className="w-full">
              <SimpleLineChart />
            </div>
          </div>
          {/*  */}
          <div className="bg-[#F8F9FA] p-4 flex flex-col gap-6 w-[290px] shadow-xl">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-lg font-semibold text-[#212529]">
                Productivity Overview
                </h1>
                <h1 className="font-medium">Weekly attendance</h1>
              </div>
              <IoMdMore className="text-2xl" />
            </div>
            <div className="w-full">
              <BasicBars />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
