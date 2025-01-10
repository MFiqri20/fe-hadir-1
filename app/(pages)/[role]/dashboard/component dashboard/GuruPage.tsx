import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import Footer from "@/component/Footer";
import DoughnutComponent from "../component/DONUTCHART";
import TableJadwal from "@/component/JadwalTable";
import TeacherTable from "../component/TeacherSchedule";
import useCrudModule from "@/hook/useCRUD";
import {
  CreateAbsenGuruPayload,
  DataJadwalHariIniResponse,
} from "@/app/lib/(absen)";
import { signOut } from "next-auth/react";
import useAuthModule from "@/app/lib/(auth)/lib";
import { ClipLoader } from "react-spinners";
import Navbar from "@/component/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useDownloadPdf from "@/hook/useDownloadPdf";

const AdminPage = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { useProfile } = useAuthModule();
  const { data: dataProfil } = useProfile();

  const { downloadPdf, isDownloading, error } = useDownloadPdf();

  const handleDownload = () => {
    downloadPdf("/download/pdf-month?role=Guru", "Recap.pdf");
  };

  // Fetch schedule data and calculate countdown
  const { data, isFetching } =
    useCrudModule().useList<DataJadwalHariIniResponse>("/jadwal/hari-ini-guru");
  const { isLoading: isCreating, mutate } =
    useCrudModule().useCreate<CreateAbsenGuruPayload>(
      "/absen/masuk-guru",
      "/jadwal/hari-ini-guru"
    );
  const { isLoading: isCreatingKelas, mutate: mutateMasukKelas } =
    useCrudModule().useCreate<CreateAbsenGuruPayload>(
      "/absen/masuk-kelas-guru",
      "/jadwal/hari-ini-guru"
    );

  useEffect(() => {
    if (data?.data) {
      const { jam_mulai, jam_selesai } = data.data;

      const updateCountdown = () => {
        const now: any = new Date();
        const [startHour, startMinute] = jam_mulai.split(":").map(Number);
        const [endHour, endMinute] = jam_selesai.split(":").map(Number);

        const startTime: any = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          startHour,
          startMinute
        );
        const endTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          endHour,
          endMinute
        );

        // Adjust start time if it has passed
        if (now > startTime && now < endTime) {
          setCountdown({
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
        } else {
          const timeDiffStart = startTime - now;
          const totalSecondsStart = Math.floor(timeDiffStart / 1000);
          const hoursStart = Math.floor(totalSecondsStart / 3600);
          const minutesStart = Math.floor((totalSecondsStart % 3600) / 60);
          const secondsStart = totalSecondsStart % 60;

          setCountdown({
            hours: hoursStart,
            minutes: minutesStart,
            seconds: secondsStart,
          });
        }
      };

      updateCountdown(); // Initial call
      const interval = setInterval(updateCountdown, 1000); // Update countdown every second

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [data]);

  const handleAbsence = () => {
    if (!data?.data.is_absen) {
      setIsLoading(true);
      mutate(
        {
          jam_detail: data?.data.jamDetailId,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
          },
          onError: () => {
            setIsLoading(false);
          },
        }
      );
    }
  };

  const handleMasukKelas = () => {
    mutateMasukKelas(
      {
        jam_detail: data?.data.jamDetailId,
      },
      {
        onSuccess: () => {
          router.push(`/guru/attendance`);
        },
      }
    );
  };

  // Determine if the countdown has reached zero and if we are within the allowed time range
  const isCountdownOver =
    countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
  const isWithinAllowedTime =
    !isCountdownOver &&
    (countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0);

  const buttonDisabled =
    isLoading ||
    data?.data.is_absen ||
    (!isWithinAllowedTime && !isCountdownOver);

  const buttonText = data?.data.is_absen
    ? "Anda sudah absen"
    : isCountdownOver
    ? "Take an attendance before, Click me!"
    : "Jadwal Belum Mulai";

  return (
    <section>
      <Navbar
        role="guru"
        title1="Dashboard"
        title2="Attendance"
        title3="Recap"
      />

      <div className="w-screen px-8">
        {/* Profile Skeleton */}
        <div className="flex w-full justify-between my-10 items-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-quick text-3xl font-medium">
              {isLoading ? (
                <Skeleton height={35} width={100} />
              ) : (
                `Hi, ${dataProfil?.data.nama}`
              )}
            </h1>
            <div className="flex flex-row gap-2">
              {isLoading ? (
                <Skeleton height={35} width={35} />
              ) : (
                <Image src={logo} alt="user" width={35} height={35} />
              )}
              <h1 className="font-quick text-3xl">
                {isLoading ? (
                  <Skeleton height={35} width={200} />
                ) : (
                  "SMK Madinatul Quran | Teacher"
                )}
              </h1>
            </div>
          </div>

          {/* Countdown Skeleton */}
          {!isLoading && !data?.data.is_absen && (
            <div className="w-[672px] flex gap-6 items-center">
              <span className="countdown text-[100px] font-light text-[#495057]">
                <span style={{ "--value": countdown.hours } as any}></span>:
                <span style={{ "--value": countdown.minutes } as any}></span>:
                <span style={{ "--value": countdown.seconds } as any}></span>
              </span>
              <div className="flex flex-col">
                <h1 className="font-quick font-medium text-2xl text-[#495057]">
                  {isLoading ? (
                    <Skeleton height={35} width={500} />
                  ) : (
                    `left before check-in to ${data?.data.mapel}`
                  )}
                </h1>
                <h1 className="font-quick font-medium text-2xl text-[#495057]">
                  {isLoading ? (
                    <Skeleton height={35} width={500} />
                  ) : (
                    `${data?.data.kelas} Class`
                  )}
                </h1>
              </div>
            </div>
          )}
        </div>

        {/* Button Skeleton */}
        <button
          onClick={handleAbsence}
          disabled={isLoading || buttonDisabled}
          className={`btn w-full h-[60px] mt-10 text-[#212529] text-3xl font-quick font-semibold py-3 hover:bg-[#023E8A] ${
            data?.data.is_absen || !isCountdownOver
              ? "btn-disabled"
              : "btn-outline"
          }`}
        >
          {isLoading ? (
            <Skeleton height={35} width={100} />
          ) : isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            buttonText
          )}
        </button>

        <hr className="w-full border border-[#6C757D] mt-8" />

        {/* Chart Skeletons */}
        <div className="flex md:flex-row flex-col my-8 justify-evenly">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height={300} width={300} />
            ))
          ) : (
            <>
              <DoughnutComponent
                title="Weekly"
                absen={25}
                attendece={25}
                permission={50}
              />
              <DoughnutComponent
                title="Monthly"
                absen={25}
                attendece={25}
                permission={50}
              />
              <DoughnutComponent
                title="Semester Basis"
                absen={25}
                attendece={25}
                permission={50}
              />
            </>
          )}
        </div>
        <div className="w-full flex justify-between items-center my-6">
          <h1 className="font-medium text-lg text-[#495057]">
            This will kindly remind you of your attendance each time you clock
            in, whether it be <br /> weekly, monthly, or per semester.
          </h1>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn btn-outline font-semibold text-base px-[15px] hover:bg-[#023E8A]"
          >
            Download Recap
          </button>
        </div>

        <hr className="w-full border border-[#6C757D]" />

        {/* Class Info Skeleton */}
        <div className="flex w-full justify-between mt-6">
          <div className="">
            <h1 className="font-quick font-semibold text-4xl text-[#212529]">
              {isLoading ? (
                <Skeleton height={35} width={200} />
              ) : (
                "Today's Class"
              )}
            </h1>
            <h1 className="font-quick font-medium text-lg text-[#495057] w-[708px] mt-2">
              {isLoading ? (
                <Skeleton height={35} width={150} />
              ) : (
                `Today's class is a ${data?.data.mapel} class.`
              )}
            </h1>
          </div>
          <button
            onClick={handleMasukKelas}
            disabled={isLoading || !data?.data.is_absen}
            className="btn btn-outline font-semibold text-[24px] px-16 h-[98px]"
          >
            {isLoading ? (
              <ClipLoader color={"#36d7b7"} size={20} />
            ) : (
              "Enter Class"
            )}
          </button>
        </div>

        {/* Table Skeletons */}
        {isLoading ? (
          <Skeleton height={300} width={1670} />
        ) : (
          <>
            <TableJadwal />
          </>
        )}
        {isLoading ? (
          <Skeleton height={300} width={1670} />
        ) : (
          <>
            <TeacherTable />
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default AdminPage;
