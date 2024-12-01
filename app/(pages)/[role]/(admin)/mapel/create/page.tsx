"use client";
import Button from "@/component/Button";
import InputText from "@/component/InputText";
import Label from "@/component/Label";
import Select from "@/component/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { MapelCreatePayload } from "@/app/lib/(mapel)/interface";
import Link from "next/link";
// icons
import { ArrowLongLeftIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { RiNotificationBadgeLine } from "react-icons/ri";
//
import useCrudModule from "@/hook/useCRUD";
import { useRouter } from "next/navigation";

export const createMapelSchema = yup.object().shape({
  nama_mapel: yup.string().nullable().default("").required("Wajib isi"),
  status_mapel: yup.string().nullable().default("").required("Wajib isi"),
});

const options = [
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Offline",
    value: "offline",
  },
];

const CreateMapel = () => {
  const { useCreate } = useCrudModule();
  const { mutate, isLoading } = useCreate<MapelCreatePayload>("/mapel/create");
  const onSubmit = async (values: MapelCreatePayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(createMapelSchema.getDefault());
      },
    });
  };

  const formik = useFormik<MapelCreatePayload>({
    initialValues: createMapelSchema.getDefault(),
    validationSchema: createMapelSchema,
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
    setValues,
  } = formik;
  const route = useRouter();

  return (
    <section>
      <div className="flex justify-between items-center mx-6 my-8">
        <h1 className="text-4xl font-medium">
          {" "}
          <span className="text-[#0077B6]">Create</span> | Subject
        </h1>
        <RiNotificationBadgeLine className="text-3xl" />
      </div>
      <hr className="w-full border mt-8" />
      <section className="flex justify-center w-full h-screen p-10 font-quick">
        <section className="bg-[#F8F9FA] p-8 rounded-lg shadow-lg w-full h-fit">
          <button
            onClick={() => route.push("/admin")}
            className="flex items-center justify mb-10 hover:underline"
          >
            <ChevronLeftIcon className="w-8 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-700 hover:underline-offset-0">
              Tambah Mapel
            </h1>
          </button>
          <FormikProvider value={formik}>
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <section className="flex flex-col gap-3">
                <Label
                  htmlFor="nama"
                  title="Subjet Name"
                  style="font-medium text-xl"
                />
                <InputText
                  value={values.nama_mapel}
                  placeholder="Enter Subject Name"
                  name="nama_mapel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formik.errors.nama_mapel}
                  touched={formik.touched.nama_mapel}
                />
              </section>

              <section className="flex flex-col items-start gap-3 w-full">
                <Label htmlFor="status_mapel" title="Status" />
                <Select
                  style="w-full"
                  value={values.status_mapel}
                  id="status_mapel"
                  name="status_mapel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={options}
                  isError={!!errors.status_mapel}
                  messageError={errors.status_mapel}
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

export default CreateMapel;
