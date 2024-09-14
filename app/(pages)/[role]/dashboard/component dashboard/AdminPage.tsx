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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import SimpleLineChart from "../../(admin)/components/lineMui";
import BasicBars from "../../(admin)/components/barMui";
import SimpleAreaChart from "../../(admin)/components/lineMui";

const AdminDashboard = () => {
  const { useProfile } = useAuthModule();
  const { data: dataProfil, isLoading } = useProfile();

  const data = [
    { title: "Student", count: 100, Icon: HiOutlineAcademicCap },
    { title: "Teacher", count: 15, Icon: FaChalkboardTeacher },
    { title: "Staff", count: 17, Icon: GrUserWorker },
    { title: "All", count: 132, Icon: LuUsers2 },
  ];

  return (
    <section className="w-full py-8">
      <div className="px-7 pb-8">
        <div className="flex justify-between items-cemter">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-3">
              <h1 className="font-quick text-2xl md:text-3xl font-medium">
                {isLoading ? (
                  <Skeleton width={200} />
                ) : (
                  `Hi, ${dataProfil?.data.nama}`
                )}
              </h1>
              <div className="flex flex-row gap-2">
                {isLoading ? (
                  <Skeleton circle height={35} width={35} />
                ) : (
                  <picture>
                    <Image src={logo} alt="user" width={35} height={35} />
                  </picture>
                )}
                <h1 className="font-quick text-lg md:text-3xl">
                  {isLoading ? (
                    <Skeleton width={400} height={35}/>
                  ) : (
                    `SMK Madinatul Quran | Teacher`
                  )}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full md:w-full md:block flex flex-col items-end text-right">
            <h1 className="font-light text-[54px] text-[#495057]">
              {isLoading ? <Skeleton width={80} /> : "10:37 AM"}
            </h1>
            <h1 className="md:text-xl text-[28px] text-[#495057]">
              {isLoading ? <Skeleton width={200} /> : "Monday, 24 August 2024"}
            </h1>
          </div>
        </div>
        <hr className="w-full border border-[#D9D9D9] mt-8" />
        <h1 className="text-2xl mt-9 w-full md:w-[60%]">
          {isLoading ? (
            <div className="">
            <Skeleton count={1} />
            <Skeleton count={1} width={"70%"}/>
            </div>
          ) : (
            "Welcome to the school attendance system. Here, you can easily manage student, teacher and staff attendance and view real-time attendance summaries."
          )}
        </h1>
        {/*  */}
        <div className="flex w-full items-center justify-between mt-[49px] gap-12">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] shadow-lg rounded-lg p-5 flex items-center space-x-4 w-1/4"
            >
              {isLoading ? (
                <Skeleton height={100} width={100} />
              ) : (
                <div className="bg-[#0077B6] rounded-[30px] p-6">
                  <item.Icon className="text-white text-[50px]" />
                </div>
              )}
              <div className="ml-5">
                <h2 className="text-gray-800 text-3xl font-semibold">
                  {isLoading ? <Skeleton width={80} /> : item.title}
                </h2>
                <div className="flex flex-row gap-2">
                  {isLoading ? (
                    <Skeleton width={40} />
                  ) : (
                    <p className="text-3xl font-semibold">{item.count}</p>
                  )}
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
                  {isLoading ? <Skeleton width={150} /> : "Attendance Overview"}
                </h1>
                <h1 className="font-medium">
                  {isLoading ? <Skeleton width={100} /> : "Weekly attendance"}
                </h1>
              </div>
              {isLoading ? (
                <Skeleton width={24} height={24} />
              ) : (
                <IoMdMore className="text-2xl" />
              )}
            </div>
            <div className="w-full">
              {isLoading ? <Skeleton height={200} /> : <SimpleAreaChart />}
            </div>
          </div>
          {/*  */}
          <div className="bg-[#F8F9FA] py-8 px-4 h-full flex flex-col w-[23.5%] shadow-xl">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-lg font-semibold text-[#212529]">
                  {isLoading ? (
                    <Skeleton width={150} />
                  ) : (
                    "Productivity Overview"
                  )}
                </h1>
                <h1 className="font-medium">
                  {isLoading ? <Skeleton width={100} /> : "Weekly attendance"}
                </h1>
              </div>
              {isLoading ? (
                <Skeleton width={24} height={24} />
              ) : (
                <IoMdMore className="text-2xl" />
              )}
            </div>
            <div className="w-full">
              {isLoading ? <Skeleton height={200} /> : <BasicBars />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
