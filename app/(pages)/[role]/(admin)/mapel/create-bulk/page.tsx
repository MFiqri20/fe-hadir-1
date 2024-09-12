"use client";
import Button from "@/component/Button";
import InputText from "@/component/InputText";
import Label from "@/component/Label";
import { useFormik, Form, FormikProvider, FieldArray } from "formik";
import * as yup from "yup";
import useCrudModule from "@/hook/useCRUD";
import { MapelCreateBUlkPAyload } from "@/app/lib/(mapel)/interface";
import Select from "@/component/Select";

const createBulkMapelSchema = yup.object().shape({
  data: yup.array().of(
    yup.object().shape({
      nama_mapel: yup.string().required("Nama mapel wajib diisi").default(""),
      status_mapel: yup
        .string()
        .required("Status mapel wajib diisi")
        .default(""),
    })
  ).required('Data mapel wajib diisi'),
});

const CreateBulkMapel = () => {
  const { useCreateBulk } = useCrudModule();
  const { mutate, isLoading } =
    useCreateBulk<MapelCreateBUlkPAyload>("/mapel/create-bulk");

  const formik = useFormik<MapelCreateBUlkPAyload>({
    initialValues: {
      data: [{ nama_mapel: "", status_mapel: "" }],
    },
    validationSchema: createBulkMapelSchema,
    onSubmit: async (values: MapelCreateBUlkPAyload) => {
      try {
        await mutate(values);
        formik.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors,
  } = formik;

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

  return (
    <section className="flex items-center justify-center w-full h-screen bg-gray-50 p-10 font-quick">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Tambah Mapel Secara Massal
        </h2>

        <FormikProvider value={formik}>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            <FieldArray
              name="data"
              render={({ remove, push }) => (
                <>
                  {values.data.map((item, index) => (
                    <section key={index}>
                      <div className="">
                        <Label
                          htmlFor={`data.${index}.nama_mapel`}
                          title={`Nama Mapel #${index + 1}`}
                        />
                        <InputText
                        //   id={`data.${index}.nama_mapel`}
                          name={`data.${index}.nama_mapel`}
                          value={item.nama_mapel}
                          placeholder="Nama Mapel"
                          onChange={handleChange}
                        //   error={errors.data?.[index]?.nama_mapel}
                        />
                      </div>
                      <div className="my-6">
                        <Label
                          htmlFor={`data.${index}.status_mapel`}
                          title={`Status Mapel #${index + 1}`}
                        />
                        <Select
                          id={`data.${index}.status_mapel`}
                          name={`data.${index}.status_mapel`}
                          value={item.status_mapel}
                          onChange={handleChange}
                          options={options}
                        //   error={errors.data?.[index]?.status_mapel}
                        />
                      </div>
                      <Button
                        type="button"
                        title="Hapus"
                        colorSchema="red"
                        onClick={() => remove(index)}
                        isDisabled={isLoading}
                      />
                    </section>
                  ))}
                  <section className="mt-6 flex flex-row gap-4">
                    <Button
                      type="button"
                      title="Tambah Mapel"
                      colorSchema="blue"
                      onClick={() => push({ nama_mapel: "", status_mapel: "" })}
                      isDisabled={isLoading}
                    />
                    <Button
                      type="submit"
                      height="md"
                      title={isLoading ? "Loading..." : "Simpan"}
                      colorSchema="blue"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      className="w-full"
                    />
                  </section>
                </>
              )}
            />
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateBulkMapel;
