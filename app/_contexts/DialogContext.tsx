"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DialogData } from "../_lib/definitions";

type State = {
  isOpen: boolean;
  dialogData: DialogData;
  openDialog: (data: DialogData) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<State | null>(null);

export default function DialogContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState<DialogData>({ type: null });

  const openDialog = (data: DialogData) => {
    setDialogData(data);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogData({ type: null });
  };

  return (
    <DialogContext.Provider
      value={{ isOpen, dialogData, openDialog, closeDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "useDialog deve essere usato all'interno del suo provider!",
    );
  }

  return context;
}
