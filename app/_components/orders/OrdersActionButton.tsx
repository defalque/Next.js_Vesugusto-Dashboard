"use client";

import { ReactNode } from "react";
import { useDialog } from "@/app/_contexts/DialogContext";

function OrdersActionButton({ id, status }: { id: string; status: string }) {
  const { openDialog } = useDialog();

  let actionButton: ReactNode;

  switch (status) {
    case "unconfirmed":
      actionButton = (
        <button
          className="touch-hitbox flex cursor-pointer items-center rounded-lg border border-inherit bg-sky-500 px-3 py-2.5 text-base font-semibold text-white inset-shadow-2xs transition-colors duration-300 hover:bg-sky-600 sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-sky-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-sky-700"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            openDialog({
              type: "confirm",
              itemId: Number(id),
            });
          }}
        >
          Pronto
        </button>
      );
      break;

    case "ready":
      actionButton = (
        <button
          className="touch-hitbox flex cursor-pointer items-center rounded-lg border border-inherit bg-emerald-500 px-3 py-2.5 text-base font-semibold text-white inset-shadow-2xs transition-colors duration-300 hover:bg-emerald-600 sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-emerald-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-emerald-700"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            openDialog({
              type: "done",
              itemId: Number(id),
            });
          }}
        >
          Conferma
        </button>
      );
      break;
  }

  return actionButton;
}

export default OrdersActionButton;
