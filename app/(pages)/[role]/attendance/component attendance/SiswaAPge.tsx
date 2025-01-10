/* eslint-disable react/no-unescaped-entities */
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
import { ClipLoader } from "react-spinners";
import Navbar from "@/component/Navbar";
import useGeolocation from "@/hook/useGeolocation";


const TARGET_LAT = -6.310255155333169;
const TARGET_LNG = 106.97099973877388;

// const TARGET_LAT = -6.493285473270789;
// const TARGET_LNG = 107.00824046761038;
const RADIUS = 100; // Dalam meter

const SiswaAttendance: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classCode, setClassCode] = useState<string>("");
  const { useProfileSiswa } = useAuthModule();
  const { data: dataSiswa } = useProfileSiswa();
  const [isAbsen2, setIsAbsen2] = useState<boolean>(false);

  const { latitude, longitude, error } = useGeolocation();

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Radius bumi dalam meter

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Jarak dalam meter
  };

  const isWithinRange =
    latitude && longitude
      ? getDistance(latitude, longitude, TARGET_LAT, TARGET_LNG) <= RADIUS
      : false;

  const handleSubmitGeo = () => {
    if (isWithinRange) {
      mutate({ kode_class: classCode });
    }
  };

  const { useCreate } = useCrudModule();
  const { mutate, isLoading } = useCreate<CreateAbsenSiswaPayload>(
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

  console.log("isabsensocket", isAbsenSocket);

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
      <Navbar
        role="murid"
        title1="Dashboard"
        title2="Attendance"
        title3="Profile"
      />

      <div className="px-10 w-full h-screen">
        <div className="w-full flex justify-between items-center">
          <div className="my-10 flex flex-col gap-3">
            <h1 className="font-quick text-3xl font-medium">
              Hi, {dataSiswa?.data.nama}
            </h1>
            <div className="flex flex-row gap-2">
              <Image src={logo} alt="user" width={35} height={35} />
              <h1 className="font-quick text-2xl">
                SMK Madinatul Quran | Student
              </h1>
            </div>
          </div>
          <div className="font-quick text-right">
            <h1 className="font-medium text-6xl">{data?.data.mapel} Class</h1>
            <p className="font-medium  text-3xl text-[#495057] mt-1">
              {data?.data.jam_mulai} - {data?.data.jam_selesai} PM{" "}
            </p>
          </div>
        </div>

        <hr className="w-full border mt-20" />

        {isAbsenSocket ? (
          <div className="w-full flex flex-col justify-center items-center text-center font-quick mt-32">
            <div className="justify-center flex">
              <span className="countdown text-[100px] font-light text-[#495057]">
                <span style={{ "--value": countdown.hours } as any}></span>:
                <span style={{ "--value": countdown.minutes } as any}></span>:
                <span style={{ "--value": countdown.seconds } as any}></span>
              </span>
            </div>
            <h1 className="w-[633px] text-2xl mt-2 font-medium my-1">
              Welcome to {data?.data.mapel} Class. You have until{" "}
              {data?.data.jam_selesai} to finish this class, and don't forget to
              pray before we begin.
            </h1>
            {/* <button className="btn w-[633px] btn-outline mt-6 hover:bg-[#023E8A] bg-[#D51919] text-white">
              Absen Out
            </button> */}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center text-center font-quick mt-32">
            <h1 className="w-[760px] font-medium text-4xl">
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
              className={`btn mt-4 w-40 ${
                !isWithinRange ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={!isWithinRange || isLoading}
            >
              {isLoading ? <ClipLoader size={20} /> : "Submit"}
            </button>

            {!isWithinRange && (
              <p className="text-red-500 mt-2">
                Anda tidak berada di lokasi yang ditentukan.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
export default SiswaAttendance;
