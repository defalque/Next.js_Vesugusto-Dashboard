import getCurrentUser from "@/app/_lib/helpers";
import AccountInfoForm from "./AccountInfoForm";
import AccountForm from "./AccountForm";

async function EditAccountForm() {
  const user = await getCurrentUser();

  // console.log(user);

  const userInfo = {
    email: user.data.user?.user_metadata.email,
    name: user.data.user?.user_metadata.fullName,
  };

  return (
    <AccountForm title="Modifica le tue informazioni">
      <AccountInfoForm userInfo={userInfo} />
    </AccountForm>
  );
}

export default EditAccountForm;
