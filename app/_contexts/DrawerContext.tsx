"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type State = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerContext = createContext<State | null>(null);

export default function DrawerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const value = { open, setOpen };
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error(
      "useDrawer deve essere usato all'interno del suo provider!",
    );
  }

  return context;
}
