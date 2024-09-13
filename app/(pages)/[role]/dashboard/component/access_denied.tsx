/* eslint-disable react/jsx-no-undef */
import hadirpak from "/public/images/HadirPak_putih.png";
import notAccess from "/public/images/not-access1.png";
import React from "react";
import profile from "/public/images/profile.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

const AccessDeniedPage = () => {
  return (
    <>
      <main className="w-screen h-full flex flex-col items-center justify-center">
        <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
          <picture>
            <Image src={hadirpak} alt="hadir" />
          </picture>
          <div className="flex gap-10">
            <a href="/dashboard" className="font-quick text-white text-base">
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
                <a onClick={async () => await signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-32">
          <picture>
            <Image src={notAccess} alt="notAccess" className="w-[100%]" />
          </picture>
        </div>
      </main>
    </>
  );
};

export default AccessDeniedPage;
