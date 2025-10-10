"use client";

import { useActionState, type ComponentPropsWithoutRef } from "react";

import { login, signup } from "@/app/_lib/server-actions";
import FormRow from "../ui/form/FormRow";
import AuthFormQuestionLink from "./AuthFormQuestionLink";
import Button from "../ui/Button";
import HeadingFormHidden from "../ui/form/HeadingFormHidden";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  title: "Login" | "Registrazione";
};

const initialState = {
  error: "",
  success: "",
};

function CredentialsForm({ title, ...props }: FormProps) {
  async function handleSubmit(
    initialState: { success: string; error: string },
    formData: FormData,
  ) {
    const password = formData.get("password");
    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 20
    ) {
      return {
        ...initialState,
        error: "La password deve essere tra 6 e 20 caratteri.",
        success: "",
      };
    }

    switch (title) {
      case "Login":
        return await login(initialState, formData);
      case "Registrazione":
        return await signup(initialState, formData);
      default:
        throw new Error(`Titolo non valido: ${title}`);
    }
  }

  const [state, formAction, pending] = useActionState(
    handleSubmit,
    initialState,
  );

  return (
    <form
      {...props}
      action={formAction}
      aria-labelledby="title"
      className="space-y-3 px-5 pt-5 pb-15 sm:px-10"
    >
      <HeadingFormHidden id="title" className="sr-only">
        Form di {title}
      </HeadingFormHidden>

      {state.error && (
        <div className="bg-brand-950/10 text-brand-950 flex max-w-sm items-start gap-2 rounded-lg p-2 text-sm">
          <HiOutlineExclamationCircle className="size-5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.success && (
        <div className="flex max-w-sm items-start gap-2 rounded-lg bg-green-600/10 p-2 text-xs text-green-600">
          <HiOutlineCheckCircle className="size-5 shrink-0" />
          <span>{state.success}</span>
        </div>
      )}

      <FormRow
        type="email"
        placeholder="Inserisci email..."
        label="Email"
        name="email"
        required
        autoComplete="email"
        disabled={pending}
      />

      <FormRow
        type="password"
        placeholder="Inserisci password..."
        label="Password"
        showForgotPwd={title === "Login"}
        name="password"
        required
        autoComplete={title === "Login" ? "current-password" : "new-password"}
        maxLength={20}
        disabled={pending}
      />

      <Button
        className="mt-10 w-full px-4"
        disabled={pending}
        aria-label={
          title === "Login"
            ? "Accedi al tuo account"
            : "Registrati su Vesugusto"
        }
      >
        {title === "Login" ? "Accedi" : "Registrati"}
      </Button>

      <AuthFormQuestionLink title={title} />
    </form>
  );
}

export default CredentialsForm;
