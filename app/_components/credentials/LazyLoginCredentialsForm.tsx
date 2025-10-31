"use client";

import { CredentialsFormProps } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { LoginFormSkeleton } from "../ui/Skeletons";
const CredentialsForm = dynamic(() => import("./CredentialsForm"), {
  ssr: false,
  loading: () => <LoginFormSkeleton />,
});

function LazyLoginCredentialsForm({
  title,
  onChangeForm,
  isActive,
}: CredentialsFormProps) {
  return (
    <CredentialsForm
      title={title}
      isActive={isActive}
      onChangeForm={onChangeForm}
    />
  );
}

export default LazyLoginCredentialsForm;
