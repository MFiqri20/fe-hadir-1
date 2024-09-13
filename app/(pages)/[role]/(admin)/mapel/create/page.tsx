"use client";
import Button from "@/component/Button";
import InputText from "@/component/InputText";
import Label from "@/component/Label";
import Select from "@/component/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { MapelCreatePayload } from "@/app/lib/(mapel)/interface";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import useCrudModule from "@/hook/useCRUD";
import { createMapelSchema } from "@/schema";


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
          Tambah Mapel
        </h2>

        <FormikProvider value={formik}>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="nama_mapel" title="Nama mapel" />
              <InputText
                value={values.nama_mapel}
                placeholder="Nama mapel"
                name="nama_mapel"
                onChange={handleChange}
                onBlur={handleBlur}
                error={formik.errors.nama_mapel}
                touched={formik.touched.nama_mapel}
              />
            </section>

            <section>
              <Label htmlFor="status_mapel" title="Status" />
              <Select
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
