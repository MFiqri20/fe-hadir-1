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
// import SimpleLineChart from "../../(admin)/components/lineMui";
import BasicBars from "../../(admin)/components/barMui";
import SimpleAreaChart from "../../(admin)/components/lineMui";
const AdminDashboard = () => {
  const { useProfile } = useAuthModule();
  const { data: dataProfil } = useProfile();

  const data = [
    { title: "Student", count: 100, Icon: HiOutlineAcademicCap },
    { title: "Teacher", count: 15, Icon: FaChalkboardTeacher },
    { title: "Staff", count: 17, Icon: GrUserWorker },
    { title: "All", count: 132, Icon: LuUsers2 },
  ];
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
        <div className="flex w-full items-center justify-between mt-[49px] gap-12">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] shadow-lg rounded-lg p-5 flex items-center space-x-4 w-1/4"
            >
              <div className="bg-[#0077B6] rounded-[30px] p-6">
                <item.Icon className="text-white text-[50px]" />
              </div>
              <div className="ml-5">
                <h2 className="text-gray-800 text-3xl font-semibold">
                  {item.title}
                </h2>
                <div className="flex flex-row gap-2">
                  <p className="text-3xl font-semibold">{item.count} </p>
                  {/* <p className="text-lg mt-1 text-[#495057] text-opacity-70 font-medium mb-2">
                    person
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*  */}
        <div className="flex w-full justify-between items-center gap-12 mt-6">
          <div className="bg-[#F8F9FA] p-4 flex flex-col w-[78%] shadow-xl gap-6">
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
              <SimpleAreaChart />
            </div>
          </div>
          {/*  */}
          <div className="bg-[#F8F9FA] py-8 px-4 h-full flex flex-col w-[23.5%] shadow-xl">
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
