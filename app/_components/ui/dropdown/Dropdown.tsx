"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

import { useDialog } from "@/app/_contexts/DialogContext";

const iconStyle = "size-4 text-zinc-700  dark:text-white";

export default function Dropdown({
  itemId,
  itemName,
  variation,
  status,
}: {
  variation: string;
  itemId: number;
  itemName?: string;
  status?: string;
}) {
  const { openDialog } = useDialog();

  return (
    <Menu>
      <MenuButton className="data-focus:outline-brand-950 _shadow- _shadow-zinc-800/5 _bg-gray-50 _dark:bg-zinc-800 _dark:shadow-white/10 inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline-2 data-hover:bg-gray-200/80 data-open:bg-gray-200/50 dark:data-hover:bg-zinc-700/50 dark:data-open:bg-zinc-700">
        <EllipsisVerticalIcon className="size-5" />
      </MenuButton>

      <MenuItems
        // modal={false}
        transition
        anchor="bottom end"
        className="_bg-white/5 w-42 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 dark:border-white/5 dark:bg-zinc-800"
      >
        <MenuItem>
          <Link
            href={
              variation === "ordine" ? `orders/${itemId}` : `products/${itemId}`
            }
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-700"
          >
            <ClipboardDocumentListIcon className={iconStyle} />
            <span className="text-zinc-700 dark:text-white">Vedi dettagli</span>
          </Link>
        </MenuItem>

        {variation === "prodotto" && (
          <MenuItem>
            <Link
              href={`products/${itemId}/edit`}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-700"
            >
              <PencilIcon className={iconStyle} />
              <span className="text-zinc-700 dark:text-white">Modifica</span>
            </Link>
          </MenuItem>
        )}

        {variation === "ordine" && status === "unconfirmed" && (
          <MenuItem>
            <button
              className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-700"
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
          <MenuItem>
            <button
              className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-700"
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
          <MenuItem>
            <button
              className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200/50 dark:data-focus:bg-zinc-700"
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
