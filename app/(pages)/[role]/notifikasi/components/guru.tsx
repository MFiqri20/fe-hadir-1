import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const AdminNotif = () => {
  return (
    <div className="container mx-auto my-10 p-4 max-w-screen-lg font-quick">
      <div className="flex items-center justify-between">
        <Link href="/guru/dashboard" className="flex items-center">
          <ChevronLeftIcon className="w-8" />
        </Link>
        <div className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          <span className="text-2xl font-medium">List Notification</span>
        </div>
      </div>

      <div className="bg-gray-100 mt-8 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold">27 Notifications</h2>
          <span className="md:text-xl text-base text-gray-600 font-medium">1 of 3 Pages</span>
        </div>

        <div className="overflow-x-auto px-6">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-b-black">
                <th className="p-2 ">
                  <div className="flex gap-3">
                    <div className="bg-[#DEE2E6] px-3 rounded-xl">
                      <p className="font-semibold">20</p>
                    </div>
                    <p className="font-semibold">All</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(7)
                .fill("")
                .map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">System Information</td>
                    <td className="p-4 truncate">
                      Siswa bernama Muhammad sudah memasuki kelas anda...
                    </td>
                    <td className="p-4 text-right md:block hidden">Just now</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-200">
          <select className="border rounded-lg p-2">
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
          <div className="flex items-center space-x-2">
            <button className="border rounded-lg p-2">1</button>
            <button className="border rounded-lg p-2">2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotif;
