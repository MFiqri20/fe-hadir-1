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
// icons
import { ArrowLongLeftIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { RiNotificationBadgeLine } from "react-icons/ri";
//
import useOptions from "@/hook/useOption";
import Select from "@/component/Select";
import useCrudModule from "@/hook/useCRUD";
import { useRouter } from "next/navigation";
import { CreateStaffPayload } from "@/app/lib/(staff)/interface";

export const createStaffSchema = yup.object().shape({
  nama: yup.string().required("Nama wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("password wajib diisi"),
  role: yup.string().required("Role wajib diisi"),
  alamat: yup.string().required("Role wajib diisi"),
});

const CreateStaff = () => {
  const { useCreate } = useCrudModule();
  const { mutate, isLoading } =
    useCreate<CreateStaffPayload>("/staff/register");
  const { optionMapel } = useOptions();

  const onSubmit = async (values: CreateStaffPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const formik = useFormik<CreateStaffPayload>({
    initialValues: {
      nama: "",
      email: "",
      role: "",
      password: "",
      alamat: "",
    },
    validationSchema: createStaffSchema,
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
          <span className="text-[#0077B6]">Create</span> | Staff
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
              Tambah Kelas
            </h1>
          </button>

          <FormikProvider value={formik}>
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
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
                    htmlFor="role"
                    title="Role"
                    style="font-medium text-xl"
                  />
                  <InputText
                    value={"Staff"}
                    placeholder="Type here"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.role}
                    touched={formik.touched.role}
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
                  value={values.alamat}
                  placeholder="Staff Address"
                  name="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formik.errors.alamat}
                  touched={formik.touched.alamat}
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

export default CreateStaff;
