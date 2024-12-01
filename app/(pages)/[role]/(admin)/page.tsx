"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminDashboard from "../dashboard/component dashboard/AdminPage";

const Admin = ({ params }: { params: { role: string } }) => {
  const role = params.role;
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login"); // Redirect to login if no session
    }
  }, [session, status, router]);

  if (role.toLowerCase() === "admin") {
    return (
        <div className="w-full h-screen">
            <AdminDashboard/>
        </div>
    )
  }

  return (
    <div className="w-full h-screen">
      <h1>dfghj</h1>
    </div>
  );
};

export default Admin;
