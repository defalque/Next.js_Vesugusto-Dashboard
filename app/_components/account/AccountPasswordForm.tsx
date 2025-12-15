"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import FormRow from "../ui/form/FormRow";
import FormError from "../ui/form/FormError";
import { updateCurrentUser } from "@/app/_lib/server-actions";
import { toast } from "sonner";

export type PasswordFormInputs = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

function AccountPasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormInputs>({
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  // ⏱️ Osserva i campi in tempo reale
  const newPassword = watch("newPassword");
  const newPasswordConfirm = watch("newPasswordConfirm");

  // ❌ Disabilita i bottoni se entrambi sono vuoti
  const areInputsEmpty = !newPassword && !newPasswordConfirm;

  const onSubmit: SubmitHandler<PasswordFormInputs> = ({ newPassword }) => {
    toast.promise(updateCurrentUser({ newPassword }), {
      loading: "Modifica in corso...",
      success: "Password modificata con successo!",
      error: (err) => `Errore: ${err.message}`,
      finally: () => {
        reset();
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-5 py-3 md:gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        type="password"
        placeholder="Inserisci la nuova password..."
        label="Nuova password"
        id="newPassword"
        required
        autoComplete="new-password"
        maxLength={20}
        disabled={isSubmitting}
        {...register("newPassword", {
          required: "Campo obbligatorio.",
          minLength: {
            value: 6,
            message: "La password deve essere almeno di 6 caratteri.",
          },
          maxLength: {
            value: 20,
            message: "La password non può essere più lunga di 20 caratteri.",
          },
        })}
      />
      <FormError message={errors.newPassword?.message} />

      <FormRow
        type="password"
        placeholder="Ripeti la nuova password..."
        label="Ripeti nuova password"
        id="newPasswordConfirm"
        required
        autoComplete="new-password"
        maxLength={20}
        disabled={isSubmitting}
        {...register("newPasswordConfirm", {
          required: "Campo obbligatorio.",
          validate: (value) =>
            getValues("newPassword") === value ||
            "Le password devono corrispondere!",
        })}
      />
      <FormError message={errors.newPasswordConfirm?.message} />

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          className="touch-hitbox inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-50 bg-gray-50 px-4 py-2.5 text-base font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50 disabled:hover:bg-transparent sm:text-[15px] md:text-sm dark:border-zinc-950/0 dark:bg-zinc-950/25 dark:text-gray-200 dark:hover:bg-zinc-950/50"
          onClick={() => reset()}
          disabled={isSubmitting || areInputsEmpty}
        >
          Cancella modifiche
        </button>

        <button
          type="submit"
          className="bg-brand-950 hover:bg-brand-900 touch-hitbox border-brand-950 disabled:hover:bg-brand-950 flex cursor-pointer items-center rounded-lg border px-3 py-2.5 text-base font-semibold text-white shadow-sm inset-shadow-2xs transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:inset-shadow-none sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-zinc-700/80 dark:inset-shadow-white/20 dark:hover:bg-zinc-600/90 disabled:hover:dark:bg-zinc-700/80"
          disabled={isSubmitting || areInputsEmpty}
        >
          {isSubmitting ? "Modifica in corso..." : "Modifica password"}
        </button>
      </div>
    </form>
  );
}

export default AccountPasswordForm;
