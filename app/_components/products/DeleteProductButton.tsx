"use client";

import { useDialog } from "@/app/_contexts/DialogContext";
import Button from "../ui/Button";

function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const { openDialog } = useDialog();

  return (
    <Button
      className="px-4"
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
    </Button>
  );
}

export default DeleteProductButton;
