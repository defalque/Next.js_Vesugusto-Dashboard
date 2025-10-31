"use client";

import dynamic from "next/dynamic";
import { AccountPasswordFormSkeleton } from "../ui/Skeletons";
const AccountPasswordForm = dynamic(() => import("./AccountPasswordForm"), {
  ssr: false,
  loading: () => <AccountPasswordFormSkeleton />,
});

function LazyAccountPasswordForm() {
  return <AccountPasswordForm />;
}

export default LazyAccountPasswordForm;
