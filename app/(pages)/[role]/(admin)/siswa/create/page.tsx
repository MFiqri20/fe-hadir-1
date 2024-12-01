"use client";
import Button from "@/component/Button";
import InputText from "@/component/InputText";
import Label from "@/component/Label";
import MultiSelect from "@/component/MultiSelect"; // Import the custom MultiSelect component
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import Link from "next/link";
// icons
import { ArrowLongLeftIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { RiNotificationBadgeLine } from "react-icons/ri";
//
import useOptions from "@/hook/useOption";
import Select from "@/component/Select";
import useCrudModule from "@/hook/useCRUD";
import { useRouter } from "next/navigation";
import { CreateSiswaPayload } from "@/app/lib/(siswa)";

export const createGuruSchema = yup.object().shape({
  nama: yup.string().required("Nama wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("password wajib diisi"),
  kelas: yup.number().required("kelas wajib diisi"),
  NISN: yup.string().required("NISN wajib diisi"),
  tanggal_lahir: yup.string().required("tanggal lahir wajib diisi"),
  alamat: yup.string().required("alamat wajib diisi"),
});

const CreateSiswa = () => {
  const { useCreate } = useCrudModule();
  const { mutate, isLoading } =
    useCreate<CreateSiswaPayload>("/siswa/register");
  const { optionMapel } = useOptions();

  const onSubmit = async (values: CreateSiswaPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const formik = useFormik<CreateSiswaPayload>({
    initialValues: {
      nama: "",
      email: "",
      password: "",
      kelas: 0,
      NISN: "",
      tanggal_lahir: "",
      alamat: "",
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

  const { optionInitialSchedule } = useOptions();
  const route = useRouter();

  return (
    <div className="">
      <div className="flex justify-between items-center mx-6 my-8">
        <h1 className="text-4xl font-medium">
          {" "}
          <span className="text-[#0077B6]">Create</span> | Student
        </h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      {/*  */}
      <hr className="w-full border mt-8" />
      <section className="flex justify-center w-full h-screen md:p-10 p-3 font-quick">
        <section className="bg-[#F8F9FA] p-8 rounded-lg shadow-lg w-full h-fit">
          <button
            onClick={() => route.push("/admin")}
            className="flex items-center justify mb-10 hover:underline"
          >
            <ChevronLeftIcon className="w-8 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-700 hover:underline-offset-0">
              Tambah Siswa
            </h1>
          </button>

          <FormikProvider value={formik}>
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full grid md:grid-cols-2 grid-cols-1">
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="nama"
                    title="Username"
                    style="font-medium text-xl"
                  />
                  <InputText
                    value={values.nama}
                    placeholder="Student name"
                    name="nama"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.nama}
                    touched={formik.touched.nama}
                  />
                </section>
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="email"
                    title="Class"
                    style="font-medium text-xl"
                  />
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
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="email"
                    title="email"
                    style="font-medium text-xl"
                  />
                  <InputText
                    value={values.email}
                    placeholder="example@gmail.com"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                </section>
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="nisn"
                    title="NISN"
                    style="font-medium text-xl"
                  />
                  <InputText
                    value={values.NISN}
                    placeholder="NISN"
                    name="NISN"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.NISN}
                    touched={formik.touched.NISN}
                  />
                </section>
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="password"
                    title="password"
                    style="font-medium text-xl"
                  />
                  <InputText
                    value={values.password}
                    placeholder="Type here"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                  />
                </section>
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="tanggal_lahir"
                    title="Day of Birth"
                    style="font-medium text-xl"
                  />
                  <InputText
                    value={values.tanggal_lahir}
                    placeholder="Type here"
                    name="tanggal_lahir"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.tanggal_lahir}
                    touched={formik.touched.tanggal_lahir}
                  />
                </section>
              </div>

              <section className="flex flex-col gap-3 w-full">
                <Label
                  htmlFor="alamat"
                  title="Address"
                  style="font-medium text-xl"
                />
                <InputText
                  isTextArea={true}
                  value={values.tanggal_lahir}
                  placeholder="Student Address"
                  name="tanggal_lahir"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formik.errors.tanggal_lahir}
                  touched={formik.touched.tanggal_lahir}
                />
              </section>

              <section className="mt-6">
                <Button
                  style="btn btn-outline w-full font-semibold text-xl bg-[#023E8A] text-white hover:bg-white hover:text-[#023E8A]"
                  height="md"
                  title="Simpan"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="w-full"
                />
              </section>
            </Form>
          </FormikProvider>
        </section>
      </section>
    </div>
  );
};

export default CreateSiswa;
