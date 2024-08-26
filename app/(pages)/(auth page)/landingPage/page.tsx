"use client";
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import hadirpak from "/public/images/HadirPak_putih.png";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import img_1 from "/public/images/gambar1_crop.png";
import img_2 from "/public/images/gambar2_crop.png";
import img_3 from "/public/images/gambar3_crop.png";
import img_4 from "/public/images/gambar4_crop.png";
import Footer from "@/component/Footer";
import {
  AcademicCapIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  MapPinIcon,
  Bars3Icon
} from "@heroicons/react/20/solid";
import NavbarResponsive from "@/component/NavbarResponsive";

const LandingPage = () => {
  return (
    <main className="w-screen h-screen overflow-x-hidden font-quick">
      <div className="w-screen px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture>
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="hidden md:flex gap-20">
          <a href="" className="font-quick text-white text-base">
            Home
          </a>
          <a href="" className="font-quick text-white text-base">
            About
          </a>
          <a href="" className="font-quick text-white text-base">
            Features
          </a>
          <a href="" className="font-quick text-white text-base">
            Contact
          </a>
        </div>
        <button className="hidden md:flex font-quick border border-white rounded-md px-3 py-1 text-[16px] text-white">
          Sign Up
        </button>
        {/*  */}
        <NavbarResponsive judul1="Home" judul2="About" judul3="Futures" judul4="Contact"/>
        {/*  */}
      </div>
      {/* --------------------- navbar ------------------ */}

      <div className="overflow-x-hidden w-full h-[862px] bg-bgLanding bg-cover flex flex-col items-center justify-center text-white gap-5">
        <h1 className="font-quick md:text-5xl text-2xl text-center">
          Welcome to the online attendance app <br /> of SMK Madinatul Quran
        </h1>
        <p className="font-quick md:text-3xl text-xl">Simplicity and accuracy in one</p>
        <button className="w-[200px] font-quick font-semibold text-2xl bg-[# h-[50px] my-3 flex items-center border border-white hover:border-none justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#023E8A] before:to-[#0077B6] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
          Get started
        </button>
      </div>
      {/*  */}

      <div className="w-full h-[746px] bg-[#F8F9FA] flex md:flex-row flex-col items-center justify-evenly">
        <div className="">
          <picture>
            <Image src={img_1} alt="lektop" className="w-96 md:w-[100%]"/>
          </picture>
        </div>
        <div className="flex flex-col items-center gap-6 w-[558px] md:px-0 px-10">
          <h1 className="text-[#0077B6] font-medium md:text-[50px] text-5xl mb-5 md:mb-0 font-quick">
            About us
          </h1>
          <p className="font-quick md:text-2xl text-lg text-center text-[#212529]">
            SMK attendance system is a digital platform that monitors and
            manages student attendance in real-time using technologies such as
            mobile applications and barcode scanning. The system automatically
            stores attendance data, generates reports, and provides teacher
            absence notifications.
          </p>
        </div>
      </div>
      {/*  */}

      <div className="flex md:flex-row flex-col-reverse items-center justify-evenly md:mt-56 mt-20 mb-[133px]">
        <div className="flex flex-col gap-6">
          <h1 className="text-[#0077B6] font-medium md:text-[50px] text-4xl md:mt-0 mt-20 font-quick text-center">
            Real-time attendance
          </h1>
          <p className="font-quick md:text-2xl text-xl text-center text-[#212529] md:text-right">
            Make real-time attendance simple <br /> for users on the device they
            are <br /> using.
          </p>
        </div>
        <div className="">
          <picture>
            <Image src={img_2} alt="lektop" className="w-96 md:w-[100%]"/>
          </picture>
        </div>
      </div>
      {/*  */}

      <div className="w-full h-[746px] bg-[#F8F9FA] flex md:flex-row flex-col items-center justify-evenly">
        <div className="">
          <picture>
            <Image src={img_3} alt="lektop" className="w-96 md:w-[40rem]"/>
          </picture>
        </div>
        <div className="flex flex-col gap-6 items-center w-[639px]">
          <h1 className="text-[#0077B6] font-medium md:text-[50px] text-5xl mb-5 md:mb-0 font-quick">
            Notify you
          </h1>
          <p className="font-quick md:text-2xl text-xl text-center text-[#212529] md:text-right">
            We will do our best to keep you informed <br /> about your
            attendance, any absences, and <br /> tardiness.
          </p>
        </div>
      </div>
      {/*  */}

      <div className="flex md:flex-row flex-col-reverse items-center justify-evenly md:mt-56 mt-20 mb-[133px]">
        <div className="flex flex-col gap-6">
          <h1 className="text-[#0077B6] font-medium md:text-[50px] text-5xl md:mt-0 mt-20 font-quick">
            Automatic report
          </h1>
          <p className="font-quick md:text-2xl text-lg text-center text-[#212529] md:text-right">
            No need to worry! The attendance <br /> report will be generated{" "}
            <br /> automatically.
          </p>
        </div>
        <div className="">
          <picture>
            <Image src={img_4} alt="lektop" className="w-96 md:w-[40rem]"/>
          </picture>
        </div>
      </div>
      {/*  */}

      <div className="w-full h-[711px] bg-[#F8F9FA] flex flex-col md:px-0 px-5 gap-12 items-center justify-center">
        <h1 className="font-quick text-[#0077B6] md:text-[50px] text-[24px] text-center font-medium">
          “This is a great tool for students, and it`s <br /> also perfect for
          taking attendance!”
        </h1>
        <div className="flex gap-3 items-center">
          <picture>
            <Image src={profile} alt="profile" className="w-12 md:w-[60px]"/>
          </picture>
          <div className="">
            <p className="font-quick font-medium md:text-xl text-base">
              Ramzi Respati Putra Yulianto
            </p>
            <p className="font-quick md:text-lg text-sm text-[#495057]">
              XII Software Engineering
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <Footer />
    </main>
  );
};

export default LandingPage;
