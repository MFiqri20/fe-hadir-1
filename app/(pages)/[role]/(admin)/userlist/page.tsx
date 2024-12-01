"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// icon
import { RiNotificationBadgeLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { TbFilterPlus } from "react-icons/tb";
import { FaArrowDownShortWide } from "react-icons/fa6";
// image
import profile from "/public/images/jomok.png";
import Image from "next/image";

import UserListTable from "./component/Table";
import { FunnelIcon } from "@heroicons/react/20/solid";
const UserList = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <section className="w-full pt-8">
      <div className="flex justify-between items-center mx-6">
        <h1 className="text-4xl font-medium">Userlist</h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      {/*  */}
      <hr className="w-full border border-[#D9D9D9] mt-8" />
      {/*  */}
      <div className="flex">
        <div className="mt-[59px] px-8 w-[75%]">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab
                value="one"
                label={
                  <span className="font-quick font-bold text-xl">Student</span>
                }
              />
              <Tab
                value="two"
                label={
                  <span className="font-quick font-bold text-xl">Teacher</span>
                }
              />
              <Tab
                value="three"
                label={
                  <span className="font-quick font-bold text-xl">Staff</span>
                }
              />
            </Tabs>
          </Box>
          <div className="bg-[#F8F9FA] p-4 border-y-2 border-l-2 shadow-md border-[#DEE2E6]">
            <div className="flex gap-3 justify-between">
              <label className="input border border-[#495057] rounded-md w-[568px] flex items-center gap-2">
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
                  <p className="text-[#6C757D] font-quick font-medium text-lg">
                    Filter
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between border border-[#495057] rounded-md px-4 gap-3">
                  <FaArrowDownShortWide className="text-xl text-[#212529]" />
                  <p className="text-[#6C757D] font-quick font-medium text-lg">
                    Short
                  </p>
                </div>
              </div>
            </div>
            <UserListTable />
          </div>
        </div>
        {/*  */}
        <div className="h-full w-1/4 border bg-[#F8F9FA] shadow-2xl flex items-start flex-col px-5">
          <div className="w-full flex flex-col items-center">
            <picture>
              <Image
                src={profile}
                alt="profile"
                className="w-[100px] mt-[50px]"
              />
            </picture>
            <h1 className="font-medium text-xl mt-2">Fatin Nayhan</h1>
            <h1 className="text-[#495057]">SMKMQ00010121</h1>
          </div>
          <div className="mt-12">
            <h1 className="font-semibold text-lg">About</h1>
            <h1 className="text-base">
              Lorem ipsum dolor sit amet consectetur. Dui a morbi tempor
              tristique in rutrum mattis ac neque. Maecenas vel nisi orci ipsum.
              Consequat velit vel turpis placerat ac. Lectus in sed fames
              pretium dolor tellus.
            </h1>
          </div>
          <div className="flex mt-6 justify-between w-full">
            <div className="">
              <h1 className="font-semibold text-lg mb-2">Age</h1>
              <h1>17 years old</h1>
            </div>
            <div className="">
              <h1 className="font-semibold text-lg mb-2">Class</h1>
              <h1>XII RPL</h1>
            </div>
          </div>
          <div className="flex mt-6 justify-between w-full">
            <div className="">
              <h1 className="font-semibold text-lg mb-2">Date of Birth</h1>
              <h1>03 January 2007 </h1>
            </div>
            <div className="">
              <h1 className="font-semibold text-lg mb-2">Gender</h1>
              <h1>Male</h1>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="font-semibold text-lg mb-2">Email</h1>
            <h1>nhannn@gmail.com</h1>
          </div>
          <div className="mt-6">
            <h1 className="font-semibold text-lg mb-2">NISN</h1>
            <h1>SMKMQ00010121</h1>
          </div>
          <div className="my-6">
            <h1 className="font-semibold text-lg mb-2">Address</h1>
            <h1 className="text-lg">
              123, merdeka raya street, West Java, kec. Bojongkoneng, kel.
              batulempeng 16522
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
