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
    const payload: CreateAbsenSiswaPayload = {
      kode_class: classCode,
    };

    mutate(payload);
    setIsAbsen2(true);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-screen h-full">
      <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <Image src={hadirpak} alt="hadir" />
        <div className="flex gap-10">
          <a
            href="/murid/dashboard"
            className="font-quick text-white text-base"
          >
            Dashboard
          </a>
          <a
            href="/murid/attendance"
            className="font-quick text-[#FFBC25] text-base"
          >
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
              <Image src={profile} alt="user" width={80} height={80} />
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

        {data?.data.is_absen || isAbsen2 ? (
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
              {data?.data.jam_selesai} to finish this class, and don't forget
              to pray before we begin.
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
