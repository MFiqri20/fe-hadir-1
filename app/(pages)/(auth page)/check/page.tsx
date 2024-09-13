"use client";
import check from "/public/images/check.png";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
// import useAuthModule from "@/app/(user)/lib";

const Check = ({ params }: { params: { token: any; nama: any } }) => {
  // const { useProfileCheck } = useAuthModule();
  // const data = useProfileCheck(params.id);
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center text-center">
      <picture>
        <Image src={check} alt="check" />
      </picture>
      <div className="mt-6 mb-[56px]">
        <h1 className="font-quick font-semibold text-3xl text-[#212529]">
          Check your email
        </h1>
        <h1 className="font-quick text-lg text-[#495057] mt-3">
          We sent a reset password link to{" "}
          <span className="font-bold text-[#212529]"> {params.nama}@gmail.com</span>
        </h1>
      </div>
      <button className="btn btn-active btn-primary bg-[#023E8A] w-[446px] font-quick font-semibold text-lg">
        Open email app
      </button>
      <h1 className="font-quick text-lg text-[#495057] mt-3">
        Didn`t recieve the email?{" "}
        <span className="font-bold text-[#495057] underline  underline-offset-2">
          {" "}
          Click to resend
        </span>
      </h1>
      <Link href={"/login"} className="flex gap-2 mt-12">
        <ChevronLeftIcon className="w-5" />
        <h1 className="font-quick text-lg">Back lo login</h1>
      </Link>
    </section>
  );
};

export default Check;