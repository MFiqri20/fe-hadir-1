"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { RiNotificationBadgeLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { TbFilterPlus } from "react-icons/tb";
import { FaArrowDownShortWide } from "react-icons/fa6";
import useCrudModule, { PaginationParams } from "@/hook/useCRUD";
import { UserlistReponse } from "@/app/lib/(auth)/interface/interface";
import Pagination from "@/component/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

const UserList = () => {
  const [value, setValue] = React.useState("all");
  const defaultParams: PaginationParams = {
    page: 1,
    pageSize: 10,
    role: value, // default role is empty, which means "all"
    nama: "",
  };

  const { useListPagination } = useCrudModule();
  const {
    data,
    isFetching,
    isLoading,
    handleSearch,
    handleChange,
    handleClear,
    handlePage,
    handlePageSize,
    keyword,
    params,
    handleRole,
    setParams,
    handleFilter,
    handleKeyword,
  } = useListPagination<UserlistReponse>(
    "auth/user-list",
    defaultParams,
    30000
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleRole(newValue); // Panggil handleRole saat tab berubah
  };

  return (
    <section className="w-full pt-8">
      <div className="flex justify-between items-center mx-6">
        <h1 className="text-4xl font-medium">Userlist</h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      <hr className="w-full border border-[#D9D9D9] mt-8" />
      <div className="flex">
        <div className="mt-[59px] px-8 w-[75%]">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              textColor="primary"
              indicatorColor="primary"
              aria-label="role tabs"
            >
              <Tab
                value=""
                label={
                  <span className="font-quick font-bold text-xl">All</span>
                }
              />
              <Tab
                value="murid"
                label={
                  <span className="font-quick font-bold text-xl">Student</span>
                }
              />
              <Tab
                value="guru"
                label={
                  <span className="font-quick font-bold text-xl">Teacher</span>
                }
              />
              <Tab
                value="staf"
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
                  onChange={(e) =>
                    setParams((prev) => ({ ...prev, nama: e.target.value }))
                  }
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
            {isLoading || isFetching ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : data?.data.length === 0 ? (
              <p className="text-center text-xl mt-4">Data tidak ditemukan</p>
            ) : (
              <div className="container mx-auto mt-6">
                <div className="relative overflow-x-auto sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-lg text-gray-700 uppercase border-y-2 border-[#D9D9D9]">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Avatar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data.map((user, index) => (
                        <tr
                          key={index}
                          className="border-b-2 border-[#D9D9D9] hover:bg-gray-50"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-semibold text-lg whitespace-nowrap"
                          >
                            {user.id}
                          </th>
                          <td className="px-6 py-4 font-semibold text-lg">
                            {user.nama}
                          </td>
                          <td className="px-6 py-4 font-semibold text-lg">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 font-semibold text-lg">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={
                                  user.avatar ||
                                  ""
                                } // URL or path to the user avatar
                                alt="User Avatar"
                                width={48} // Adjust size as needed
                                height={48} // Adjust size as needed
                                className="object-cover"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <Pagination
            page={data?.pagination.page || 0}
            pageSize={data?.pagination.pageSize || 0}
            totalPages={data?.pagination.total_page || 0}
            totalResults={data?.pagination.total || 0}
            isFetching={isFetching}
            current_data={data?.data.length || 0}
            handlePage={handlePage}
            handlePageSize={handlePageSize}
          />
        </div>
      </div>
    </section>
  );
};

export default UserList;
