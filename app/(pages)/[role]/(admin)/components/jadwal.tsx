"use client";
import React, { useState, useEffect } from "react";
import useCrudModule from "@/hook/useCRUD";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import useOptions from "@/hook/useOption";
// import { UpdateJadwalPayload } from "@/app/(jadwal)/interface/update";
import { JadwalDetailResponses } from "@/app/lib/(jadwal)/interface/detail"; 

export const updateJadwalSchema = yup.object().shape({
  hari_id: yup.number().nullable(),
  jam_jadwal: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().nullable(),
        jam_mulai: yup.string().nullable(),
        jam_selesai: yup.string().nullable(),
        is_rest: yup.boolean().nullable(),
        jam_detail: yup.array().of(
          yup.object().shape({
            id: yup.number().nullable(),
            subject_code: yup.number().nullable(),
          })
        ),
      })
    )
    .nullable(),
});

const TableJadwal: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<null>(null);
  const [editCell, setEditCell] = useState<{
    jamIndex: number;
    detailIndex: number;
  } | null>(null);

  const { useUpdate, useDetail } = useCrudModule();
  const { data: dataJadwalDetail } = useDetail<JadwalDetailResponses>(
    "jadwal/detail",
    selectedDay || "1"
  );
  const { mutate, isLoading } = useUpdate<any>(
    "jadwal/update",
    selectedDay || "0"
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
            subject_code: d.subject_code.code || "", // Retain existing value if empty
          })),
        })),
      };
      setInitialValues(newInitialValues);
      formik.setValues(newInitialValues);
    }
  }, [dataJadwalDetail, isEditing]);

  const onSubmit = async (values: any) => {
    // Transform values to avoid NaN in the payload and keep existing values if not updated
    const convertedValues: any = {
      hari_id: Number(values.hari_id),
      jam_jadwal: values.jam_jadwal?.map((jam: any) => ({
        id: Number(jam.id),
        is_rest: jam.is_rest,
        jam_mulai: jam.jam_mulai,
        jam_selesai: jam.jam_selesai,
        jam_detail: jam.jam_detail.map((detail: any) => ({
          id: Number(detail.id),
          subject_code: isNaN(detail.subject_code)
            ? dataJadwalDetail?.jam_jadwal
                .find((j) => j.id === jam.id)
                ?.jam_detail.find((d) => d.id === detail.id)?.subject_code
                .code || ""
            : Number(detail.subject_code), // Use existing value if NaN
        })),
      })),
    };

    // Call the mutate function to submit the data
    mutate(convertedValues, {
      onSuccess: (data) => {
        console.log("Mutate response:", data);
        setEditCell(null); // Revert to plain text
      },
    });
  };

  const formik = useFormik<any>({
    initialValues: initialValues || {},
    // validationSchema: updateJadwalSchema,
    // enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const { handleChange, handleBlur, values, handleSubmit } = formik;
  const { optionHari, optionKelas, optionJadwalCode } = useOptions();

  const handleDayChange = (dayId: string) => {
    setSelectedDay(dayId);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCellEdit = (jamIndex: number, detailIndex: number) => {
    setEditCell({ jamIndex, detailIndex });
  };

  const handleCellChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    jamIndex: number,
    detailIndex: number
  ) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  console.log(formik.values);

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
              <div className="dropdown dropdown-end absolute right-6">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex font-quick font-semibold m-1 text-lg"
                >
                  <ChevronDownIcon className="w-5 mr-2" />{" "}
                  {selectedDay
                    ? optionHari.find((h: any) => h.value === selectedDay)
                        ?.label
                    : "Senin"}
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
          <div className="min-w-[800px] h-fit">
            <div className="flex flex-row justify-between w-full bg-blue-800 text-white font-semibold">
              <div className="py-2 px-6">Clock</div>
              {optionKelas.map((kelas: any) => (
                <div key={kelas.value} className="py-2 px-6">
                  {kelas.label}
                </div>
              ))}
            </div>
            <FormikProvider value={formik}>
              <Form>
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
                            className={`border-t py-4 px-4 relative ${
                              isEditing ? "bg-gray-100 cursor-pointer" : ""
                            }`}
                            onClick={() =>
                              isEditing &&
                              setEditCell({ jamIndex, detailIndex })
                            }
                          >
                            {editCell?.jamIndex === jamIndex &&
                            editCell?.detailIndex === detailIndex ? (
                              <Field
                                as="select"
                                name={`jam_jadwal.${jamIndex}.jam_detail.${detailIndex}.subject_code`}
                                className="border p-1 rounded"
                                onBlur={handleBlur}
                                onChange={(e: any) =>
                                  handleCellChange(e, jamIndex, detailIndex)
                                }
                                value={detail.subject_code}
                              >
                                <option value="">Pilih</option>
                                {optionJadwalCode.map((subject: any) => (
                                  <option
                                    key={subject.value}
                                    value={subject.value}
                                  >
                                    {subject.label}
                                  </option>
                                ))}
                              </Field>
                            ) : (
                              <span>
                                {
                                  optionJadwalCode.find(
                                    (subject: any) =>
                                      subject.value === detail.subject_code
                                  )?.label
                                }
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </Form>
            </FormikProvider>
          </div>
          <div className="flex justify-end mt-4">
            {!isEditing && selectedDay && (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEditClick}
              >
                Edit Schedule
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableJadwal;
