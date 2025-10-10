import AccountForm from "@/app/_components/account/AccountForm";
import AccountPasswordFormClient from "@/app/_components/account/AccountPasswordFormClient";
import EditAccountForm from "@/app/_components/account/EditAccountForm";
import Logout from "@/app/_components/credentials/Logout";
import PageTitle from "@/app/_components/ui/PageTitle";
import { AccountInfoFormSkeleton } from "@/app/_components/ui/Skeletons";
import { Suspense } from "react";

export const metadata = {
  title: "Il tuo account",
};

export default function Page() {
  return (
    <div className="text-dark flex flex-col gap-10 pb-15 dark:text-gray-50">
      <div className="flex items-center justify-between gap-2">
        <PageTitle>Il tuo account</PageTitle>
        <Logout />
      </div>

      <Suspense fallback={<AccountInfoFormSkeleton />}>
        <EditAccountForm />
      </Suspense>

      <AccountForm title="Modifica la tua password">
        <AccountPasswordFormClient />
      </AccountForm>
    </div>
  );
}
