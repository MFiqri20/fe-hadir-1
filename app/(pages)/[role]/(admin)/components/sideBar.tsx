"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaCalendarAlt,
  FaCaretDown,
  FaUserTie,
  FaUserGraduate,
  FaUserCog,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { useRouter } from "next/navigation";
import { CiLogout, CiUser } from "react-icons/ci";
import Dropdown from "./dropdown"; // Ensure the correct path to Dropdown
import { MdOutlinePlayLesson } from "react-icons/md";
import { signOut } from "next-auth/react";
import { FaRegCircleUser } from "react-icons/fa6";
import Image from "next/image";
import profil from "/public/images/profile.png";

const Sidebar = ({
  onHoverChange,
  setCurrentPath,
}: {
  onHoverChange: (isHovered: boolean) => void;
  setCurrentPath: (path: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  const sidebarVariants = {
    hidden: {
      width: "4.5rem", // Initial width for icons only
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      width: "15rem", // Expanded width on hover
      opacity: 1,
      
    },
  };

  return (
    <motion.div
      className="bg-white shadow-lg sticky h-screen py-5 px-2 flex flex-col items-start border-r border-gray-200"
      variants={sidebarVariants}
      initial="hidden" // Set initial state
      animate={isHovered ? "visible" : "hidden"}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div
        className={`text-3xl px-4 font-bold mb-6 mt-[2px] flex items-center justify-center transition-colors duration-150`}
      >
        <span>H</span>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            adirPak
          </motion.span>
        )}
      </div>
      <div className="flex flex-col w-full h-full justify-between">
        <div className="w-full">
          <div className="flex flex-col space-y-3 w-full">
            <SidebarItem
              icon={<FaHome width={32} height={32} />}
              text="Home"
              isHovered={isHovered}
              url="/admin"
            />
            <SidebarItem
              icon={<FaUser width={32} height={32} />}
              text="Users"
              isHovered={isHovered}
              url="/admin/users"
            />
            <Dropdown
              icon={<FaChartBar width={32} height={32} />}
              iconsDrop={[
                <CiUser width={32} height={32} strokeWidth={1.5} key={"student"} />,
                <CiUser width={32} height={32} key={"teacher"} />,
                <CiUser width={32} height={32} key={"staff"} />,
              ]}
              title="Recap"
              options={["Student", "Teacher", "Staff"]}
              urls={[
                "/admin/recap/student",
                "/admin/recap/teacher",
                "/admin/recap/staff",
              ]}
              isCollapsed={!isHovered}
            />
          </div>
          <div className="h-[1px] w-full bg-gray-200 my-4"></div>
          <div className="w-full flex flex-col space-y-3">
            <SidebarItem
              icon={<MdOutlinePlayLesson width={32} height={32} />}
              text="Mapel"
              isHovered={isHovered}
              url="/admin/mapel"
            />
            <SidebarItem
              icon={<FaCalendarAlt width={32} height={32} />}
              text="Schedule"
              isHovered={isHovered}
              url="/admin/jadwal"
            />
            <SidebarItem
              icon={
                <SiGoogleclassroom width={32} strokeWidth={1.2} height={32} />
              }
              text="Class"
              isHovered={isHovered}
              url="/"
            />
            <SidebarItem
              icon={<FaUserTie width={32} height={32} />}
              text="Teacher"
              isHovered={isHovered}
              url="/admin/guru"
            />
            <SidebarItem
              icon={<FaUserCog width={32} height={32} />}
              text="Staf"
              isHovered={isHovered}
              url="/"
            />
            <SidebarItem
              icon={<FaUserGraduate width={32} height={32} />}
              text="Student"
              isHovered={isHovered}
              url="/"
            />
            {/* Add other SidebarItems here */}
          </div>
          <div className="h-[1px] w-full bg-gray-200 my-4"></div>
        </div>
        <div className="w-full flex flex-col space-y-3">
          <SidebarItem
            icon={
              <div className="relative w-8 h-8">
                {" "}
                {/* Tetapkan ukuran eksplisit */}
                <Image
                  src={profil}
                  alt="user"
                  layout="fill"
                  objectFit="cover"
                />{" "}
                {/* Atur gambar agar mengisi container */}
              </div>
            }
            text="Fatin nayhan"
            isHovered={isHovered}
            url="/admin/profile"
          />

          <SidebarItem
            icon={<CiLogout strokeWidth={1.3} width={38} height={38} />}
            text="Logout"
            isHovered={isHovered}
            url=""
            style={`${
              isHovered ? "border border-black hover:border-red-500" : "" // border hanya muncul ketika sidebar diperluas
            } hover:text-red-500 hover:bg-white`}
            onClick={async () => await signOut()}
          />
        </div>
      </div>
    </motion.div>
  );
};

const SidebarItem = ({
  icon,
  text,
  isHovered,
  url,
  style,
  onClick,
}: {
  style?: string;
  icon: JSX.Element;
  text: string;
  isHovered: boolean;
  url: string;
  onClick?: () => void;
}) => {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          router.push(url);
        }
      }}
      className={`cursor-pointer flex items-center h-8 px-4 py-6 text-xl font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors duration-150 ${
        style || ""
      }`}
      whileHover={{ scale: 1.0, originX: 0 }}
    >
      <span className="mr-5">{icon}</span>
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="whitespace-nowrap" // Tambahkan kelas ini
        >
          {text}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Sidebar;
