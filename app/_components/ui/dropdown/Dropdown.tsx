"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

import { useDialog } from "@/app/_contexts/DialogContext";
import { Fragment } from "react/jsx-runtime";

const iconStyle = "size-4 text-zinc-700  dark:text-white";

export default function Dropdown({
  type,
  itemId,
  itemName,
  variation,
  status,
}: {
  type?: "overview" | "page";
  variation: string;
  itemId: number;
  itemName?: string;
  status?: string;
}) {
  const { openDialog } = useDialog();

  return (
    <Menu>
      <MenuButton className="data-focus:outline-brand-950 inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline-2 data-hover:bg-gray-200/80 data-open:bg-gray-200/50 dark:data-hover:bg-zinc-700/50 dark:data-open:bg-zinc-700">
        {type === "page" ? (
          <EllipsisVerticalIcon className="size-5" />
        ) : (
          <EllipsisHorizontalIcon className="size-5 text-neutral-600 dark:text-neutral-300" />
        )}
      </MenuButton>

      <MenuItems
        modal={false}
        transition
        anchor="bottom end"
        className={`${type === "overview" ? "w-42 rounded-xl text-base lg:w-34 lg:rounded-lg lg:text-[0.813rem]" : "w-42 rounded-xl text-base"} origin-top-right border border-gray-200 bg-white p-1 text-sm/6 text-white shadow-2xs transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 dark:border-white/10 dark:bg-zinc-900`}
      >
        <MenuItem>
          {({ close }) => (
            <Link
              onClick={close}
              href={
                variation === "ordine"
                  ? type === "page"
                    ? `orders/${itemId}`
                    : `dashboard/orders/${itemId}`
                  : `products/${itemId}`
              }
              className={`${type === "overview" ? "rounded-lg px-3 py-1.5 lg:rounded-md lg:px-1.5 lg:py-1" : "rounded-lg px-3 py-1.5"} group flex w-full cursor-pointer items-center gap-2 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-800/85`}
            >
              <ClipboardDocumentListIcon className={iconStyle} />
              <span className="text-zinc-700 dark:text-white">
                Vedi dettagli
              </span>
            </Link>
          )}
        </MenuItem>

        {variation === "prodotto" && (
          <MenuItem>
            {({ close }) => (
              <Link
                onClick={close}
                href={`products/${itemId}/edit`}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-800/85"
              >
                <PencilIcon className={iconStyle} />
                <span className="text-zinc-700 dark:text-white">Modifica</span>
              </Link>
            )}
          </MenuItem>
        )}

        {variation === "ordine" && status === "unconfirmed" && (
          <MenuItem as={Fragment}>
            <button
              className={`${type === "overview" ? "rounded-lg px-3 py-1.5 lg:rounded-md lg:px-1.5 lg:py-1" : "rounded-lg px-3 py-1.5"} group flex w-full cursor-pointer items-center gap-2 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-800/85`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openDialog({ type: "confirm", itemId });
              }}
            >
              <DocumentCheckIcon className={iconStyle} />
              <span className="text-zinc-700 dark:text-white">Pronto</span>
            </button>
          </MenuItem>
        )}

        {variation === "ordine" && status === "ready" && (
          <MenuItem as={Fragment}>
            <button
              className={`${type === "overview" ? "rounded-lg px-3 py-1.5 lg:rounded-md lg:px-1.5 lg:py-1" : "rounded-lg px-3 py-1.5"} group flex w-full cursor-pointer items-center gap-2 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-800/85`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openDialog({ type: "done", itemId });
              }}
            >
              <CheckIcon className={iconStyle} />
              <span className="text-zinc-700 dark:text-white">Conferma</span>
            </button>
          </MenuItem>
        )}

        {variation === "prodotto" && (
          <MenuItem as={Fragment}>
            <button
              className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-800/85"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openDialog({ type: "delete", itemId, itemName });
              }}
            >
              <TrashIcon className={iconStyle} />
              <span className="text-zinc-700 dark:text-white">Elimina</span>
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
