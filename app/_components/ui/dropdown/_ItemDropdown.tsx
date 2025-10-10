"use client";

import { useState } from "react";
import DropdownMenu from "./_DropdownMenu";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  DocumentCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const iconStyle = "size-3 dark:text-gray-700";

function ItemDropdown({
  itemId,
  itemName,
  variation,
  status,
}: {
  itemId: number;
  itemName?: string;
  variation: string;
  status?: string;
}) {
  const [openDialog, setOpenDialog] = useState<
    "delete" | "confirm" | "done" | null
  >(null);

  return (
    <DropdownMenu>
      <DropdownMenu.Menu>
        <DropdownMenu.Toggle
          id={String(itemId)}
          className="_relative cursor-pointer rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:hover:bg-zinc-900 dark:focus:ring-zinc-700"
          ariaLabel="Azioni ordine"
        >
          <EllipsisVerticalIcon className="size-5" />
        </DropdownMenu.Toggle>

        <DropdownMenu.List id={String(itemId)}>
          <DropdownMenu.LinkButton
            icon={
              variation === "ordine" ? (
                <CubeIcon className={iconStyle} />
              ) : (
                <ClipboardDocumentListIcon className={iconStyle} />
              )
            }
            href={
              variation === "ordine" ? `orders/${itemId}` : `products/${itemId}`
            }
          >
            Vedi dettagli
          </DropdownMenu.LinkButton>

          {variation === "ordine" && status === "unconfirmed" && (
            <DropdownMenu.Button
              icon={<DocumentCheckIcon className={iconStyle} />}
              open={openDialog === "confirm"}
              onOpenChange={(isOpen) =>
                setOpenDialog(isOpen ? "confirm" : null)
              }
              onClick={() => setOpenDialog("confirm")}
              item={String(itemId)}
              type="confirm"
            >
              Pronto
            </DropdownMenu.Button>
          )}

          {variation === "ordine" && status === "ready" && (
            <DropdownMenu.Button
              icon={<CheckIcon className={iconStyle} />}
              open={openDialog === "done"}
              onOpenChange={(isOpen) => setOpenDialog(isOpen ? "done" : null)}
              onClick={() => setOpenDialog("done")}
              item={String(itemId)}
              type="done"
            >
              Conferma
            </DropdownMenu.Button>
          )}

          {variation === "prodotto" && (
            <DropdownMenu.LinkButton
              icon={<PencilSquareIcon className={iconStyle} />}
              href={`products/${itemId}/edit`}
            >
              Modifica
            </DropdownMenu.LinkButton>
          )}

          {variation === "prodotto" && (
            <DropdownMenu.Button
              icon={<TrashIcon className={iconStyle} />}
              open={openDialog === "delete"}
              onOpenChange={(isOpen) => setOpenDialog(isOpen ? "delete" : null)}
              onClick={() => setOpenDialog("delete")}
              item={itemName ?? String(itemId)}
              type="delete"
            >
              Elimina
            </DropdownMenu.Button>
          )}
        </DropdownMenu.List>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}

export default ItemDropdown;
