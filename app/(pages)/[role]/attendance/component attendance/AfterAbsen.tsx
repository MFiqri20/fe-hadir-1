"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import CopyToClipboardButton from "@/component/CopyToClipboardButton";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";

export default function AfterAbsen() {
  const { data: session, status } = useSession();
  console.log("session:", session);
  const router = useRouter();
  const textToCopy = "A78P1";
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
          <a
            href="/siswa/dashboard"
            className="font-quick text-white text-base"
          >
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
        <div className="w-full flex justify-between items-center">
          <div className="my-10 flex flex-col gap-3">
            <h1 className="font-quick text-3xl font-medium">
              Hi, Ramzi Respati
            </h1>
            <div className="flex flex-row gap-2">
              <picture>
                <Image src={logo} alt="user" width={35} height={35} />
              </picture>
              <h1 className="font-quick text-2xl">
                SMK Madinatul Quran | Student
              </h1>
            </div>
            {/* <div className="flex gap-2">
              <h1 className="font-quick text-2xl font-medium text-[#2F3E46]">
                Class code : <span className="font-semibold">{textToCopy}</span>
              </h1>
              <CopyToClipboardButton text={textToCopy} />
            </div> */}
          </div>
          <div className="font-quick text-right">
            <h1 className="font-medium text-6xl">Database Class</h1>
            <p className="font-medium  text-3xl text-[#495057] mt-1">
              07.30 - 10.00 PM{" "}
            </p>
          </div>
        </div>
        {/* ------------ dashboard --------------- */}

        <hr className="w-full border mt-20" />

        <div className="w-full flex flex-col justify-center items-center text-center font-quick mt-32">
          <div className="justify-center flex">
            <span className="countdown text-[100px] font-light text-[#495057]">
              <span style={{ "--value": hours } as any}></span>:
              <span style={{ "--value": minutes } as any}></span>:
              <span style={{ "--value": seconds } as any}></span>
            </span>
          </div>
          <h1 className="w-[633px] text-2xl font-medium my-1">
            Welcome to Database Class. You have 1 hour and 45 minutes until the
            end of the class period, and don`t forget to pray before we begin.
          </h1>
          <button className="btn w-[633px] btn-outline mt-6 hover:bg-[#023E8A] bg-[#D51919] text-white">
            Absen Out
          </button>
        </div>
      </div>
    </main>
  );
}
