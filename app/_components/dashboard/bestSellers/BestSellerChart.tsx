"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipContentProps,
  LegendPayload,
  Sector,
} from "recharts";

import Link from "next/link";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

const COLORS = [
  "var(--color-rose-500)",
  "var(--color-violet-500)",
  "var(--color-sky-400)",
  "var(--color-emerald-400)",
  "var(--color-yellow-400)",
];

type Data = {
  id: number;
  name: string;
  value: number;
};

function BestSellersChart({ data }: { data: Data[] }) {
  return (
    <div className="w-full min-w-0 flex-1">
      <ResponsiveContainer width="100%" height={405} minHeight={405}>
        <PieChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="80%"
            labelLine={false}
            dataKey="value"
            paddingAngle={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                tabIndex={-1}
              />
            ))}
          </Pie>

          <Tooltip content={CustomTooltip} />

          <Legend content={CustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<string | number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-zinc-500 bg-zinc-800 p-2.5 text-xs font-medium text-white dark:border-gray-400 dark:bg-white dark:text-black">
        Presente in <strong>{payload[0].value}</strong> ordini
      </div>
    );
  }

  return null;
};

interface CustomLegendProps {
  payload?: readonly LegendPayload[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload) return null;

  return (
    <ul className="mt-1 flex flex-wrap justify-center gap-2">
      {payload?.map((entry) => {
        const dataItem = entry.payload as Data;

        return (
          <li key={`item-${dataItem.id}`}>
            <Link
              href={`/dashboard/products/${dataItem.id}`}
              className="dark:text-light focus flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-neutral-700 transition-colors duration-200 hover:bg-gray-100/70 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/70"
            >
              <span
                className="inline-block h-3 w-3 rounded-xs"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">{dataItem.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}: PieSectorDataItem) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
    </g>
  );
};

export default BestSellersChart;
