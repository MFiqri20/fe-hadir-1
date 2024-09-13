"use client";
import success from "/public/images/success.png";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Success = ({ params }: { params: { token: any} }) => {
    const route = useRouter()
  // const { useProfileCheck } = useAuthModule();
  // const data = useProfileCheck(params.id);
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center text-center">
      <picture>
        <Image src={success} alt="check" />
      </picture>
      <div className="mt-6 mb-[56px]">
        <h1 className="font-quick font-semibold text-3xl text-[#212529]">
        Successful reset!
        </h1>
        <h1 className="font-quick text-lg text-[#495057] mt-3 w-[65%] mx-auto">
          Your password has been successfully reset. click bellow to login
          magically.
        </h1>
      </div>

      <button
        onClick={() => route.push('/login')}
        type="submit"
        className="btn bg-[#023E8A] text-white w-1/4 flex justify-center items-center"
      >
        Login
      </button>
    </section>
  );
};

export default Success;