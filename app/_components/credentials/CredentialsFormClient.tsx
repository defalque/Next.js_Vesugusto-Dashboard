"use client";

import { AuthFormTitle } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { AuthFormSkeleton } from "../ui/Skeletons";
const CredentialsForm = dynamic(() => import("./CredentialsForm"), {
  ssr: false,
  loading: () => <AuthFormSkeleton heading={false} />,
});

function CredentialsFormClient({ title }: AuthFormTitle) {
  return <CredentialsForm title={title} />;
}

export default CredentialsFormClient;
