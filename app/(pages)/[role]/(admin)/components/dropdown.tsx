"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FaCaretDown, FaCaretUp, FaChartBar } from "react-icons/fa"; // Import arrow icons
import { useRouter } from "next/navigation";

interface DropdownProps {
  title: string;
  urls: string[]; // Array of URLs
  icon: JSX.Element;
  options: string[];
  isCollapsed: boolean;
  iconsDrop: JSX.Element[];
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  urls,
  isCollapsed,
  iconsDrop,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOptionClick = (index: number) => {
    if (urls[index]) {
      router.push(urls[index]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full cursor-pointer flex items-center h-8 px-4 py-6 text-lg text-gray-700 hover:bg-gray-200 rounded transition-colors duration-150"
        id="options-menu"
      >
        {isCollapsed ? (
          <span className="">{icon}</span>
        ) : (
          <motion.div
            className="flex items-center w-full"
            whileHover={{ scale: 1.0 }} // Apply scale to the whole button
          >
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row items-center">
                <span className="mr-5">{icon}</span>
                <motion.span
                className="text-xl font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {title}
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isOpen ? <FaCaretUp /> : <FaCaretDown />}
              </motion.span>
            </div>
          </motion.div>
        )}
      </button>

      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10, x: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={clsx("w-full bg-white", {
            block: isOpen,
            hidden: !isOpen,
          })}
        >
          <div className="py-1 w-full">
            {options.map((option, index) => (
              <div className="flex flex-row w-full" key={index}>
                <a
                  key={index}
                  href="#"
                  onClick={() => handleOptionClick(index)}
                  className={`cursor-pointer w-full flex items-center h-8 px-4 py-6 text-xl font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors duration-150`}
                >
                  <span className="mr-5">{iconsDrop[index]}</span>
                  {option}
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
