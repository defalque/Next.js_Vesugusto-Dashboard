"use client";

import Button from "../ui/Button";
import { useDialog } from "@/app/_contexts/DialogContext";

function OrdersActionButton({ id, status }: { id: string; status: string }) {
  const { openDialog } = useDialog();

  return (
    <Button
      className="px-4 text-base sm:text-sm"
      onClick={(e) => {
        e.preventDefault();
        openDialog({
          type: status === "unconfirmed" ? "confirm" : "done",
          itemId: Number(id),
        });
      }}
    >
      {status === "unconfirmed" && "Pronto"}
      {status === "ready" && "Conferma"}
    </Button>
  );
}

export default OrdersActionButton;
