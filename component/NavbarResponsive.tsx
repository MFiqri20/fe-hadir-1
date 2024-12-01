"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const iconList = [
  { icon: <FaBars /> }, // Added the FaBars icon for the menu
];

interface ContentNav {
  judul1: string;
  judul2: string;
  judul3: string;
  judul4?: string;
  logout?: string;
}

const NavbarResponsive: React.FC<ContentNav> = ({
  judul1,
  judul2,
  judul3,
  judul4,
  logout,
}) => {
  const [showModal, setShowModal] = useState(false);

  const navLinks = [
    { title: judul1, url: "#" },
    { title: judul2, url: "#" },
    { title: judul3, url: "#" },
    { title: judul4, url: "#" },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const modalVariants = {
    hidden: {
      x: "100vh",
    },
    visible: {
      x: "10rem",
      transition: {
        type: "tween", // Set transition type to 'tween'
        duration: 0.3, // Specify duration
      },
    },
    exit: {
      x: "100vh",
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
      x: "-10rem",
      transition: {
        duration: 0.5,
        ease: "easeOut", // Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      x: "50%",
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
    <nav className="py-4 px-4 md:hidden block">
      <div className="container mx-auto flex justify-between items-center ">
        <ul className="flex text-white gap-6 items-center cursor-pointer">
          {iconList.map((item, index) => (
            <div
              key={index}
              className="text-2xl"
              onClick={index === iconList.length - 1 ? toggleModal : undefined}
            >
              {item.icon}
            </div>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-[#023E8A]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/*  */}
            <motion.div
              className="relative bg-[#023E8A] w-full"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col space-y-10 items-center ml-32 h-full ">
                {navLinks.map((link, index) => (
                  <motion.span
                    key={index}
                    className="text-white font-light text-2xl cursor-pointer"
                    variants={linkItemVariants}
                  >
                    {link.title}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            {/*  */}
            <motion.div
              onClick={toggleModal}
              className="absolute bottom-0 flex py-[15px] px-4 text-white cursor-pointer bg-[#D9D9D9] w-full h-[65px]"
            >
              <ChevronLeftIcon className="text-xl text-black" />
              <h1 className="text-2xl text-[#212529]">Back</h1>
            </motion.div>
            {/*  */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarResponsive;
