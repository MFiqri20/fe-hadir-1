"use client";
import { signOut, useSession } from "next-auth/react";
import NavbarResponsive from "./NavbarResponsive";
import { usePathname, useRouter } from "next/navigation";
// gambar
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import hadirpak from "/public/images/HadirPak_putih.png";
import DisableStudentAccess from "/public/images/Disable Access Student.png";
import X from "/public/images/x.png";
import clsx from "clsx";

interface Component {
  title1: string;
  title2: string;
  title3: string;
  role: string;
  userData?: string;
}

const Navbar: React.FC<Component> = ({
  role,
  title1,
  title2,
  title3,
  userData,
}) => {
  const { data: session, status } = useSession();
  console.log("session:", session);
  const router = useRouter();
  const pathname = usePathname();
  const menus = [
    {
      label: `${title1}`,
      route: `/${role}/dashboard`,
    },
    {
      label: `${title2}`,
      route: `/${role}/attendance`,
    },
    {
      label: `${title3}`,
      route: `/${role}/${userData}`,
    },
  ];
  return (
    <>
      <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture className="">
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="md:flex hidden gap-10">
          {menus.map((item, index) => (
            <a
              key={index}
              className={clsx(
                "font-quick text-white text-base hover:cursor-pointer",
                {
                  "font-quick text-base text-[#FFBC25]": pathname?.includes(item.route) === false,
                }
              )}
              onClick={() => router.push(`${item.route}`)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="dropdown dropdown-end hidden md:block">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full">
              <picture>
                <Image src={profile} alt="user" width={80} height={80} />
              </picture>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                onClick={async () => {
                  await signOut();
                  router.push("login");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
        <NavbarResponsive
          judul1="Dashboard"
          judul2="Attendance"
          judul3="Userdata"
          judul4="Notification"
        />
      </div>
    </>
  );
};

export default Navbar;
