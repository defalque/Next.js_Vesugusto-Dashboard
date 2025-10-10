"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ActionDialog = dynamic(() => import("../ui/_ActionDialog"), {
  ssr: false,
});
import Button from "../ui/Button";

function ActionButton({ status, id }: { status: string; id: number }) {
  const [dialog, setDialog] = useState<"confirm" | "done" | null>(null);

  return (
    <ActionDialog
      open={status === "unconfirmed" ? dialog === "confirm" : dialog === "done"}
      onOpenChange={(isOpen) =>
        setDialog(
          isOpen ? (status === "unconfirmed" ? "confirm" : "done") : null,
        )
      }
      item={String(id)}
      type={status === "unconfirmed" ? "confirm" : "done"}
      onClose={() => setDialog(null)}
    >
      <Button
        className="px-4 text-center text-xs"
        onClick={(e) => {
          e.preventDefault();
          setDialog(status === "unconfirmed" ? "confirm" : "done");
        }}
      >
        {status === "unconfirmed" && "Pronto"}
        {status === "ready" && "Conferma"}
      </Button>
    </ActionDialog>
  );
}

export default ActionButton;
