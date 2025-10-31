"use client";

import { CredentialsFormProps } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { SignUpFormSkeleton } from "../ui/Skeletons";
const CredentialsForm = dynamic(() => import("./CredentialsForm"), {
  ssr: false,
  loading: () => <SignUpFormSkeleton />,
});

function LazySignupCredentialsForm({
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

export default LazySignupCredentialsForm;
