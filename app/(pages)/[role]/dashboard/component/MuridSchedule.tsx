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
    if (selectedDay && Array.isArray(jadwalList?.data)) {
      // Filter data berdasarkan hari yang dipilih
      const filteredData = jadwalList.data.filter(
        (j) => j.hari_id && j.hari_id.toString() === selectedDay
      );
      setFilteredScheduleData(filteredData || []);
    } else {
      setFilteredScheduleData([]);
    }
  }, [selectedDay, jadwalList]);

  const handleDayChange = (dayId: string) => {
    setSelectedDay(dayId);
    setSelectedSchedule(null); // Reset jadwal yang dipilih saat hari berubah
  };

  const handleScheduleChange = (scheduleId: string) => {
    setSelectedSchedule(scheduleId);
  };

  const formik = useFormik<any>({
    initialValues: initialValues || {},
  });
  const { handleBlur, values } = formik;
  const { optionHari, optionKelas, optionJadwalCode } = useOptions();

  return (
    <div className="w-screen md:w-full overflow-x-auto mx-auto mt-8 font-quick text-xl">
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
                ? optionHari.find((h) => h.value === selectedDay)?.label
                : "Pilih Hari"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
            >
              {optionHari?.map((option) => (
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
              Jam
            </th>
            <th colSpan={6} className="border border-black px-4 py-2">
              {jadwalList?.data
                .filter((item) => item.hari_id === selectedDay)
                .map((i,e) => (
                  <span key={e}>{i.hari_id}</span>
                ))
              }
            </th>
          </tr>
          <tr className="bg-[#023E8A] text-white">
            <th className="border border-black px-4 py-2">X RPL</th>
            <th className="border border-black px-4 py-2">X TKJ</th>
            <th className="border border-black px-4 py-2">XI RPL</th>
            <th className="border border-black px-4 py-2">XI TKJ</th>
            <th className="border border-black px-4 py-2">XII RPL</th>
            <th className="border border-black px-4 py-2">XII TKJ</th>
          </tr>
        </thead>
        <FormikProvider value={formik}>
          <tbody className="font-medium">
            {filteredScheduleData.map((item, index) => (
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
                {/* Tambahkan sel lainnya berdasarkan struktur data Anda */}
              </tr>
            ))}
          </tbody>
        </FormikProvider>
      </table>
    </div>
  );
};

export default MuridTable;
