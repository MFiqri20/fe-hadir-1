"use client";
import Image from "next/image";
import notAccess from "/public/images/not-access1.png";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminPage from "./component dashboard/GuruPage";
import SiswaPage from "./component dashboard/SiswaPage";
import AdminDashboard from "./component dashboard/AdminPage";
import StaffPage from "./component dashboard/StaffPage";

const Dashboard = ({ params }: { params: { role: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = params.role?.toLowerCase();

  useEffect(() => {
    console.log("Session Data:", session);
    console.log("Role from params:", role);

    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  if (role === "guru") {
    return <AdminPage />;
  } else if (role === "staf") {
    return <StaffPage />;
  } else if (role === "murid") {
    return <SiswaPage />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  }
  return (
    <main className="w-screen h-full flex flex-col items-center justify-center">
      <div className="mt-32">
        <Image src={notAccess} alt="No Access" className="w-full" />
      </div>
      {/* <h1>{params.role}</h1> */}
    </main>
  );
};

export default Dashboard;
