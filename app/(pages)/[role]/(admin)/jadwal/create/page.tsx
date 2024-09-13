"use client";
import Button from "@/component/Button";
import Label from "@/component/Label";
import Select from "@/component/Select";
import { useFormik, Form, FormikProvider, FieldArray } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { CreateJadwalPayload } from "@/app/lib/(jadwal)/interface";
import React from "react";
import useOptions from "@/hook/useOption";
import TeacherTable from "../../../dashboard/component/TeacherSchedule";
import useCrudModule from "@/hook/useCRUD";
import InputFieldAuth from "@/component/InputTextAuth";
import { createJadwalSchema } from "@/schema";

// Define KelasList here
const KelasList = [
  { nama_kelas: "X RPL", kelas: 1 },
  { nama_kelas: "X TKJ", kelas: 2 },
  { nama_kelas: "XI RPL", kelas: 3 },
  { nama_kelas: "XI TKJ", kelas: 4 },
  { nama_kelas: "XII RPL", kelas: 5 },
  { nama_kelas: "XII TKJ", kelas: 6 },
];

const generateKelasOptions = () => {
  return KelasList.map((klas) => ({
    label: klas.nama_kelas,
    value: klas.kelas,
  }));
};

const generateKelasMap = () => {
  return KelasList.reduce((acc, klas) => {
    acc[klas.nama_kelas] = klas.kelas;
    return acc;
  }, {} as Record<string, number>);
};



const CreateJadwal = () => {
  // const { useCreateJadwal } = useJadwalModule();
  // const { mutate, isLoading } = useCreateJadwal();
  const { useCreate } = useCrudModule();
  const { mutate, isLoading } =
    useCreate<CreateJadwalPayload>("/jadwal/create");

  const { optionSubjectCode, optionHari } = useOptions();
  const optionKelas = generateKelasOptions();
  const kelasMap = generateKelasMap();

  const onSubmit = async (values: CreateJadwalPayload) => {
    // Ensure kelas values are correctly set using the map
    values.jam_jadwal.forEach((jadwal: any) => {
      jadwal.jam_detail.forEach((detail: any) => {
        detail.kelas =
          kelasMap[
            optionKelas.find((opt) => opt.value === detail.kelas)?.label || ""
          ] || detail.kelas;
      });
    });

    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const formik = useFormik<CreateJadwalPayload>({
    initialValues: {
      hari_id: 0,
      jam_jadwal: [],
    },
    validationSchema: createJadwalSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
  } = formik;

  console.log(formik.values);

  return (
    <section className="flex items-center overflow-x-auto flex-col justify-center w-full h-fit pt-10 bg-gray-50 p-10 font-quick">
      <section className="bg-white p-8 rounded-lg mt-20 shadow-lg w-full">
        <Link href="/admin/jadwal">
          <span className="flex items-center mb-4 text-blue-600 hover:underline">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Tambah Jadwal
        </h2>

        <FormikProvider value={formik}>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            <section className="flex items-center gap-4 mb-4">
              <Label htmlFor="hari" title="Hari" />
              <Select
                id="hari_id"
                value={values.hari_id}
                options={optionHari}
                name={`hari_id`}
                onChange={(e) => setFieldValue(`hari_id`, e.target.value)}
              />
            </section>

            <FieldArray name="jam_jadwal">
              {({ push, remove }) => (
                <div className="overflow-x-auto">
                  <div className="h-[600px] overflow-y-auto relative">
                    <table className="min-w-full bg-white whitespace-nowrap">
                      <thead className="sticky top-0 bg-white">
                        <tr>
                          <th className="py-2 px-4 border">Jam Mulai</th>
                          <th className="py-2 px-4 border">Jam Selesai</th>
                          <th className="py-2 px-4 border">Subject Code</th>
                          <th className="py-2 px-4 border text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.jam_jadwal.map((jadwal: any, index: any) => (
                          <tr key={index}>
                            <td className="py-2 px-4 border">
                              <InputFieldAuth
                                value={jadwal.jam_mulai}
                                placeholder="Jam Mulai"
                                name={`jam_jadwal[${index}].jam_mulai`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </td>
                            <td className="py-2 px-4 border">
                              <InputFieldAuth
                                value={jadwal.jam_selesai}
                                placeholder="Jam Selesai"
                                name={`jam_jadwal[${index}].jam_selesai`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </td>
                            <td className="py-2 px-4 border">
                              {!jadwal.is_rest && (
                                <div className="flex flex-col gap-4">
                                  {optionKelas.map((kelasOption) => {
                                    // Find existing detail or create a new one
                                    const detailIndex =
                                      jadwal.jam_detail.findIndex(
                                        (d: any) =>
                                          d.kelas === kelasOption.value
                                      );
                                    const detail =
                                      detailIndex > -1
                                        ? jadwal.jam_detail[detailIndex]
                                        : {
                                            subject_code: "",
                                            kelas: kelasOption.value,
                                          };

                                    return (
                                      <div
                                        key={kelasOption.value}
                                        className="flex gap-4"
                                      >
                                        <Select
                                          id={`subject_code_${index}_${kelasOption.value}`}
                                          value={detail.subject_code}
                                          options={optionSubjectCode}
                                          name={`jam_jadwal[${index}].jam_detail.${
                                            detailIndex > -1
                                              ? detailIndex
                                              : jadwal.jam_detail.length
                                          }.subject_code`}
                                          onChange={(e) => {
                                            const newSubjectCode =
                                              e.target.value;
                                            const updatedJamDetail = [
                                              ...jadwal.jam_detail,
                                            ];
                                            if (detailIndex > -1) {
                                              updatedJamDetail[detailIndex] = {
                                                ...updatedJamDetail[
                                                  detailIndex
                                                ],
                                                subject_code:
                                                  newSubjectCode as any,
                                              };
                                            } else {
                                              updatedJamDetail.push({
                                                subject_code:
                                                  newSubjectCode as any,
                                                kelas: kelasOption.value,
                                              });
                                            }
                                            setFieldValue(
                                              `jam_jadwal[${index}].jam_detail`,
                                              updatedJamDetail
                                            );
                                          }}
                                        />
                                        <span className="text-gray-700">
                                          {kelasOption.label}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </td>

                            <td className="py-2 px-4 border text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="flex flex-col gap-4">
                                  <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                  <div className="flex flex-row gap-2">
                                    <input
                                      type="checkbox"
                                      id={`is_rest_${index}`}
                                      onChange={() => {
                                        const isRest = !jadwal.is_rest;
                                        setFieldValue(
                                          `jam_jadwal[${index}].is_rest`,
                                          isRest
                                        );
                                        if (isRest) {
                                          // Clear subject_code values when is_rest is true
                                          setFieldValue(
                                            `jam_jadwal[${index}].jam_detail`,
                                            jadwal.jam_detail.map(
                                              (detail: any) => ({
                                                ...detail,
                                                subject_code: "",
                                              })
                                            )
                                          );
                                        }
                                      }}
                                      defaultChecked={jadwal.is_rest}
                                      className="checkbox"
                                    />
                                    <label
                                      htmlFor={`is_rest_${index}`}
                                      className=""
                                    >
                                      Waktu Istirahat
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button type="submit" className="btn btn-outline px-10">
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="btn ml-6"
                    onClick={() =>
                      push({
                        jam_mulai: "",
                        jam_selesai: "",
                        is_rest: false,
                        jam_detail: [],
                      })
                    }
                  >
                    tambah jadwal
                  </button>
                </div>
              )}
            </FieldArray>
          </Form>
        </FormikProvider>
      </section>
      <section className="w-full">
        <TeacherTable />
      </section>
    </section>
  );
};

export default CreateJadwal;
