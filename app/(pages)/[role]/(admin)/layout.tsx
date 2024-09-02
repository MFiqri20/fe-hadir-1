"use client";
import { ReactNode, useState } from "react";
import SideBar from "./components/sideBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="h-screen w-screen font-quick flex gap-10">
      {/* <div className="flex flex-col items-center gap-5"></div> */}
      <div className="bg-[#F8F9FA]">
        <SideBar
          showModal={showModal}
          toggleModal={toggleModal}
          judul1="Dashboard"
          judul2="Userlist"
          judul3="Recap"
          judul4="Create"
          //   link={/}
        />
      </div>
      {showModal === true ? (
        <div className="ml-[182px]">{children}</div>
      ) : (
        <div className="">{children}</div>
      )}
    </div>
  );
}
