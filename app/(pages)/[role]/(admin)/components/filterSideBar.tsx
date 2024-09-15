"use client";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onClear: () => void;
  children: ReactNode;
  title: string;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  children,
  onSubmit,
  onClear,
  title,
}: FilterSidebarProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || (event.key === "Escape" && event.ctrlKey)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  const handleApplyFilter = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
    onClose();
  };

  return (
    <>
      <motion.div
        className="bg-white w-80 h-full fixed right-0 top-0 z-50 p-6 shadow-lg"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-semibold"
        >
          &times;
        </button>

        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-semibold text-xl mb-4">{title}</h2>
            {children}
            <button
              onClick={handleApplyFilter}
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Applying...' : 'Apply Filter'}
            </button>
          </div>
          <div>
            Press
            <kbd className="kbd kbd-sm mx-2">esc</kbd>
            to close
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterSidebar;
