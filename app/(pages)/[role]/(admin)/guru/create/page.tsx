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
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { RiNotificationBadgeLine } from "react-icons/ri";
//
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
  const { mutate, isLoading } = useCreate<CreateGuruPayload>("/guru/register");
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

  const { optionInitialSchedule, isFetchingInitialSchedule, isFetchingMapel } = useOptions();

  return (
    <div className="">
      <section className="flex justify-center w-full h-screen font-quick">
        <section className="bg-white p-8 pt-6 w-full h-fit">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Tambah Guru
          </h2>

          <FormikProvider value={formik}>
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <section className="flex flex-col gap-3">
                <Label
                  htmlFor="nama"
                  title="Username"
                  style="font-medium text-xl"
                />
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

              <section className="flex flex-col gap-3">
                <Label
                  htmlFor="email"
                  title="Email"
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

              <section className="flex flex-col gap-3">
                <Label
                  htmlFor="password"
                  title="Password"
                  style="font-medium text-xl"
                />
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
              <div className="flex gap-5 w-full flex-row">
                <section className="flex flex-col gap-3 w-full">
                  <Label
                    htmlFor="subject"
                    title="Subject"
                    style="font-medium text-xl"
                  />
                  <MultiSelect
                    isFetching={isFetchingMapel}
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
                <section className="flex flex-col items-start gap-3 w-full h-fit">
                  <Label
                    htmlFor="initial_schedule"
                    title="Initial Code"
                    style="font-medium text-xl"
                  />
                  <Select
                    style=""
                    isFetching={isFetchingInitialSchedule}
                    id="initial_schedule"
                    value={values.initial_schedule}
                    options={optionInitialSchedule}
                    name={`initial_schedule`}
                    onChange={(e) =>
                      setFieldValue(`initial_schedule`, e.target.value)
                    }
                  />
                </section>
              </div>

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

export default CreateMapel;
