"use client";

import dynamic from "next/dynamic";
import { AccountPasswordFormSkeleton } from "../ui/Skeletons";
const AccountPasswordForm = dynamic(() => import("./AccountPasswordForm"), {
  ssr: false,
  loading: () => <AccountPasswordFormSkeleton />,
});

function AccountPasswordFormClient() {
  return <AccountPasswordForm />;
}

export default AccountPasswordFormClient;
