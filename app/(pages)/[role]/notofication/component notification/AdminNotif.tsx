// components/Notifikasi.js
import React from "react";
import { StarIcon, ChevronLeftIcon, BellIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const AdminNotif = () => {
  return (
    <div className="container mx-auto mt-10 p-4 font-quick">
      <Link
        href={"/guru/dashboard"}
        className="flex w-full justify-between items-center"
      >
        <ChevronLeftIcon className="w-8" />
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

          <h1 className="font-medium text-2xl">List Notification</h1>
        </div>
      </Link>

      <div className="bg-[#F8F9FA] px-6 py-12 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">38 Notifications</h2>
          <h1 className="font-medium text-xl text-[#212529]">
            1 of 10 Message
          </h1>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2">
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
                <tr key={index} className="border-t">
                  <td className="p-2">System Information</td>
                  <td className="p-2">
                    Murid bernama [Nama] sudah memasuki kelas anda...
                  </td>
                  <td className="p-2">Just now</td>
                  <td className="p-2">10:27</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center bg-[#DEE2E6] px-6 py-4 rounded-b-xl">
        <div>
          <select className="p-2 border rounded-lg">
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 border rounded-lg">1</button>
          <button className="p-2 border rounded-lg">2</button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotif;
