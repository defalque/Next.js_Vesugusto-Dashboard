"use client";

import { useDialog } from "@/app/_contexts/DialogContext";

function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const { openDialog } = useDialog();

  return (
    <button
      type="button"
      className="touch-hitbox flex cursor-pointer items-center rounded-lg border border-inherit bg-red-500 px-3 py-2.5 text-base font-semibold text-white inset-shadow-2xs transition-colors duration-300 hover:bg-red-600 sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-red-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-red-700"
      onClick={(e) => {
        e.preventDefault();
        openDialog({
          type: "delete",
          itemId: id,
          itemName: name,
        });
      }}
    >
      Elimina
    </button>
  );
}

export default DeleteProductButton;
