"use client";
import React, { useState } from "react";
// icons
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { RiPieChartLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import { motion, AnimatePresence } from "framer-motion";
import profile from "/public/images/jomok.png";
import Image from "next/image";

const iconList = [
  { icon: <FaAngleDoubleRight /> }, // Added the FaBars icon for the menu
];

interface ContentNav {
  judul1: string;
  judul2: string;
  judul3: string;
  judul4: string;
  logout?: string;
  link?: {
    link1: string;
    link2: string;
    link3: string;
    link4: string;
  };
  showModal: any,
  toggleModal: any,
}
const SideBar: React.FC<ContentNav> = ({
  judul1,
  judul2,
  judul3,
  judul4,
  logout,
  link,
  showModal,
  toggleModal,
}) => {
  // const [showModal, setShowModal] = useState(false);

  const navLinks = [
    { title: judul1, url: link?.link1 },
    { title: judul2, url: link?.link2 },
    { title: judul3, url: link?.link3 },
    { title: judul4, url: link?.link4 },
  ];

  const icon = [
    { icon: <CiGrid41 /> },
    { icon: <LuUsers /> },
    { icon: <RiPieChartLine /> },
    { icon: <SlCalender /> },
    // { icon: <IoSettingsOutline /> },
  ];

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  const modalVariants = {
    hidden: {
      x: "-110rem",
    },
    visible: {
      x: "-80%",
      transition: {
        type: "tween", // Set transition type to 'tween'
        duration: 0.3, // Specify duration
      },
    },
    exit: {
      x: "-100rem",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: "50%" },
    visible: {
      opacity: 1,
      x: "40rem",
      transition: {
        duration: 0.5,
        ease: "easeOut", // Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.1,
        ease: "easeOut", // Add ease-out easing function
      },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <nav className="">
      <div className="flex flex-col justify-between items-center">
        <div className="container flex flex-col items-center gap-[45px]">
          <ul className="text-white cursor-pointer h-[100px] w-[123px] bg-[#023E8A] flex items-center justify-center">
            {iconList.map((item, index) => (
              <div
                key={index}
                className="text-2xl"
                onMouseEnter={
                  index === iconList.length - 1 ? toggleModal : undefined
                }
              >
                {item.icon}
              </div>
            ))}
          </ul>
          <ul>
            <CiGrid41 className="text-3xl font-semibold" />
          </ul>
          <ul>
            <LuUsers className="text-3xl font-semibold" />
          </ul>
          <ul>
            <RiPieChartLine className="text-3xl font-semibold" />
          </ul>
          <ul>
            <SlCalender className="text-3xl font-semibold" />
          </ul>
          <ul>
            <IoSettingsOutline className="text-3xl font-semibold" />
          </ul>
        </div>
        <div className="mt-96">
          <picture>
            <Image src={profile} alt="profile" className="w-12" />
          </picture>
          <CiLogout className="text-3xl font-semibold my-4" />
        </div>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-[#F8F9FA]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              onClick={toggleModal}
              className="bg-[#023E8A] flex items-center justify-around absolute top-0 right-[1px] cursor-pointer h-[100px] w-[350px]"
            >
              <h1 className="custom text-white text-3xl font-normal">
                HadirPak
              </h1>
              <FaAngleDoubleLeft
                className="text-white font-normal"
                style={{ fontSize: "32px" }}
              />
            </motion.div>
            <motion.div
              className="relative bg-[#F8F9FA] w-full h-[55rem] mt-20"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="ml-32 h-full flex flex-col items-center justify-between">
                <div className="flex flex-col gap-[76px] items-center justify-center mt-10">
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-20">
                      {icon.map((icon, index) => (
                        <motion.span
                          key={index}
                          className="text-3xl font-semibold"
                          variants={linkItemVariants}
                        >
                          {icon.icon}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-20">
                      {navLinks.map((link, index) => (
                        <motion.span
                          key={index}
                          className="text-[#495057] text-2xl cursor-pointer font-medium"
                          variants={linkItemVariants}
                        >
                          {link.title}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.span
                  variants={linkItemVariants}
                  className="text-[#495057] text-2xl font-medium flex flex-col gap-4"
                >
                  <div className="flex gap-4 items-center">
                    <picture>
                      <Image src={profile} alt="profile" className="w-12" />
                    </picture>
                    <h1 className="">Fatin Nayhan</h1>
                  </div>
                  <div className="">
                    <button className="btn btn-outline w-full font-medium text-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4"
                      >
                        <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SideBar;
