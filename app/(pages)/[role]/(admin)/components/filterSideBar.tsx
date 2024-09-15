"use client";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  children,
  title,
}: FilterSidebarProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close sidebar on Escape or Ctrl + Escape
      if (event.key === "Escape" || (event.key === "Escape" && event.ctrlKey)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup when the component unmounts or when `isOpen` changes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sidebarVariants = {
    open: {
      x: 0, // Slide in
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "100%", // Slide out
      opacity: 0,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className="bg-white w-80 h-full fixed right-0 top-0 z-50 p-6 shadow-lg"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="font-semibold text-xl mb-4">{title}</h2>
        {children}
      </motion.div>
    </>
  );
};

export default FilterSidebar;
