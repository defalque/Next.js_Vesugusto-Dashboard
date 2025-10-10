// "use client";

// import { SubmitHandler, useForm } from "react-hook-form";
// import FormRow from "../ui/form/FormRow";
// // import dynamic from "next/dynamic";
// // const FormRow = dynamic(() => import("../ui/form/FormRow"), { ssr: false });

// import FormError from "../ui/form/FormError";
// import toast from "react-hot-toast";
// import { updateCurrentUser } from "@/app/_lib/server-actions";
// import { toastStyle } from "@/constants/const";
// import FormButtons from "../ui/form/FormButtons";

// export type PasswordFormInputs = {
//   password: string;
//   newPassword: string;
//   newPasswordConfirm: string;
// };

// function AccountPasswordForm() {
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     reset,
//     formState: { errors, isDirty, isSubmitting },
//   } = useForm<PasswordFormInputs>();

//   const onSubmit: SubmitHandler<PasswordFormInputs> = async ({
//     newPassword,
//   }) => {
//     try {
//       await toast.promise(
//         updateCurrentUser({ newPassword }),
//         {
//           loading: "Modifica in corso...",
//           success: "Password modificata con successo!",
//           error: (err) => `Errore: ${err.message}`,
//         },
//         {
//           style: toastStyle,
//         },
//       );

//       reset();
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   console.log(isDirty);

//   return (
//     <form
//       className="flex flex-col gap-5 md:gap-3"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <FormRow
//         type="password"
//         placeholder="Inserisci la nuova password..."
//         label="Nuova password"
//         id="newPassword"
//         required
//         autoComplete={"new-password"}
//         maxLength={20}
//         disabled={isSubmitting}
//         {...register("newPassword", {
//           required: "Campo obbligatorio.",
//           minLength: {
//             value: 6,
//             message: "La password deve essere almeno di 6 caratteri.",
//           },
//           maxLength: {
//             value: 20,
//             message: "La password non può essere più lunga di 20 caratteri.",
//           },
//         })}
//       />
//       <FormError message={errors.newPassword?.message} />

//       <FormRow
//         type="password"
//         placeholder="Ripeti la nuova password..."
//         label="Ripeti nuova password"
//         id="newPasswordConfirm"
//         required
//         autoComplete={"new-password"}
//         maxLength={20}
//         disabled={isSubmitting}
//         {...register("newPasswordConfirm", {
//           required: "Campo obbligatorio.",
//           validate: (value) =>
//             getValues("newPassword") === value ||
//             "Le password devono corrispondere!",
//         })}
//       />
//       <FormError message={errors.newPasswordConfirm?.message} />

//       <FormButtons
//         isSubmitting={isSubmitting}
//         isDirty={isDirty}
//         onClick={() => reset()}
//         pendingText="Modifica in corso..."
//         defaultText="Modifica password"
//       />
//     </form>
//   );
// }

// export default AccountPasswordForm;

"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import FormRow from "../ui/form/FormRow";
import FormError from "../ui/form/FormError";
import toast from "react-hot-toast";
import { updateCurrentUser } from "@/app/_lib/server-actions";
import { toastStyle } from "@/constants/const";
import Button from "../ui/Button";

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

  const onSubmit: SubmitHandler<PasswordFormInputs> = async ({
    newPassword,
  }) => {
    try {
      await toast.promise(
        updateCurrentUser({ newPassword }),
        {
          loading: "Modifica in corso...",
          success: "Password modificata con successo!",
          error: (err) => `Errore: ${err.message}`,
        },
        {
          style: toastStyle,
        },
      );

      reset();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 md:gap-3"
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

      {/* Pulsanti */}
      <div className="mt-8 flex justify-end gap-2">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-transparent dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
          onClick={() => reset()}
          disabled={isSubmitting || areInputsEmpty}
        >
          Cancella modifiche
        </button>

        <Button
          type="submit"
          className="px-4"
          disabled={isSubmitting || areInputsEmpty}
        >
          {isSubmitting ? "Modifica in corso..." : "Modifica password"}
        </Button>
      </div>
    </form>
  );
}

export default AccountPasswordForm;
