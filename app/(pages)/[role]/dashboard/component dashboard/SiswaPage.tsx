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
import useAuthModule from "@/app/lib/(auth)/lib";
import Navbar from "@/component/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import useDownloadPdf from "@/hook/useDownloadPdf";

const SiswaPage = () => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(24);
  const [hours, setHours] = useState(10);
  const { useProfile } = useAuthModule();
  const { data: dataProfil, } = useProfile();
  const { useDetail } = useCrudModule();
  // const { data: dataPdf, isLoading } = useDetail<Blob>("/download/pdf-week");

  const role = 'murid';

  const { downloadPdf, isLoading, error } = useDownloadPdf({ role });

  const handleDownload = () => {
    // Sesuaikan endpoint dan nama file
    downloadPdf(`/api/download/pdf`, "Recap.pdf");
  };

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

  const {
    data,
    isFetching,
    isLoading: isJadwalLoading,
  } = useCrudModule().useList<DataJadwalHariIniResponse>(
    "/jadwal/hari-ini-siswa"
  );

  const router = useRouter();

  const test = 'odamda'
  // useEffect(() => {
  //   console.log("Data PDF:", dataPdf);
  // }, [dataPdf]);
  

  // const handleDownload = async () => {
  //   try {
  //     const response = await axios.get("/download/pdf-week", {
  //       responseType: "blob", // Pastikan respons berupa file biner
  //     });
  
  //     const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "WeeklyRecap.pdf");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode?.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     alert("Gagal mengunduh file. Silakan coba lagi.");
  //   }
  // };
  
  

  return (
    <section>
      <Navbar
        role="murid"
        title1="Dashboard"
        title2="Attendance"
        title3="Profile"
      />
      <div className="w-screen px-8">
        <div className="flex w-full my-10 items-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-quick text-3xl font-medium">
              {isLoading ? (
                <Skeleton width={200} />
              ) : (
                `Hi, ${dataProfil?.data.nama}`
              )}
            </h1>
            <h1 className="font-quick text-3xl font-medium">
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                `Kelas : ${data?.data.kelas}`
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
              <h1 className="font-quick text-3xl">
                {isLoading ? (
                  <Skeleton width={300} />
                ) : (
                  "SMK Madinatul Quran | Student"
                )}
              </h1>
            </div>
          </div>
        </div>
        <hr className="w-full border border-[#6C757D]" />

        <div className="flex w-full justify-between mt-6">
          <div>
            <h1 className="font-quick font-semibold text-4xl text-[#212529]">
              {isLoading ? <Skeleton width={150} /> : "Today's Class"}
            </h1>
            <h1 className="font-quick font-medium text-lg text-[#495057] w-[708px] mt-2">
              {isLoading ? (
                <Skeleton count={2} width={"70%"} />
              ) : (
                `Today's class is a ${data?.data.mapel} class, please enter the class that is already available in the schedule or click button beside.`
              )}
            </h1>
          </div>
          <button
            onClick={() => router.push("attendance")}
            className="btn btn-outline font-semibold text-[24px] px-16 h-[98px]"
          >
            {isLoading ? <Skeleton width={150} /> : "Enter class"}
          </button>
        </div>

        {/* {isJadwalLoading ? <Skeleton height={250} /> : <TableJadwal />} */}

        {/* {isJadwalLoading ? <Skeleton height={250} /> : <TeacherTable />} */}
        <hr className="w-full border border-[#6C757D] mt-8" />

        {isLoading ? (
          <Skeleton height={250} />
        ) : (
          <div className="flex md:flex-row flex-col my-8 justify-evenly">
            {["Weekly", "Monthly", "Semester Basis"].map((title, index) => (
              <DoughnutComponent
                key={index}
                title={title}
                absen={25}
                attendece={25}
                permission={50}
              />
            ))}
          </div>
        )}

        <div className="flex w-full justify-between mb-32">
          <h1 className="font-quick font-medium text-lg text-[#495057] w-[708px]">
            {isLoading ? (
              <Skeleton count={2} />
            ) : (
              "This will kindly remind you of your attendance each time you clock in, whether it be weekly, monthly, or per semester."
            )}
          </h1>
          <button 
          onClick={handleDownload}
          className="btn btn-outline font-semibold text-[16px]">
            {isLoading ? <Skeleton width={150} /> : "Download Recap"}
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SiswaPage;
