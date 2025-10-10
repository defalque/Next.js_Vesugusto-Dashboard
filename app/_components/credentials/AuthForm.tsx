import { AuthFormTitle } from "@/app/_lib/definitions";
import FormHeading from "./FormHeading";
import CredentialsFormClient from "./CredentialsFormClient";
import LoginInstructions from "./LoginInstructions";

export default function AuthForm({ title }: AuthFormTitle) {
  return (
    <div className="w-full gap-1 sm:w-110">
      <FormHeading>
        {title === "Login"
          ? "Accedi al tuo account"
          : "Registrati su Vesugusto"}
      </FormHeading>

      {title === "Login" && <LoginInstructions />}

      <CredentialsFormClient title={title} />
    </div>
  );
}
