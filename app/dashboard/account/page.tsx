import AccountForm from "@/app/_components/account/AccountForm";
import EditAccountForm from "@/app/_components/account/EditAccountForm";
import { AccountInfoFormSkeleton } from "@/app/_components/ui/Skeletons";
import { Suspense } from "react";
import LazyAccountPasswordForm from "@/app/_components/account/LazyAccountPasswordForm";

export const metadata = {
  title: "Il tuo account",
};

export default function Page() {
  return (
    <div className="text-dark _pb-10 flex flex-col gap-10 dark:text-gray-50">
      <Suspense fallback={<AccountInfoFormSkeleton />}>
        <EditAccountForm />
      </Suspense>

      <AccountForm title="Modifica la tua password">
        <LazyAccountPasswordForm />
      </AccountForm>
    </div>
  );
}
