"use client";
// icon
import { RiNotificationBadgeLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { TbFilterPlus } from "react-icons/tb";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TableWeekly from "./component/TableRecap";
import TableMonthly from "./component/TableMonthly";
import TableSemester from "./component/TableSemester";
import { useState } from "react";

const Recap = () => {
  const [selectedOption, setSelectedOption] = useState("Weekly");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <section className="w-full pt-8">
      <div className="flex justify-between items-center mx-6">
        <h1 className="text-4xl font-medium">
          {" "}
          <span className="text-[#0077B6]">Recap</span> | Student
        </h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      {/*  */}
      <hr className="w-full border border-[#D9D9D9] mt-8" />
      {/*  */}
      <div className="px-8 my-10">
        {/*  */}
        <div className="flex gap-3 justif">
          <label className="input border border-[#495057] rounded-md w-full flex items-center gap-2">
            <FiSearch className="text-xl" />
            <input
              type="text"
              className="grow focus:ring-0 border-0"
              placeholder="Search for Student, Teacher"
            />
          </label>
          <div className="flex gap-4">
            <div className="flex flex-row items-center justify-between border border-[#495057] rounded-md px-4 gap-3">
              <TbFilterPlus className="text-xl text-[#212529]" />
            </div>
            <div className="flex flex-row items-center justify-between border border-[#495057] rounded-md px-4 gap-3">
              <FaArrowDownShortWide className="text-xl text-[#212529]" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className=" flex flex-col mt-6">
          <div className="flex justify-between mb-4">
            <div className="">
              <h1 className="font-medium text-2xl">{selectedOption} Recap</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex font-quick font-semibold m-1 text-lg cursor-pointer"
                >
                  <ChevronDownIcon className="w-5 mr-2" />
                  {selectedOption}
                </div>
                {isOpen && (
                  <ul className="absolute top-full left-0 dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
                    {["Weekly", "Monthly", "Semester"].map((option) => (
                      <li key={option}>
                        <a
                          onClick={() => handleSelectChange(option)}
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          {option}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {selectedOption === "Weekly" && <TableWeekly />}
          {selectedOption === "Monthly" && <TableMonthly />}
          {selectedOption === "Semester" && <TableSemester />}
        </div>
      </div>
    </section>
  );
};

export default Recap;
