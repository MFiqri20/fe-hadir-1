"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaCalendarAlt,
  FaCaretDown,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import Dropdown from "./dropdown"; // Ensure the correct path to Dropdown

const Sidebar = ({
  onHoverChange,
}: {
  onHoverChange: (isHovered: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
      width: "4rem", // Initial width for icons only
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      width: "16rem", // Expanded width on hover
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
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
        className={`text-2xl px-4 font-bold mb-8 flex items-center justify-center transition-colors duration-200`}
      >
        <span>H</span>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            adirPak
          </motion.span>
        )}
      </div>
      <div className="flex flex-col w-full h-full justify-between">
        <div className="w-full">
          <div className="flex flex-col space-y-3 w-full">
            <SidebarItem
              icon={<FaHome width={24} height={24} />}
              text="Home"
              isHovered={isHovered}
              url="/dashboard"
            />
            <SidebarItem
              icon={<FaUser width={24} height={24} />}
              text="Users"
              isHovered={isHovered}
              url="/dashboard"
            />
            <Dropdown
              icon={<FaChartBar width={24} height={24} />}
              iconsDrop={[
                <CiUser width={24} height={24} key={"student"} />,
                <CiUser width={24} height={24} key={"Teacher"} />,
                <CiUser width={24} height={24} key={"student"} />,
              ]}
              title="Recap"
              options={["Student", "Teacher", "Staff"]}
              urls={["", "", ""]}
              isCollapsed={!isHovered}
            />
          </div>
          <div className="h-[1px] w-full bg-gray-200 my-4"></div>
          <div className="w-full flex flex-col space-y-3">
            <SidebarItem
              icon={<FaChartBar width={24} height={24} />}
              text="Mapel"
              isHovered={isHovered}
              url="/dashboard"
            />
            <SidebarItem
              icon={<FaCalendarAlt width={24} height={24} />}
              text="Schedule"
              isHovered={isHovered}
              url="jadwal"
            />
            <SidebarItem
              icon={<FaCalendarAlt width={24} height={24} />}
              text="Class"
              isHovered={isHovered}
              url="kelas"
            />
            <SidebarItem
              icon={<FaCalendarAlt width={24} height={24} />}
              text="Teacher"
              isHovered={isHovered}
              url="kelas"
            />
            <SidebarItem
              icon={<FaCalendarAlt width={24} height={24} />}
              text="Staf"
              isHovered={isHovered}
              url="kelas"
            />
            <SidebarItem
              icon={<FaCalendarAlt width={24} height={24} />}
              text="Student"
              isHovered={isHovered}
              url="kelas"
            />
          </div>
          <div className="h-[1px] w-full bg-gray-200 my-4"></div>
        </div>
        <div className="w-full flex flex-col space-y-3">
          <SidebarItem
            icon={<FaChartBar width={24} height={24} />}
            text="Logout"
            isHovered={isHovered}
            url="/dashboard"
          />
          <SidebarItem
            icon={<FaCalendarAlt width={24} height={24} />}
            text="Profile"
            isHovered={isHovered}
            url="jadwal"
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
}: {
  icon: JSX.Element;
  text: string;
  isHovered: boolean;
  url: string;
}) => {
  const router = useRouter();

  return (
    <motion.a
      type="button"
      onClick={() => router.push(url)}
      className={`cursor-pointer flex items-center h-8 px-4 py-6 text-lg text-gray-700 hover:bg-gray-200 rounded transition-colors duration-200`}
      whileHover={{ scale: 1.0, originX: 0 }} // Hover animation
    >
      <span className="mr-5">{icon}</span>
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      )}
    </motion.a>
  );
};

export default Sidebar;
