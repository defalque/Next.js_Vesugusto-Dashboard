import getCurrentUser from "@/app/_lib/helpers";
import AccountInfoForm from "./AccountInfoForm";
import AccountForm from "./AccountForm";

async function EditAccountForm() {
  const data = await getCurrentUser();

  const userInfo = {
    email: data.user.user_metadata.email,
    name: data.user.user_metadata.fullName,
  };

  return (
    <AccountForm title="Modifica il tuo profilo">
      <AccountInfoForm userInfo={userInfo} />
    </AccountForm>
  );
}

export default EditAccountForm;
