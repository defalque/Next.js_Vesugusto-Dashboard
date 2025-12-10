"use client";

import { ReactNode, useState } from "react";

import { AnimatePresence, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

function Charts({
  revenueChart,
  ordersChart,
}: {
  revenueChart: ReactNode;
  ordersChart: ReactNode;
}) {
  const [chart, setChart] = useState<"revenue" | "orders">("revenue");

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
        <div className="_bg-gray-50/30 _dark:bg-zinc-800/40 col-span-full rounded-md border border-gray-200 dark:border-zinc-700/40">
          <div className="flex flex-col border-b border-gray-200 sm:flex-row dark:border-zinc-700/40">
            <div className="basis-2/3 border-gray-200 p-5 sm:border-r dark:border-zinc-700/40">
              <div className="relative h-full overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.div
                    initial={{ y: "-110%", opacity: 0, scale: 0.97 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: "110%", opacity: 0, scale: 0.97 }}
                    key={chart}
                    className="space-y-1"
                  >
                    {chart === "revenue" ? (
                      <>
                        <p className="text-sm font-semibold text-neutral-700 md:text-base dark:text-white">
                          Area Chart - Andamento dei ricavi
                        </p>
                        <p className="text-xs text-neutral-500 md:text-sm dark:text-neutral-400">
                          Mostra i ricavi complessivi dalla vendita dei prodotti
                          dell&apos;e-commerce negli ultimi 12 mesi,
                          evidenziando i periodi di crescita e calo.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-neutral-700 md:text-base dark:text-white">
                          Bar Chart - Andamento degli ordini
                        </p>
                        <p className="text-xs text-neutral-500 md:text-sm dark:text-neutral-400">
                          Mostra in modo interattivo l’evoluzione del numero di
                          ordini ricevuti durante l’ultimo anno, evidenziando
                          picchi di attività e periodi di calo.
                        </p>
                      </>
                    )}
                  </m.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex basis-1/3 divide-x divide-gray-200 border-t border-t-gray-200 text-xl sm:border-none dark:divide-zinc-700/40 dark:border-t-zinc-700/40">
              <ChartButton
                label="Ricavi"
                onClick={() => setChart("revenue")}
                isActive={chart === "revenue"}
              />
              <ChartButton
                label="Ordini"
                onClick={() => setChart("orders")}
                isActive={chart === "orders"}
              />
            </div>
          </div>

          <div className="relative min-h-[300px] w-full overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                initial={{
                  x: chart === "revenue" ? "-100%" : "100%",
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: chart === "revenue" ? "-100%" : "100%",
                  opacity: 0,
                }}
                key={chart}
                className="min-h-[300px] w-full min-w-0"
              >
                {chart === "revenue" ? revenueChart : ordersChart}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default Charts;

function ChartButton({
  label,
  onClick,
  isActive,
}: {
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="relative z-10 w-1/2 cursor-pointer py-4 text-base font-semibold text-neutral-700 sm:py-0 md:text-lg lg:text-xl dark:text-white"
    >
      <span className="relative z-10 brightness-150">{label}</span>
      {isActive && (
        <m.div
          layoutId="tab"
          className="absolute top-0 z-0 h-full w-full bg-gray-300/10 dark:bg-zinc-900/50"
        />
      )}
    </button>
  );
}
