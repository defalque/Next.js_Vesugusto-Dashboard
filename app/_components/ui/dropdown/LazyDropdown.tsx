"use client";

import dynamic from "next/dynamic";
const Dropdown = dynamic(() => import("./Dropdown"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-7 w-8 rounded bg-gray-200 dark:bg-zinc-700"></div>
  ),
});

type OrderDropdown = {
  type: "page" | "overview";
  variation: "ordine";
  itemId: number;
  status: string;
};

type ProductDropdown = {
  variation: "prodotto";
  itemId: number;
  status: string;
};

type Dropdown = OrderDropdown | ProductDropdown;

function LazyDropdown({ ...props }: Dropdown) {
  return <Dropdown {...props} />;
}

export default LazyDropdown;
