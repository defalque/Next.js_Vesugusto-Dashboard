"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { LatestOrdersInfo } from "@/app/_lib/definitions";
import { formatCurrency } from "@/app/_lib/utils";

import StatusTag from "../orders/StatusTag";
import Dropdown from "../ui/dropdown/Dropdown";

import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";

import { AnimatePresence, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

function OrdersActivity({ orders }: { orders: LatestOrdersInfo[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [filterDate, setFilterDate] = useState(true);
  const [filterInput, setFilterInput] = useState("");

  const [direction, setDirection] = useState(1);
  const variants = {
    initial: (direction: number) => {
      return { x: `${110 * direction}%`, opacity: 0 };
    },
    active: { x: "0%", opacity: 1 },
    exit: (direction: number) => {
      return { x: `${-110 * direction}%`, opacity: 0 };
    },
  };

  const array = useMemo(() => {
    let result;

    if (filterDate === true) {
      result = orders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
      );
    } else {
      result = orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
      );
    }

    if (filterInput) {
      result = orders.filter((order) =>
        order.email.toLowerCase().includes(filterInput.trim().toLowerCase()),
      );
    }
    return result;
  }, [filterDate, filterInput, orders]);

  const totalOrdersCount = array.length;

  const totalPages = Math.ceil(totalOrdersCount / 5);
  const from = (currentPage - 1) * 5;
  const to = from + 5 - 1;

  const displayedOrders = array.slice(from, to + 1);

  return (
    <LazyMotion features={loadFeatures}>
      <div className="-mx-(--box-padding) flex overflow-x-auto py-(--box-padding) md:mx-0">
        <div className="h-105 grow px-(--box-padding) md:px-0 lg:h-100">
          <div className="flex items-center justify-between pb-(--box-padding)">
            <input
              type="text"
              className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-sm focus:border-zinc-400 focus:ring-2 focus:ring-gray-300 focus:outline-none lg:py-1 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-400 dark:focus:ring-zinc-600"
              placeholder="Filtra ordini per email..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />

            <button
              disabled={displayedOrders.length === 0}
              onClick={() => setFilterDate((prev) => !prev)}
              className="focus dark:text-light flex cursor-pointer items-center gap-1.5 self-stretch rounded-md border border-gray-300 bg-white px-2 py-2 font-medium text-neutral-700 transition-colors duration-200 hover:bg-gray-100/70 disabled:cursor-not-allowed disabled:hover:bg-white lg:py-1 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/70 dark:disabled:hover:bg-zinc-900/60"
            >
              Ordina
              {filterDate ? (
                <BarsArrowUpIcon className="dark:text-light size-4 text-neutral-700" />
              ) : (
                <BarsArrowDownIcon className="dark:text-light size-4 text-neutral-700" />
              )}
            </button>
          </div>

          {displayedOrders.length === 0 && (
            <div className="h-77 px-0.5 pt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Nessun risultato.
            </div>
          )}

          {displayedOrders.length > 0 && (
            <>
              <ul className="_overflow-y-auto _divide-y _divide-gray-200 _dark:divide-zinc-700/40 flex h-77 flex-col overflow-hidden">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <m.div
                    variants={variants}
                    initial="initial"
                    animate="active"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                    key={currentPage}
                  >
                    {displayedOrders.map((order) => (
                      <li
                        key={order.id}
                        className="grid grid-cols-[15rem_7.5rem_6rem_auto] items-center justify-between gap-4 px-0.5 py-3"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={order.users.image}
                            className="shrink-0 rounded-full"
                            width={28}
                            height={28}
                            alt={`Immagine del profilo di ${order.name}`}
                          />
                          <div className="truncate">
                            <p className="truncate">{order.name}</p>
                            <p className="truncate text-xs text-zinc-500">
                              {order.email}
                            </p>
                          </div>
                        </div>

                        <span className="text-center font-medium text-neutral-600 dark:text-neutral-300">
                          {formatCurrency(order.totalCost)}
                        </span>

                        <StatusTag
                          status={order.status}
                          className="text-[0.6rem]"
                        />

                        <Dropdown
                          type="overview"
                          variation="ordine"
                          itemId={Number(order.id)}
                          status={order.status}
                        />
                      </li>
                    ))}
                  </m.div>
                </AnimatePresence>
              </ul>

              <div className="mt-auto flex items-center justify-between px-0.5 pt-3">
                <div className="text-sm font-medium text-neutral-600 lg:text-xs dark:text-neutral-300">
                  Ordini{" "}
                  <span className="font-bold text-black dark:text-white">
                    {from + 1}
                  </span>{" "}
                  a{" "}
                  <span className="font-bold text-black dark:text-white">
                    {currentPage === totalPages ? totalOrdersCount : to + 1}
                  </span>{" "}
                  di{" "}
                  <span className="font-bold text-black dark:text-white">
                    {totalOrdersCount}
                  </span>
                </div>

                <div className="space-x-3 text-sm lg:space-x-2 lg:text-xs">
                  {currentPage && (
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        if (currentPage === 0) {
                          return;
                        }
                        setDirection(-1);
                        setCurrentPage((prev) => prev - 1);
                      }}
                      className="bg-brand-950 hover:bg-brand-900 dark:bg-brand-dark-600 dark:hover:bg-brand-dark-400 border-brand-dark-100 disabled:hover:bg-brand-950 dark:disabled:hover:bg-brand-dark-600 cursor-pointer rounded px-2 py-2 font-semibold text-white transition-colors duration-150 text-shadow-2xs disabled:cursor-not-allowed disabled:opacity-50 lg:py-1 dark:border"
                    >
                      Indietro
                    </button>
                  )}
                  {currentPage && (
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        if (currentPage === totalPages) {
                          setCurrentPage(1);
                          setDirection(-1);
                          return;
                        }
                        setDirection(1);
                        setCurrentPage((prev) => prev + 1);
                      }}
                      className="bg-brand-950 hover:bg-brand-900 dark:bg-brand-dark-600 dark:hover:bg-brand-dark-400 border-brand-dark-100 disabled:hover:bg-brand-950 dark:disabled:hover:bg-brand-dark-600 cursor-pointer rounded px-2 py-2 font-semibold text-white transition-colors duration-150 text-shadow-2xs disabled:cursor-not-allowed disabled:opacity-50 lg:py-1 dark:border"
                    >
                      Avanti
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </LazyMotion>
  );
}

export default OrdersActivity;
