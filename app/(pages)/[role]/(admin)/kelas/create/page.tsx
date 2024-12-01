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
import useAuthModule from "@/app/lib/(auth)/lib";
import { CreateKelasPayload } from "@/app/lib/(kelas)/interface";
import { useRouter } from "next/navigation";

export const createKelasSchema = yup.object().shape({
  nama_kelas: yup.string().required("Nama kelas wajib diisi"),
});

const KelasCreate = () => {
  const { useCreate } = useCrudModule();
  const { mutate, isLoading } = useCreate<CreateKelasPayload>("/kelas/create");

  const route = useRouter()

  const onSubmit = async (values: CreateKelasPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const formik = useFormik<CreateKelasPayload>({
    initialValues: {
      nama_kelas: "",
    },
    validationSchema: createKelasSchema,
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

  return (
    <section>
      <div className="flex justify-between items-center mx-6 my-8">
        <h1 className="text-4xl font-medium">
          {" "}
          <span className="text-[#0077B6]">Create</span> | Class
        </h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      <hr className="w-full border mt-8" />
      <section className="flex justify-center w-full h-screen p-10 font-quick">
        <section className="bg-[#F8F9FA] p-8 rounded-lg shadow-lg w-full h-fit">
          <button
          onClick={() => route.push('/admin')}
          className="flex items-center justify mb-10 hover:underline">
            <ChevronLeftIcon className="w-8 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-700 hover:underline-offset-0">
              Tambah Kelas
            </h1>
          </button>
          <FormikProvider value={formik}>
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <section className="flex flex-col gap-3">
                <Label
                  htmlFor="nama"
                  title="Nama Kelas"
                  style="font-medium text-xl"
                />
                <InputText
                  value={values.nama_kelas}
                  placeholder="Enter Class Name"
                  name="nama_kelas"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formik.errors.nama_kelas}
                  touched={formik.touched.nama_kelas}
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
    </section>
  );
};

export default KelasCreate;
