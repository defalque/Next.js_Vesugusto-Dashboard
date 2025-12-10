"use client";

import { Data } from "@/app/_lib/definitions";
import { capitalize } from "@/app/_lib/utils";
import { colors } from "@/constants/const";
import { format } from "date-fns";
import { it } from "date-fns/locale";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipContentProps,
} from "recharts";

function RevenueChart({ data }: { data: Data[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 30, bottom: 30 }} responsive>
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="10%"
              stopColor={colors.barChartColor}
              stopOpacity={0.65}
            />
            <stop
              offset="100%"
              stopColor={colors.barChartColor}
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke={colors.cartesian} />

        <XAxis
          dataKey="value"
          padding={{ left: 30, right: 30 }}
          tick={{ fill: colors.data, fontWeight: "400", fontSize: "12px" }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip content={CustomTooltip} />

        <Area
          type="bump"
          dataKey="totalRevenues"
          stroke={colors.barChartColor}
          strokeWidth={1.5}
          fillOpacity={1}
          name="Totale guadagni"
          fill="url(#area)"
          unit="€"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueChart;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (active && payload && payload.length) {
    const dateObj = payload?.[0]?.payload?.fullDate;
    const formattedDate = dateObj
      ? capitalize(format(dateObj, "d MMMM yyyy", { locale: it }))
      : label;

    return (
      <div
        className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 dark:border-gray-200 dark:bg-white"
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <p className="mb-1 text-xs text-white dark:text-neutral-800">
          {formattedDate}
        </p>

        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span className="text-xs text-neutral-300 dark:text-neutral-600">
              Totale
            </span>
            <pre className="ml-auto text-sm text-white dark:text-neutral-800">
              {entry.value.toFixed(2)} €
            </pre>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
