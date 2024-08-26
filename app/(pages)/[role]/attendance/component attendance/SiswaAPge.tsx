"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import useCrudModule from "@/hook/useCRUD";
import {
  CreateAbsenSiswaPayload,
  DataJadwalHariIniResponse,
} from "@/app/lib/(absen)";
import useAuthModule from "@/app/lib/(auth)/lib";
import dayjs from "dayjs";
import socket from "@/lib/socket";
import NavbarResponsive from "@/component/NavbarResponsive";
import Navbar from "@/component/Navbar";

const SiswaAttendance: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classCode, setClassCode] = useState<string>("");
  const { useProfileSiswa } = useAuthModule();
  const { data: dataSiswa } = useProfileSiswa();
  const [isAbsen2, setIsAbsen2] = useState<boolean>(false);

  const { useCreate } = useCrudModule();
  const { mutate } = useCreate<CreateAbsenSiswaPayload>(
    "/absen/masuk-siswa",
    "/jadwal/hari-ini-siswa"
  );

  const { data, isFetching } =
    useCrudModule().useList<DataJadwalHariIniResponse>(
      "/jadwal/hari-ini-siswa"
    );

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isAbsenSocket, setIsAbsenSocket] = useState<any>(true);

  useEffect(() => {
    if (data) {
      setIsAbsenSocket(data.data.is_masuk_kelas);
    }
  }, [data]);

  useEffect(() => {
    socket.on("absenCloseUpdated", (absen) => {
      setIsAbsenSocket(absen);
    });

    return () => {
      socket.off("absenCloseUpdated"); // Clean up listener on component unmount
    };
  }, [socket]);

  // Calculate the remaining time until jam_selesai
  useEffect(() => {
    if (data?.data) {
      const { jam_mulai, jam_selesai } = data.data;

      const updateCountdown = () => {
        const now: any = new Date();
        const [endHour, endMinute] = jam_selesai.split(":").map(Number);

        const endTime: any = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          endHour,
          endMinute
        );

        const timeDiffEnd = endTime - now;
        const totalSecondsEnd = Math.floor(timeDiffEnd / 1000);
        const hoursEnd = Math.floor(totalSecondsEnd / 3600);
        const minutesEnd = Math.floor((totalSecondsEnd % 3600) / 60);
        const secondsEnd = totalSecondsEnd % 60;

        setCountdown({
          hours: hoursEnd,
          minutes: minutesEnd,
          seconds: secondsEnd,
        });
      };

      updateCountdown(); // Initial call
      const interval = setInterval(updateCountdown, 1000); // Update countdown every second

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [data]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);
  const handleSubmit = () => {
    if (data?.data) {
      const { jam_mulai } = data.data;
      const now = new Date();

      // Parse the jam_mulai to create a Date object
      const [startHour, startMinute] = jam_mulai.split(":").map(Number);
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute
      );

      // Calculate the difference in minutes
      const diffInMinutes = Math.floor(
        (now.getTime() - startTime.getTime()) / 60000
      );

      // Determine the attendance status based on the difference
      let status = "Hadir"; // Default status

      if (diffInMinutes > 15 && diffInMinutes <= 60) {
        status = "Telat";
      } else if (diffInMinutes > 60 || now.getTime() > startTime.getTime()) {
        status = "Alpha";
      }

      // Count logic
      let presentCount = 0;
      let lateCount = 0;
      let absentCount = 0;

      // Example array for student attendance records, replace with actual data
      const absens = [
        // Sample data, replace with actual attendance data
        { status: "Hadir" },
        { status: "Telat" },
        { status: "Alpha" },
        { status: "Hadir" },
      ];

      absens.forEach((student) => {
        if (student.status === "Hadir") presentCount++;
        if (student.status === "Telat") lateCount++;
        if (student.status === "Alpha") absentCount++;
      });

      // Submit the attendance with the determined status and dynamic counts
      mutate(
        {
          kode_class: classCode,
        },
        {
          onSuccess: () => {
            socket.emit("createAbsenSiswa", {
              id: dataSiswa?.data?.id,
              nama: dataSiswa?.data?.nama,
              status: status, // Use the determined status
              tanggal: new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }), // Use the current date
              waktu_masuk: new Date().toLocaleDateString("en-GB", {
                minute: "2-digit",
                hour: "2-digit",
                day: "numeric",
                month: "long",
                year: "numeric",
              }), // Use the current time
              jumlah_hadir: presentCount,
              jumlah_telat: lateCount,
              jumlah_alpha: absentCount,
            });
          },
        }
      );
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-screen h-full">
      {/* <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture className="">
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="md:flex hidden gap-10">
          <a href="/guru/dashboard" className="font-quick text-white text-base">
            Dashboard
          </a>
          <button className="font-quick  text-base text-[#FFBC25]">
            Attendance
          </button>
          <a href="" className="font-quick text-white text-base">
            Userdata
          </a>
        </div>
        <div className="dropdown dropdown-end hidden md:block">
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
                  router.push("login");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
        <NavbarResponsive
          judul1="Dashboard"
          judul2="Attendance"
          judul3="Userdata"
          judul4="Notification"
        />
      </div> */}
      <Navbar title1="Dashboard" title2="Attendance" title3="Userdata" role="murid" userData="userdata"/>

      <div className="px-10 w-full h-screen">
        <div className="flex md:flex-row flex-col md:justify-between w-full items-center">
          <div className="my-10 flex flex-col gap-3">
            <div className="flex w-screen px-8 md:px-0 md:w-full justify-between items-center">
              <div className="flex flex-col gap-3">
                <h1 className="font-quick text-2xl md:text-3xl font-medium">
                  Hi, {dataSiswa?.data.nama}
                </h1>
                <div className="flex flex-row gap-2">
                  <picture>
                    <Image src={logo} alt="user" width={35} height={35} />
                  </picture>
                  <h1 className="font-quick text-lg md:text-3xl">
                    SMK Madinatul Quran | Student
                  </h1>
                </div>
              </div>
              <picture>
                <Image src={profile} alt="user" className="md:hidden w-12" />
              </picture>
            </div>
            <hr className="border border-[#212529] mt- md:hidden mx-8 opacity-25" />
          </div>
          <div className="w-full md:w-auto md:block flex flex-col items-end">
            <h1 className="font-quick font-medium md:text-[60px] text-[38px]">
              Database Class
            </h1>
            <h1 className="font-quick font-medium md:text-3xl text-[28px] text-[#495057] text-right">
              07.30 - 10.00 PM{" "}
            </h1>
          </div>
        </div>

        <hr className="w-full border border-[#212529] md:mt-20 mt-4 opacity-25" />

        {isAbsenSocket ? (
          <div className="w-full flex flex-col justify-center items-center text-center font-quick mt-32">
            <div className="justify-center flex">
              <span className="countdown md:text-[100px] text-[70px] font-light text-[#495057]">
                <span style={{ "--value": countdown.hours } as any}></span>:
                <span style={{ "--value": countdown.minutes } as any}></span>:
                <span style={{ "--value": countdown.seconds } as any}></span>
              </span>
            </div>
            <h1 className="md:w-[633px] w-full md:text-2xl text-base mt-2 font-medium my-1">
              Welcome to {data?.data.mapel} Class. You have until{" "}
              {data?.data.jam_selesai} to finish this class, and don`t forget to
              pray before we begin.
            </h1>
            {/* <button className="btn w-[633px] btn-outline mt-6 hover:bg-[#023E8A] bg-[#D51919] text-white">
              Absen Out
            </button> */}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center text-center font-quick mt-32">
            <h1 className="md:w-[760px] w-full font-medium md:text-4xl text-xl">
              Please enter your teacher`s class code in the column below to
              access your class!
            </h1>
            <div className="border-b border-[#6C757D] border-x-0 border-t-0 focus:border-[#6C757D] w-48 mt-16">
              <input
                type="text"
                placeholder="Class Code"
                className="w-full font-quick font-medium border-0 focus:ring-0"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
            </div>
            <button
              className="btn btn-outline mt-6 w-96 hover:bg-[#023E8A]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
export default SiswaAttendance;
