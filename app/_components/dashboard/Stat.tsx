import type { ReactNode } from "react";

type StatProps = {
  children: ReactNode;
  title: string;
  value: number | string | ReactNode;
  position: string;
};

function Stat({ title, value, position, children }: StatProps) {
  return (
    <div
      className={`dark:text-light grid grow grid-cols-[4.2rem_1fr] grid-rows-[auto_auto] gap-x-2 gap-y-1 rounded-md border border-gray-200 bg-gray-50/30 p-3 text-neutral-700 md:p-4 dark:border-zinc-700/40 dark:bg-zinc-800/40 ${position}`}
    >
      {children}
      <h5 className="self-baseline text-xs font-medium tracking-wide uppercase md:font-semibold">
        {title}
      </h5>
      <p className="self-baseline text-3xl leading-none font-medium">{value}</p>
    </div>
  );
}

export default Stat;
