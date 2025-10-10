"use client";

import { createContext, useContext, useState, type MouseEvent } from "react";
// import ActionDialog from "../ActionDialog";
import dynamic from "next/dynamic";
const ActionDialog = dynamic(() => import("../_ActionDialog"), { ssr: false });

import {
  ButtonProps,
  LinkButtonProps,
  ListProps,
  MenuProps,
  MenusContextValues,
  MenusProps,
  ToggleProps,
} from "@/app/_lib/definitions";
import Link from "next/link";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";

const DropdownMenuContext = createContext<MenusContextValues | null>(null);

function DropdownMenu({ children }: MenusProps) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <DropdownMenuContext.Provider value={{ openId, close, open }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

function Menu({ children }: MenuProps) {
  return <div className="relative">{children}</div>;
}

function Toggle({ id, disabled, className, ariaLabel, children }: ToggleProps) {
  const { openId, close, open } = useDropdownMenu();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    if (openId === "" || openId !== id) open(id);
    else close();
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function List({ id, children }: ListProps) {
  const { openId, close } = useDropdownMenu();

  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return (
    <ul
      className="_top-full _translate-x-1/2 absolute right-1/2 z-1000 origin-top-left rounded border border-gray-200 bg-white py-0.5 font-normal shadow-md dark:border-none dark:shadow-sm"
      ref={ref}
    >
      <div className="rounded bg-white px-1 pt-1 pb-1">{children}</div>
    </ul>
  );
}

function Button({
  children,
  icon,
  onClick,
  open,
  item,
  type,
  onOpenChange,
}: ButtonProps) {
  const { close } = useDropdownMenu();

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <li>
      <ActionDialog
        open={open}
        onOpenChange={(isOpen) => {
          onOpenChange(isOpen);
          if (!isOpen) close();
        }}
        onClose={close}
        item={item}
        type={type}
      >
        <button
          className="flex w-full cursor-pointer items-center gap-3 rounded px-2 py-1.5 text-xs whitespace-nowrap text-gray-800/70 transition-all duration-200 hover:bg-gray-100 dark:bg-gray-50 dark:text-zinc-800 dark:hover:bg-gray-200"
          onClick={handleClick}
        >
          {icon}
          <span>{children}</span>
        </button>
      </ActionDialog>
    </li>
  );
}

function LinkButton({ children, icon, href }: LinkButtonProps) {
  return (
    <li>
      <Link
        className="flex w-full cursor-pointer items-center gap-3 rounded px-2 py-1.5 text-xs whitespace-nowrap text-gray-800/70 transition-all duration-200 hover:bg-gray-100 dark:bg-gray-50 dark:text-zinc-800 dark:hover:bg-gray-200"
        href={href}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
}

DropdownMenu.Menu = Menu;
DropdownMenu.Toggle = Toggle;
DropdownMenu.List = List;
DropdownMenu.Button = Button;
DropdownMenu.LinkButton = LinkButton;

export default DropdownMenu;

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("useDropdownMenu must be used within <DropdownMenu>");
  }
  return context;
}
