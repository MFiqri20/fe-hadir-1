// components/Notifikasi.js
import React from "react";
import { StarIcon, ChevronLeftIcon, BellIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const SiswaNotif = () => {
  return (
    <div className="container mx-auto mt-10 p-4 font-quick">
      <Link href={"/siswa/dashboard"} className="flex w-full justify-between items-center">
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

          <h1 className="font-medium md:text-2xl text-lg">List Notification</h1>
        </div>
      </Link>
      <div className="flex justify-between items-center bg-[#DEE2E6] px-6 py-4 rounded-t-xl mt-20">
        <div className="flex gap-8 items-center">
          <input
            type="checkbox"
            className="w-6 h-6 border-[#363538] rounded-lg"
          />
          <button className="">
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
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </button>
          <button className="">
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
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </button>
          <button className="">
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <button className="">
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
        <button>
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </div>

      <div className="bg-[#F8F9FA] px-6 py-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">38 Notifications</h2>
          <label className="input input-bordered flex items-center gap-2 bg-[#DEE2E6] border-none w-[543px] rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow border-none focus:ring-0"
              placeholder="Search Something?"
            />
          </label>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th className="p-2">
                <div className="flex gap-3">
                  <div className="bg-[#DEE2E6] px-3 rounded-xl">
                    <p className="font-semibold">20</p>
                  </div>
                  <p className="font-semibold">All</p>
                </div>
              </th>
              <th className="p-2">
                <div className="flex gap-3">
                  <div className="bg-[#0077B6] px-3 rounded-xl">
                    <p className="font-semibold text-white">17</p>
                  </div>
                  <p className="font-semibold">Archive</p>
                </div>
              </th>
              <th className="p-2">
                <div className="flex gap-3">
                  <div className="bg-[#023E8A] px-3 rounded-xl">
                    <p className="font-semibold text-white">4</p>
                  </div>
                  <p className="font-semibold">Favorite</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(7)
              .fill("")
              .map((_, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
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
        <h1 className="font-medium text-[#212529]">1 of 10 Message</h1>
        <div className="flex space-x-2">
          <button className="p-2 border rounded-lg">1</button>
          <button className="p-2 border rounded-lg">2</button>
        </div>
      </div>
    </div>
  );
};

export default SiswaNotif;