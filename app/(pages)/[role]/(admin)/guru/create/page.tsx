"use client";
import Button from "@/component/Button";
import InputText from "@/component/InputText";
import Label from "@/component/Label";
import MultiSelect from "@/component/MultiSelect"; // Import the custom MultiSelect component
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { CreateGuruPayload } from "@/app/lib/(guru)/interface";
// import useBookModule from "../../../(guru)/lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import useOptions from "@/hook/useOption";
import Select from "@/component/Select";
import useCrudModule from "@/hook/useCRUD";

export const createGuruSchema = yup.object().shape({
  nama: yup.string().required("Nama wajib diisi"),
  initial_schedule: yup.string().required("Intial Schedule wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(8, "Password harus terdiri dari minimal 8 karakter")
    .required("Password wajib diisi"),
  mapel: yup
    .array()
    .of(yup.number().required("Mapel ID wajib diisi"))
    .min(1, "Minimal pilih satu mapel")
    .required("Mapel wajib diisi"),
});

const CreateMapel = () => {
  const { useCreate } = useCrudModule();
  const { mutate, isLoading } = useCreate<CreateGuruPayload>("/guru/register", "/initial-schedule/list");
  const { optionMapel } = useOptions();

  const onSubmit = async (values: CreateGuruPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const formik = useFormik<CreateGuruPayload>({
    initialValues: {
      initial_schedule: "",
      nama: "",
      email: "",
      password: "",
      mapel: [],
    },
    validationSchema: createGuruSchema,
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

  console.log("data:", formik.values);

  const {optionInitialSchedule} = useOptions()

  return (
    <section className="flex items-center justify-center w-full h-screen bg-gray-50 p-10 font-quick">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <Link href="/admin/mapel">
          <span className="flex items-center mb-4 text-blue-600 hover:underline">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Tambah Guru
        </h2>

        <FormikProvider value={formik}>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            <section className="flex flex-col items-start">
              <Label htmlFor="initial_schedule" title="Initial" />
              <Select
                id="initial_schedule"
                value={values.initial_schedule}
                options={optionInitialSchedule}
                name={`initial_schedule`}
                onChange={(e) => setFieldValue(`initial_schedule`, e.target.value)}
              />
            </section>
            <section>
              <Label htmlFor="nama" title="Nama" />
              <InputText
                value={values.nama}
                placeholder="Nama"
                name="nama"
                onChange={handleChange}
                onBlur={handleBlur}
                error={formik.errors.nama}
                touched={formik.touched.nama}
              />
            </section>

            <section>
              <Label htmlFor="email" title="Email" />
              <InputText
                value={values.email}
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
              />
            </section>

            <section>
              <Label htmlFor="password" title="Password" />
              <InputText
                value={values.password}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={formik.errors.password}
                touched={formik.touched.password}
              />
            </section>

            <section>
              <Label htmlFor="mapel" title="Mapel" />
              <MultiSelect
                id="mapel"
                name="mapel"
                options={optionMapel}
                value={
                  optionMapel?.filter((option: any) =>
                    values.mapel.includes(option.value)
                  ) || []
                }
                onChange={(selectedOptions) => {
                  setFieldValue(
                    "mapel",
                    selectedOptions
                      ? (selectedOptions.map(
                          (option: any) => option.value
                        ) as any)
                      : []
                  );
                }}
                error={formik.errors.mapel}
                touched={formik.touched.mapel}
              />
            </section>

            <section className="mt-6">
              <Button
                height="md"
                title="Simpan"
                colorSchema="blue"
                isLoading={isLoading}
                isDisabled={isLoading}
                className="w-full"
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateMapel;
