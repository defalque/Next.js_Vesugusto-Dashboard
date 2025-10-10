import type { ReactNode } from "react";

type StatProps = {
  children: ReactNode;
  title: string;
  value: number | string | ReactNode;
};

function Stat({ title, value, children }: StatProps) {
  return (
    <div className="border-grey-100 grid grow grid-cols-[4.2rem_auto] grid-rows-[auto_auto] gap-x-5 gap-y-1 rounded-md bg-gray-50/65 p-4 lg:grid-cols-[auto_auto] dark:bg-zinc-800/40">
      {children}
      <h5 className="text-grey-500 self-baseline text-xs font-medium tracking-wide uppercase md:font-semibold">
        {title}
      </h5>
      <p className="self-baseline text-3xl leading-none font-medium">{value}</p>
    </div>
  );
}

export default Stat;
