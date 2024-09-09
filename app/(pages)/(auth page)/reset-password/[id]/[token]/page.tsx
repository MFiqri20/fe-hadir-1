"use client";
import Image from "next/image";
import logo from "/public/images/logo-SMK.png";
import text from "/public/images/text.png";
import text_mobile from "/public/images/text_mobile.png";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import Link from "next/link";
import InputFieldAuth from "@/component/InputText";
import * as yup from "yup";
import { Form, FormikProvider, getIn, useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import useAuthModule from "@/app/lib/(auth)/lib";
import { ResetPasswordPayload } from "@/app/lib/(auth)/interface/interface";

export const ResetPasswordScehema = yup.object().shape({
  new_password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),

  confirm_password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const ResetPassword = ({ params }: { params: { id: number; token: any } }) => {
  const [passwordType, setPasswordType] = useState("password");
  const [value, setValues] = useState({ password: "" });

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const { useResetPassword } = useAuthModule();
  const { mutate, isLoading } = useResetPassword(params.id, params.token);
  const formik = useFormik<ResetPasswordPayload>({
    initialValues: ResetPasswordScehema.getDefault(),
    validationSchema: ResetPasswordScehema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <section className="w-screen h-screen flex flex-row">
      <div className="h-full w-full px-4 py-32 md:px-9 md:py-9 flex flex-col items-center md:items-start">
        <picture className="md:w-auto hidden md:flex">
          <Image src={text} alt="text" />
        </picture>
        <picture className="scale-110 flex md:hidden">
          <Image src={text_mobile} alt="text" />
        </picture>
        <div className="w-full md:w-auto px-6 md:mt-[215px] mt-[117px]">
          <div className="flex flex-col gap-2 w-[423px]">
            <h1 className="font-quick font-medium text-2xl md:text-4xl">
              Reset Password
            </h1>
            <p className="font-quick text-[#6C757D] text-lg md:text-[18px]">
              Enter your new password, of course must be diffrent than before
              you used and you all ready set!.
            </p>
          </div>
          <FormikProvider value={formik}>
            <Form>
              <div className="w-full mt-16 md:mt-0 md:w-[494px]">
                <div className="w-full flex flex-col gap-8 mt-10 md:mt-20 mb-3 md:mb-9">
                  <InputFieldAuth
                    type="text"
                    name="new_password"
                    placeholder="New password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.new_password}
                    touched={touched.new_password}
                    isPassword={true}
                  />
                  <InputFieldAuth
                    type="text"
                    name="confirm_password"
                    placeholder="Confirm password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirm_password}
                    touched={touched.confirm_password}
                    isPassword={true}

                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline w-full flex justify-center items-center"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? (
                    <ClipLoader
                      size={24}
                      color={"#6C757D"}
                      loading={isLoading}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Form>
          </FormikProvider>
          <Link href={"/login"} className="flex my-2">
            <ChevronLeftIcon className="w-5" />
            <p className="textarea-md">Back To Login</p>
          </Link>
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

export default ResetPassword;