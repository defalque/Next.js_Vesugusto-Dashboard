import getCurrentUser from "@/app/_lib/helpers";
import AccountInfoForm from "./AccountInfoForm";
import AccountForm from "./AccountForm";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

async function EditAccountForm() {
  const user = await getCurrentUser();

  if (user.error) {
    return (
      <AccountForm title="Modifica le tue informazioni">
        <div className="flex flex-col p-3">
          <FaceFrownIcon className="mx-auto size-10 text-neutral-500 dark:text-neutral-400" />
          <span className="mx-auto mt-4 text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            Non è stato possibile recuperare le tue informazioni.
          </span>
          <span className="mx-auto text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            Riprova più tardi.
          </span>
        </div>
      </AccountForm>
    );
  }

  if (!user.data.user) {
    return (
      <AccountForm title="Modifica le tue informazioni">
        <div className="flex flex-col p-3">
          <FaceFrownIcon className="mx-auto size-10 text-neutral-500 dark:text-neutral-400" />
          <span className="mx-auto mt-4 text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            Non è stato possibile recuperare le tue informazioni.
          </span>
          <span className="mx-auto text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            Riprova più tardi.
          </span>
        </div>
      </AccountForm>
    );
  }

  const userInfo = {
    email: user.data.user.user_metadata.email,
    name: user.data.user.user_metadata.fullName,
  };

  return (
    <AccountForm title="Modifica le tue informazioni">
      <AccountInfoForm userInfo={userInfo} />
    </AccountForm>
  );
}

export default EditAccountForm;
