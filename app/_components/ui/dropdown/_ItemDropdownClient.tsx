"use client";

import dynamic from "next/dynamic";
const ItemDropdown = dynamic(() => import("./_ItemDropdown"), {
  ssr: false,
});

function ItemDropdownClient({ id, status }: { id: number; status: string }) {
  return (
    <ItemDropdown variation="ordine" itemId={Number(id)} status={status} />
  );
}

export default ItemDropdownClient;
