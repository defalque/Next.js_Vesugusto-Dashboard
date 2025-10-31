"use client";

import { useDialog } from "@/app/_contexts/DialogContext";
import Button from "../ui/Button";

function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const { openDialog } = useDialog();

  return (
    <Button
      className="basis-1/2 px-4 py-2 text-center text-base"
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
