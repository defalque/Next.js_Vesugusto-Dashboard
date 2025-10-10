"use client";

import { ReactNode } from "react";
import ActionDialog from "../_ActionDialog";

function DropdownDialog({
  openDialog,
  setOpenDialog,
  id,
  itemName,
  status,
  children,
}: {
  openDialog: boolean;
  setOpenDialog: (value: "confirm" | "done" | "delete" | null) => void;
  id: number;
  itemName?: string;
  status: string | undefined;
  children: ReactNode;
}) {
  return (
    <ActionDialog
      open={
        (status === "unconfirmed" && openDialog) ||
        (status === "ready" && openDialog) ||
        (status === "delete" && openDialog)
      }
      onOpenChange={(isOpen) =>
        setOpenDialog(
          isOpen
            ? status === "unconfirmed"
              ? "confirm"
              : status === "ready"
                ? "done"
                : status === "delete"
                  ? "delete"
                  : null
            : null,
        )
      }
      item={itemName ?? String(id)}
      type={
        status === "unconfirmed"
          ? "confirm"
          : status === "ready"
            ? "done"
            : status === "delete"
              ? "delete"
              : ""
      }
      onClose={() => setOpenDialog(null)}
    >
      {children}
    </ActionDialog>
  );
}

export default DropdownDialog;
