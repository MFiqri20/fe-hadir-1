import React from "react";
import Image from "next/image";
import profilePic from "/public/images/profile.png"; // Update this path as needed
import profileBg from "/public/images/bg_profile.png"; // Update this path as needed
import { UserCircleIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Profile: React.FC = () => {
  return (
    <main className="w-screen h-full font-quick overflow-x-hidden">
      <div className="w-full flex flex-col items">
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full h-[360px]">
            <Image
              src={profileBg} // Update this path as needed
              alt="cover"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="relative w-[250px] h-[250px] rounded-full border-4 border-white mt-[-8rem]">
            <Image
              src={profilePic}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
        <Link href={"/"} className="flex gap-2 mx-8">
          <ChevronLeftIcon className="w-8" />
          <h1 className="text-3xl font-semibold">My Profile</h1>
        </Link>
      </div>
      <div className="mx-8 font-quick mt-11">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="col-span-1 md:col-span-2 md:col-end-3 flex items-center">
            <UserCircleIcon className="w-9" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
          <hr className="w-full border border-[#6C757D] md:col-span-2" />
          <div>
            <label className="font-medium text-lg text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="Ramzi Respati"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="ramzirespat138@gmail.com"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="**********"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="+62 857-9747-6757"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">Role</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="Student"
              disabled
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">NISN</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="SMKMQ0001"
              disabled
            />
          </div>
          {/* Address Information */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold">My Address</h2>
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">Country</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="Indonesia"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="16114"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">
              City/State
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="Depok"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-gray-700">
              Additional
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              defaultValue="123, merdeka raya street"
            />
          </div>
        </form>
      </div>
      <div className="md:flex hidden h-[120px] gap-4 bg-[#023E8A] justify-end px-8 py-9 mt-[87px]">
        <button className="btn btn-outline text-white border-white text-base">
          Default
        </button>
        <button className="btn btn-outline text-white border-white text-base">
          Save Changes
        </button>
      </div>
      <button className="mb-5 mr-5 ml-4 rounded-b-3xl flex w-full items-center text-white font-semibold text-xl h-[70px] gap-4 bg-[#023E8A] justify-center px-8 py-9 mt-[87px]">
        Save Change
      </button>
    </main>
  );
};

export default Profile;
