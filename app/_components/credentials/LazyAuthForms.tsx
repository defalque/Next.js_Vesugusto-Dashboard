"use client";

import dynamic from "next/dynamic";
import { LoginFormSkeleton } from "../ui/Skeletons";
const AuthForms = dynamic(() => import("./AuthForms"), {
  ssr: false,
  loading: () => <LoginFormSkeleton isAuthForm />,
});

function LazyAuthForms() {
  return <AuthForms />;
}

export default LazyAuthForms;
