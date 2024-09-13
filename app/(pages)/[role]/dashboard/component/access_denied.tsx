/* eslint-disable react/jsx-no-undef */
import hadirpak from "/public/images/HadirPak_putih.png";
import notAccess from "/public/images/not-access1.png";
import React from "react";
import profile from "/public/images/profile.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const AccessDeniedPage = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <div>Loading...</div>;
  } 
};

export default AccessDeniedPage;
