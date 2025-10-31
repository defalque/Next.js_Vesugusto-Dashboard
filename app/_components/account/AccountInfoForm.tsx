"use client";

import { FormEvent, useState } from "react";
import FileInput from "../ui/FileInput";
import FormRow from "../ui/form/FormRow";
import toast from "react-hot-toast";
import { toastStyle } from "@/constants/const";
import { updateCurrentUser } from "@/app/_lib/server-actions";
import FormButtons from "../ui/form/FormButtons";

function AccountInfoForm({
  userInfo,
}: {
  userInfo: {
    name: string;
    email: string;
  };
}) {
  const [name, setName] = useState(userInfo.name || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function hasChanged() {
    return name !== userInfo.name || avatar !== null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast("Il nome è obbligatorio", {
        icon: "❌",
        style: toastStyle,
      });
      return;
    }

    if (!hasChanged()) {
      toast("Nessuna modifica da salvare", {
        icon: "❌",
        style: toastStyle,
      });
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (avatar && avatar.size > 5 * 1024 * 1024) {
      toast("L'immagine deve essere inferiore a 5MB", {
        icon: "❌",
        style: toastStyle,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await toast.promise(
        updateCurrentUser({ name: name.trim(), avatar: avatar || undefined }),
        {
          loading: "Modifica in corso...",
          success: "Informazioni modificate con successo!",
          error: (err) => `Errore: ${err.message}`,
        },
        {
          style: toastStyle,
        },
      );

      // Reset avatar state after successful upload
      // setAvatar(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
      setAvatar(null);
    }
  }

  return (
    <form className="flex flex-col gap-5 p-3 md:gap-3" onSubmit={handleSubmit}>
      <FormRow
        type="text"
        id="email"
        label="Email"
        value={userInfo.email}
        disabled
        nonInteractive
      />

      <FormRow
        type="text"
        id="nome"
        label="Nome"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        disabled={isSubmitting}
      />

      <FileInput
        type="file"
        accept="image/*"
        label="Scegli nuova immagine del profilo"
        disabled={isSubmitting}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
          }
        }}
      />

      <FormButtons
        isSubmitting={isSubmitting}
        hasChanged={hasChanged}
        pendingText="Modifica in corso..."
        defaultText="Modifica informazioni"
        onClick={() => {
          setName(userInfo.name || "");
          setAvatar(null);
        }}
      />
    </form>
  );
}

export default AccountInfoForm;
