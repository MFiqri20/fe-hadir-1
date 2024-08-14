import { JadwalListResponse } from "@/app/lib/(jadwal)/interface";
import { JadwalDetailResponses } from "@/app/lib/(jadwal)/interface/detail";
import useCrudModule from "@/hook/useCRUD";
import useOptions from "@/hook/useOption";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";

const MuridTable = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [filteredScheduleData, setFilteredScheduleData] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>(null);

  const { useDetail, useList } = useCrudModule();
  const { data: jadwalList } = useList<JadwalListResponse>("jadwal/list");
  const { data: dataJadwalDetail } = useDetail<JadwalDetailResponses>(
    "jadwal/detail",
    selectedSchedule || "1"
  );

  useEffect(() => {
    if (selectedDay && Array.isArray(jadwalList)) {
      // Filter data berdasarkan hari yang dipilih
      const filteredData = jadwalList.filter(
        (j: any) => j.hari.id === selectedDay
      );
      setFilteredScheduleData(filteredData || []);
    } else {
      setFilteredScheduleData([]);
    }
  }, [selectedDay, jadwalList]);

  const handleDayChange = (dayId: string) => {
    setSelectedDay(dayId);
    setSelectedSchedule(null); // Reset selected schedule when day changes
  };

  const handleScheduleChange = (scheduleId: string) => {
    setSelectedSchedule(scheduleId);
  };

  const formik = useFormik<any>({
    initialValues: initialValues || {},
  });
  const { handleBlur, values } = formik;
  const { optionHari, optionKelas, optionJadwalCode } = useOptions();

  const scheduleData = [
    { no: 1, time: "07.30 - 08.00", description: "Tilawah Al Quran" },
    { no: 2, time: "08:00 - 08:15", description: "English Speech" },
    {
      no: 3,
      time: "08:15 - 09:00",
      description: ["I1", "", "G1", "", "M2", "C1"],
    },
    {
      no: 4,
      time: "09:00 - 09:45",
      description: ["I1", "", "G1", "", "M2", "C1"],
    },
  ];

  return (
    <div className="w-full mx-auto mt-8 font-quick text-xl">
      <div className="flex w-full justify-between mt-12 mb-3">
        <div className="flex flex-row">
          <h1 className="font-quick font-semibold text-2xl text-[#212529]">
            Schedule
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex font-quick font-semibold m-1 text-lg"
            >
              <ChevronDownIcon className="w-5 mr-2" />
              {selectedDay
                ? optionHari.find((h: any) => h.value === selectedDay)?.label
                : "Select Day"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
            >
              {optionHari?.map((option: any) => (
                <li key={option.value}>
                  <a onClick={() => handleDayChange(option.value)}>
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#023E8A] text-white">
            <th rowSpan={4} className="border border-black px-4 py-2">
              No
            </th>
            <th rowSpan={2} className="border border-black px-4 py-2">
              Clock
            </th>
            <th colSpan={6} className="border border-black px-4 py-2">
              Hari
            </th>
          </tr>
          <tr className="bg-[#023E8A] text-white">
            <th className="border border-black px-4 py-2">X RPL</th>
            <th className="border border-black px-4 py-2">X RPL</th>
            <th className="border border-black px-4 py-2">X RPL</th>
            <th className="border border-black px-4 py-2">X RPL</th>
            <th className="border border-black px-4 py-2">X RPL</th>
            <th className="border border-black px-4 py-2">X RPL</th>
          </tr>
        </thead>
        <FormikProvider value={formik}>
          <tbody className="font-medium">
            {jadwalList?.data.map((item, index) => (
              <tr key={index}>
                <td className="border border-black text-center px-4 py-2">
                  {item.id}
                </td>
                <td className="border border-black text-center px-4 py-2">
                  {item.jam_jadwal.map((jam, e) => (
                    <div key={e}>
                      {`${jam.jam_mulai.replace(
                        ":",
                        "."
                      )} - ${jam.jam_selesai.replace(":", ".")}`}
                    </div>
                  ))}
                </td>
                {/* {Array.isArray(item.description) ? (
                    item.description.map((desc, descIndex) => (
                    <td
                        key={descIndex}
                        className="border border-black text-center px-4 py-2"
                    >
                        {}
                    </td>
                    ))
                ) : (
                    <td
                    colSpan={6}
                    className="border border-black text-center px-4 py-2"
                    >
                    {item.description}
                    </td>
                )} */}
              </tr>
            ))}
          </tbody>
        </FormikProvider>
      </table>
    </div>
  );
};

export default MuridTable;
