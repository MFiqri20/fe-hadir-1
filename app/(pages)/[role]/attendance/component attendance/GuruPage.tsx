"use client";
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import {
  AcademicCapIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import DisableStudentAccess from "/public/images/Disable Access Student.png";
import X from "/public/images/x.png";
import CopyToClipboardButton from "@/component/CopyToClipboardButton";
import Footer from "@/component/Footer";
import useCrudModule from "@/hook/useCRUD";
import {
  AbsenKeluarPayload,
  DataJadwalHariIniResponse,
  DetailAbsenKelasIResponse,
} from "@/app/lib/(absen)";
import useAuthModule from "@/app/lib/(auth)/lib";
import useCountdown from "@/hook/useCountdown";
import InputFieldAuth from "@/component/InputTextAuth";
import InputField from "@/component/InputText";
import Label from "@/component/Label";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import CopyInput from "@/component/inputCopy";
import NavbarResponsive from "@/component/NavbarResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUser } from "@fortawesome/free-solid-svg-icons";

export const jrunalSchema = yup.object().shape({
  materi: yup.string().nullable().default("").required("Wajib isi"),
  kendala: yup.string().nullable().default("").optional(),
});

const AdminAttendance: React.FC = () => {
  const { data: session, status } = useSession();
  console.log("session:", session);
  const router = useRouter();

  const { useList } = useCrudModule();
  const { useProfileGuru } = useAuthModule();
  const { data: dataguru } = useProfileGuru();

  console.log(dataguru?.data.jadwal_detail_id);

  const { data } = useList<DetailAbsenKelasIResponse>(
    `/absen/detail-kelas-absen/${dataguru?.data.jadwal_detail_id}`
  );

  const { data: dataGuru, isFetching } =
    useCrudModule().useList<DataJadwalHariIniResponse>("/jadwal/hari-ini-guru");

  const { mutate, isLoading } = useCrudModule().useCreate(
    `/absen/keluar-kelas/${dataGuru?.data.jamDetailId}`,
    "/jadwal/hari-ini-guru"
  );
  const formik = useFormik<AbsenKeluarPayload>({
    initialValues: jrunalSchema.getDefault(),
    validationSchema: jrunalSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      console.log("pay: ", payload);
      router.push("/guru/dashboard");
    },
  });

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate the remaining time until jam_selesai
  useEffect(() => {
    if (data?.data) {
      const { jam_mulai, jam_selesai } = data.data;

      const updateCountdown = () => {
        const now: any = new Date();
        const [endHour, endMinute] = jam_selesai.split(":").map(Number);

        const endTime: any = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          endHour,
          endMinute
        );

        const timeDiffEnd = endTime - now;
        const totalSecondsEnd = Math.floor(timeDiffEnd / 1000);
        const hoursEnd = Math.floor(totalSecondsEnd / 3600);
        const minutesEnd = Math.floor((totalSecondsEnd % 3600) / 60);
        const secondsEnd = totalSecondsEnd % 60;

        setCountdown({
          hours: hoursEnd,
          minutes: minutesEnd,
          seconds: secondsEnd,
        });
      };

      updateCountdown(); // Initial call
      const interval = setInterval(updateCountdown, 1000); // Update countdown every second

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [data]);

  const textToCopy: any = data?.data.kode_kelas;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login"); // Redirect to login if no session
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Optionally render a loading state while checking session
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;
  return (
    <main className="w-screen h-fit">
      <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture className="">
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="md:flex hidden gap-10">
          <a href="/guru/dashboard" className="font-quick text-white text-base">
            Dashboard
          </a>
          <button className="font-quick  text-base text-[#FFBC25]">
            Attendance
          </button>
          <a href="" className="font-quick text-white text-base">
            Userdata
          </a>
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

      {/* --------------- end navbar ---------------- */}
      {/* {!dataGuru?.data.is_masuk_kelas ? (
        <div className="w-screen h-screen bg-slate-800">
          <Image
            className="bg-slate-800 w-screen h-fit"
            src={DisableStudentAccess}
            alt="gatau"
          />
        </div>
      ) : (
      )} */}
      <section>
        <div className="px-5 md:px-8 w-screen h-screen overflow-x-hidden">
          <div className="flex md:flex-row flex-col md:justify-between w-full items-center">
            <div className="my-10 flex flex-col gap-3">
              <div className="flex w-screen px-8 md:px-0 md:w-full justify-between items-center">
                <div className="flex flex-col gap-3">
                  <h1 className="font-quick text-2xl md:text-3xl font-medium">
                    Hi, {dataguru?.data.nama}
                  </h1>
                  <div className="flex flex-row gap-2">
                    <picture>
                      <Image src={logo} alt="user" width={35} height={35} />
                    </picture>
                    <h1 className="font-quick text-lg md:text-3xl">
                      SMK Madinatul Quran | Teacher
                    </h1>
                  </div>
                </div>
                <picture>
                  <Image src={profile} alt="user" className="md:hidden w-12" />
                </picture>
              </div>
              <hr className="w- border border-[#6C757D] mt-5 md:hidden mx-8 " />
              <div className="md:flex hidden gap-2 items-center">
                <h1 className="font-quick text-2xl font-medium text-[#2F3E46]">
                  Class code :{" "}
                  <span className="font-semibold">{textToCopy}</span>
                </h1>
                <CopyInput value={textToCopy} />
              </div>
            </div>
            <div className="w-full md:w-auto md:block flex flex-col items-end">
              <h1 className="font-quick font-medium md:text-[60px] text-[38px]">
                Database Class
              </h1>
              <h1 className="font-quick font-medium md:text-3xl text-[28px] text-[#495057] text-right">
                07.30 - 10.00 PM{" "}
              </h1>
              <div className="md:hidden flex gap-2 items-center">
                <h1 className="font-quick text-2xl font-medium text-[#2F3E46]">
                  Class code :{" "}
                  <span className="font-semibold">{textToCopy}</span>
                </h1>
                <CopyInput value={textToCopy} />
              </div>
            </div>
          </div>
          {/* ------------ dashboard --------------- */}

          <div className="">
            <p className="font-quick text-lg text-[#495057] my-1">Overview</p>
            <div className="w-full border"></div>
          </div>

          <div className="w-full flex flex-col bg-gray-100 rounded-md my-5">
            <div className="my-8 mx-6">
              <div className="flex md:flex-row flex-col justify-between">
                <div className="flex flex-row gap-3">
                  <div className="px-2 h-16 bg-[#023E8A] rounded-full flex items-center justify-center">
                    <AcademicCapIcon className="text-white w-[40px] md:w-[50px] h-[50px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-quick text-2xl md:text-3xl font-medium">
                      Today, 27 July 2024
                    </h1>
                    <p className="font-quick text-sm md:text-md">
                      This will show daily data in real-time
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-12 mt-10 md:mt-0">
                  <div className="border border-gray-500 rounded-md px-3 py-3">
                    <div className="flex flex-row justify-between md:gap-10">
                      <p className="text-[16px] md:text-base">Students</p>
                      <UsersIcon className="w-6 md:w-5 md:h-5 text-gray-500" />
                    </div>
                    <h1 className="font-quick font-medium text-3xl pt-3">22</h1>
                  </div>
                  <div className="border border-gray-500 rounded-md px-3 py-3">
                    <div className="flex flex-row justify-between md:gap-10">
                      <p className="text-[16px] md:text-base">Attendace</p>
                      <UsersIcon className="w-6 md:w-5 md:h-5 text-green-400" />
                    </div>
                    <h1 className="font-quick font-medium text-3xl pt-3">20</h1>
                  </div>
                  <div className="border border-gray-500 rounded-md px-3 py-3">
                    <div className="flex flex-row justify-between md:gap-10">
                      <p className="text-[16px] md:text-base">Absent</p>
                      <UsersIcon className="w-6 md:w-5 md:h-5 text-red-500" />
                    </div>
                    <h1 className="font-quick font-medium text-3xl pt-3">1</h1>
                  </div>
                  <div className="border border-gray-500 rounded-md px-3 py-3">
                    <div className="flex flex-row justify-between md:gap-10">
                      <p className="text-[16px] md:text-base">Permission</p>
                      <UsersIcon className="w-6 md:w-5 md:h-5 text-blue-500" />
                    </div>
                    <h1 className="font-quick font-medium text-3xl pt-3">1</h1>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="w-full border bordergra my-7"></div>
              {/*  */}
              <div className="flex flex-col gap-2">
                <h1 className="font-quick font-medium text-2xl ">
                  Students Attendace
                </h1>
                <p className="font-quick text-sm md:text-base font-medium text-[#ADB5BD]">
                  keep track students attendace on a daily basis.
                </p>
              </div>
              {/*  */}
              <div className="md:hidden flex gap-3 mt-3 justify-evenly">
                <div className="border rounded-lg border-black px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4"
                  >
                    <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
                  </svg>
                </div>
                <div className="border rounded-lg border-black px-4 py-3">
                  <UsersIcon className="w-5 md:w-5 md:h-5 text-green-400" />
                </div>
                <div className="border rounded-lg border-black px-4 py-3">
                  <UsersIcon className="w-5 md:w-5 md:h-5 text-red-500" />
                </div>
                <div className="border rounded-lg border-black px-4 py-3">
                  <UsersIcon className="w-5 md:w-5 md:h-5 text-blue-500" />
                </div>
                <div className="border rounded-lg border-black px-4 py-3">
                  <FunnelIcon className="w-5 text-[#212529]" />
                </div>
              </div>
              {/*  */}
              <div className="hidden md:flex flex-row justify-between w-full my-7">
                <div className="flex gap-5">
                  <div className="rounded-md px-7 py-4 bg-[#023E8A]">
                    <h1 className="font-quick text-xl font-medium text-white">
                      All Students
                    </h1>
                  </div>
                  <div className="rounded-md px-7 py-4 bg-[#FFBC25]">
                    <h1 className="font-quick text-xl font-medium text-white">
                      This Class
                    </h1>
                  </div>
                  <div className="rounded-md px-7 py-4 bg-[#023E8A]">
                    <h1 className="font-quick text-xl font-medium text-white">
                      Absen
                    </h1>
                  </div>
                  <div className="rounded-md px-7 py-4 bg-[#023E8A]">
                    <h1 className="font-quick text-xl font-medium text-white">
                      Permission
                    </h1>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-row items-center border border-[#495057] rounded-md px-4 w-[467px] gap-3">
                    <MagnifyingGlassIcon className="w-6 text-[#212529]" />
                    <p className="text-[#6C757D] font-quick font-medium text-lg">
                      Search Something?
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between border border-[#495057] rounded-md px-4 gap-3">
                    <FunnelIcon className="w-6 text-[#212529]" />
                    <p className="text-[#6C757D] font-quick font-medium text-lg">
                      Filter
                    </p>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
            <div className="overflow-x-scroll md:overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>NIK</Th>
                  <Th>Name</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th>Clock In</Th>
                  <Th>Clock Out</Th>
                  <Th>Coordinate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.daftar_siswa.map((absen, index) => (
                  <Tr key={index}>
                    <Td>
                      <span>{absen.id || "null"}</span>
                    </Td>
                    <Td>
                      <span>{absen.nama || "null"}</span>
                    </Td>
                    <Td>
                      <span>{"null"}</span>
                    </Td>
                    <Td>
                      <span>{absen.status || "null"}</span>
                    </Td>
                    <Td>
                      <span>{absen.waktu_absen || "null"}</span>
                    </Td>
                    <Td>
                      <span>{"null"}</span>
                    </Td>
                    <Td>
                      <div className="flex gap-2 pl-[30rem] py-[59px]">
                        <MapPinIcon className="text-[#FFBC25] w-5" />
                        <p className="font-quick font-semibold text-[#212529]">
                          View Location
                        </p>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            </div>
            {/* pagination */}
            <div className="w-full bg-[#ADB5BD] py-4 px-6">
              <h1 className="font-quick font-semibold text-lg">Page 1 of 3</h1>
            </div>
            {/* pagination */}
          </div>

          {/* ---------------- End Button ---------------- */}
          <button
            onClick={() =>
              (document.getElementById("my_modal_1") as any).showModal()
            }
            className={`btn w-full h-[55px] md:h-[80px] mt-6 text-[#212529] text-[16px] md:text-3xl font-quick font-semibold py-3 btn-outline`}
          >
            End Class
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box max-w-5xl">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <form method="dialog">
                    <button>
                      <Image
                        className="hover:bg-slate-100"
                        src={X}
                        alt="x"
                        width={38}
                        height={38}
                      />
                    </button>
                  </form>
                  <p className="text-3xl font-quick font-semibold">
                    Class Journal
                  </p>
                </div>
                <div className="flex flex-col mt-14">
                  <Label title={"Subject"} htmlFor={"Subject"} />

                  <InputField
                    name={"Subject"}
                    placeholder={""}
                    value={data?.data.nama_mapel || ""}
                  />
                </div>
                <div className="flex flex-col mt-11 w-full">
                  <Label title={"Lesson Hours"} htmlFor={"Lesson Hours"} />
                  <InputField
                    name={"Lesson Hours"}
                    placeholder={""}
                    value={"2 Jam"}
                  />
                </div>
                <FormikProvider value={formik}>
                  <Form>
                    <div className="flex flex-col mt-11">
                      <Label
                        title={"Today lesson material (Required)"}
                        htmlFor={"materi"}
                      />
                      <InputField
                        type="text"
                        name={"materi"}
                        placeholder={""}
                        value={formik.values.materi}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.materi}
                        touched={formik.touched.materi}
                      />
                    </div>
                    <div className="flex flex-col mt-11">
                      <Label
                        title={"Problems during lesson (Optional)"}
                        htmlFor={"kendala"}
                      />
                      <InputField
                        type="text"
                        name={"kendala"}
                        placeholder={""}
                        isTextArea={true}
                        value={values.kendala}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.kendala}
                        touched={touched.kendala}
                      />
                    </div>
                    <form method="dialog">
                      <button
                        onClick={() => handleSubmit()}
                        className={`btn w-full mt-11 text-[#212529] font-quick font-semibold  btn-outline`}
                      >
                        Submit
                      </button>
                    </form>
                  </Form>
                </FormikProvider>
              </div>
            </div>
          </dialog>
        </div>

        <div className="mt-56">
          <Footer />
        </div>
      </section>
    </main>
  );
};
export default AdminAttendance;
