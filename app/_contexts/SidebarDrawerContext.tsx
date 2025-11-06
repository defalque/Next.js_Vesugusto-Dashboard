"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type State = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeDialog: () => void;
};

const SidebarDrawerContext = createContext<State | null>(null);

export default function SidebarDrawerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);

  const values = { isOpen, setIsOpen, closeDialog };

  return (
    <SidebarDrawerContext.Provider value={values}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);

  if (!context) {
    throw new Error(
      "useSidebarDrawer deve essere usato all'interno del suo provider!",
    );
  }

  return context;
}
