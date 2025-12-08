"use client";

import { useActionState, type ComponentPropsWithoutRef } from "react";

import { login, signup } from "@/app/_lib/server-actions";
import FormRow from "../ui/form/FormRow";
import HeadingFormHidden from "../ui/form/HeadingFormHidden";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";
import LoginInstructions from "./LoginInstructions";
import { CredentialsFormProps } from "@/app/_lib/definitions";

type FormProps = ComponentPropsWithoutRef<"form"> & CredentialsFormProps;

const initialState = {
  error: "",
  success: "",
};

function CredentialsForm({
  title,
  onChangeForm,
  isActive,
  ...props
}: FormProps) {
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
    <>
      {title === "Login" && <LoginInstructions />}

      <form
        {...props}
        action={formAction}
        aria-labelledby="title"
        className="space-y-4 px-5 py-5 sm:px-10"
      >
        <HeadingFormHidden id="title" className="sr-only">
          Form di {title}
        </HeadingFormHidden>

        {state.error && (
          <div className="flex max-w-sm items-start gap-2 rounded-lg bg-red-600 p-2 text-sm font-medium text-white dark:bg-red-600/20 dark:text-red-500">
            <HiOutlineExclamationCircle className="size-5 shrink-0" />
            <span>
              {state.error === "Invalid login credentials"
                ? "Credenziali non valide"
                : state.error}
            </span>
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
          required={isActive}
          autoComplete="email"
          disabled={pending}
        />

        <FormRow
          type="password"
          placeholder="Inserisci password..."
          label="Password"
          showForgotPwd={title === "Login"}
          name="password"
          required={isActive}
          autoComplete={title === "Login" ? "current-password" : "new-password"}
          maxLength={20}
          disabled={pending}
        />

        <button
          type="submit"
          className="bg-brand-950 hover:bg-brand-900 active:bg-brand-900 mt-5 w-full cursor-pointer self-center rounded-md px-4 py-1.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-300 text-shadow-2xs active:scale-97 disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-25 dark:bg-white dark:text-black dark:text-shadow-none dark:hover:bg-gray-200 dark:active:bg-gray-200"
          disabled={pending}
          aria-label={
            title === "Login"
              ? "Accedi al tuo account"
              : "Registrati su Vesugusto"
          }
        >
          {title === "Login" ? "Accedi" : "Registrati"}
        </button>

        {/* <Button
        className="mt-10 w-full px-4 text-lg"
        disabled={pending}
        aria-label={
          title === "Login"
            ? "Accedi al tuo account"
            : "Registrati su Vesugusto"
        }
      >
        {title === "Login" ? "Accedi" : "Registrati"}
      </Button> */}

        <span className="block text-center text-sm text-neutral-500 dark:text-neutral-400">
          {title === "Login" && "Non hai un account? "}
          {title === "Registrazione" && "Hai già un account? "}
          <button
            type="button"
            className="dark:text-light focus text-brand-950 cursor-pointer rounded px-0.5 font-semibold hover:underline"
            onClick={onChangeForm}
          >
            {title === "Login" && "Registrati"}
            {title === "Registrazione" && "Accedi"}
          </button>
        </span>
      </form>
    </>
  );
}

export default CredentialsForm;
