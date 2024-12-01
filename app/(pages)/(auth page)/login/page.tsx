"use client";
import Image from "next/image";
import logo from "/public/images/logo-SMK.png";
import text from "/public/images/text.png";
import text_mobile from "/public/images/text_mobile.png";
import { useEffect, useState } from "react";
import * as yup from "yup";
import useAuthModule from "@/app/lib/(auth)/lib";
import { LoginPayload } from "@/app/lib/(auth)/interface/interface";
import { useFormik, Form, FormikProvider } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputFieldAuth from "@/component/InputTextAuth";
import { ClipLoader } from "react-spinners";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const Login = () => {
  const { data: session } = useSession();
  console.log("session:", session);
  const { useLogin } = useAuthModule();
  const router = useRouter();
  const { mutate, isLoading } = useLogin();

  useEffect(() => {
    if (session) {
      router.push(`/${session.user.role.toLowerCase()}/dashboard`);
    }
  }, [session, router]);

  const formik = useFormik<LoginPayload>({
    initialValues: loginSchema.getDefault(),
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      console.log("pay: ", payload);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <section className="w-screen h-screen flex flex-col md:flex-row">
      <div className="h-full w-full px-4 py-32 md:px-9 md:py-9 flex flex-col items-center md:items-start">
        <picture className="md:w-auto hidden md:flex">
          <Image src={text} alt="text" />
        </picture>
        <picture className="scale-110 flex md:hidden">
          <Image src={text_mobile} alt="text" />
        </picture>
        <div className="my-10 md:my-[215px] flex w-full flex-col mx-0 items-center md:items-start px-6">
          <div className="hidden md:flex flex-col gap-2 w-full md:w-[423px]">
            <h1 className="font-quick font-medium text-4xl md:text-4xl">
              Welcome Back
            </h1>
            <p className="font-quick text-[#6C757D] text-base md:text-[18px]">
              Hi there nice to see you again, please enter your detail below.
            </p>
          </div>
          <FormikProvider value={formik}>
            <Form className="w-full md:w-auto">
              <div className="w-full  mt-32 md:mt-0 md:w-[494px]">
                <div className="w-full flex flex-col gap-8 mt-10 md:mt-20 mb-3 md:mb-9">
                  <InputFieldAuth
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />

                  <InputFieldAuth
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    isPassword={true}
                  />
                </div>
                <div className="flex justify-between items-center mb-12 md:mb-0">
                  <div className="form-control ">
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox w-6"
                      />
                      <span className="label-text mx-2 font-quick text-[#495057] text-md">
                        Remember for 30 days
                      </span>
                    </label>
                  </div>
                  <a
                    href="/forgot"
                    className="font-quick font-medium textarea-md underline underline-offset-4 "
                  >
                    Forgot Password
                  </a>
                </div>
                <button type="submit" className="btn btn-outline w-full">
                  {isLoading ? (
                    <ClipLoader
                      color={"#36d7b7"}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
      <div className="bg-bgLogin h-40  md:h-full w-full md:w-[170rem] bg-cover px-4 py-4 md:px-9 md:py-9 hidden md:flex justify-center md:justify-end">
        <picture className="w-24 md:w-auto">
          <Image src={logo} alt="logo" width={104} />
        </picture>
      </div>
    </section>
  );
};

export default Login;
