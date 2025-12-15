"use client";

import { FormEvent, useState } from "react";
import FormRow from "../ui/form/FormRow";
import { updateCurrentUser } from "@/app/_lib/server-actions";
import FormButtons from "../ui/form/FormButtons";
import AvatarImageLoader from "./AvatarImageLoader";
import { toast } from "sonner";

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
      toast.error("Il nome è obbligatorio");
      return;
    }

    if (!hasChanged()) {
      toast.error("Nessuna modifica da salvare");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (avatar && avatar.size > 1 * 1024 * 1024) {
      toast.error("L'immagine deve essere inferiore a 1MB");
      setAvatar(null);
      return;
    }

    setIsSubmitting(true);

    try {
      toast.promise(
        updateCurrentUser({ name: name.trim(), avatar: avatar || undefined }),
        {
          loading: "Modifica del profilo in corso...",
          success: "Profilo modificato con successo!",
          error: (err) => `${err.message}`,
        },
      );
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
      setAvatar(null);
    }
  }

  return (
    <form
      className="flex flex-col gap-5 py-3 md:gap-3"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <div className="flex w-full flex-col gap-3">
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
        </div>

        <AvatarImageLoader
          avatar={avatar}
          setAvatar={setAvatar}
          isSubmitting={isSubmitting}
        />
      </div>

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
