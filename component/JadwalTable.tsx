"use client";
import React, { useState, useEffect } from "react";
import useCrudModule from "@/hook/useCRUD";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FormikProvider, useFormik } from "formik";
import useOptions from "@/hook/useOption";
import { JadwalDetailResponses } from "@/app/lib/(jadwal)/interface/detail";

const TableJadwal: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<any>(null);

  const { useDetail, useList } = useCrudModule();
  const { data: jadwalList } = useList<any>("jadwal/list");

  const { data: dataJadwalDetail } = useDetail<JadwalDetailResponses>(
    "jadwal/detail",
    selectedSchedule || "1"
  );

  useEffect(() => {
    if (dataJadwalDetail) {
      const newInitialValues: any = {
        hari_id: dataJadwalDetail.hari.id,
        jam_jadwal: dataJadwalDetail.jam_jadwal.map((jam) => ({
          id: jam.id,
          jam_mulai: jam.jam_mulai,
          jam_selesai: jam.jam_selesai,
          is_rest: jam.is_rest,
          jam_detail: jam.jam_detail.map((d) => ({
            id: d.id,
            subject_code: d.subject_code || "",
            nama_kelas: d.kelas.nama_kelas || "",
          })),
        })),
      };
      setInitialValues(newInitialValues);
      formik.setValues(newInitialValues);
    }
  }, [dataJadwalDetail]);

  const formik = useFormik<any>({
    initialValues: initialValues || {},
    onSubmit: () => {},
  });

  const { handleBlur, values } = formik;
  const { optionHari, optionKelas, optionJadwalCode = [] } = useOptions();

  const handleDayChange = (dayId: string) => {
    setSelectedDay(dayId);
    setSelectedSchedule(null); // Reset selected schedule when day changes
  };

  const handleScheduleChange = (scheduleId: string) => {
    setSelectedSchedule(scheduleId);
  };

  return (
    <div className="mt-3 font-quick w-full">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
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
                    ? optionHari.find((h: any) => h.value === selectedDay)
                        ?.label
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
              {selectedDay && (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex font-quick font-semibold m-1 text-lg"
                  >
                    <ChevronDownIcon className="w-5 mr-2" />
                    {selectedSchedule
                      ? jadwalList.find((j: any) => j.id === selectedSchedule)
                          ?.hari.nama_hari
                      : "Select Schedule"}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
                  >
                    {jadwalList
                      ?.filter((j: any) => j.hari.id === selectedDay)
                      .map((schedule: any) => (
                        <li key={schedule.id}>
                          <a onClick={() => handleScheduleChange(schedule.id)}>
                            {schedule.hari.nama_hari}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="min-w-[800px] h-fit">
            <div className="flex flex-row justify-between w-full bg-blue-800 text-white font-semibold">
              <div className="py-2 px-6">Clock</div>
              {optionKelas.map((kelas) => (
                <div key={kelas.value} className="py-2 px-6">
                  {kelas.label}
                </div>
              ))}
            </div>
            <FormikProvider value={formik}>
              <div className="flex flex-col">
                {values.jam_jadwal?.map((jam: any, jamIndex: any) => (
                  <div
                    key={jamIndex}
                    className="flex border-t flex-row justify-between"
                  >
                    <div className="border-t py-4 px-4 w-40 font-semibold">
                      {`${jam.jam_mulai} - ${jam.jam_selesai}`}
                    </div>
                    {jam.is_rest ? (
                      <div className="border-t py-4 px-4 w-full text-center font-semibold">
                        Rest
                      </div>
                    ) : (
                      jam.jam_detail.map((detail: any, detailIndex: any) => (
                        <div
                          key={detailIndex}
                          className="border-t py-4 px-4 relative"
                        >
                          <span>
                            {
                              optionJadwalCode.find(
                                (subject: any) =>
                                  subject.value === detail.subject_code
                              )?.label
                            }
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </FormikProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableJadwal;
