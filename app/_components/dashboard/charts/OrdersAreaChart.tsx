"use client";

import { capitalize } from "@/app/_lib/utils";
import { Data } from "@/app/_lib/definitions";
import { colors } from "@/constants/const";
import { format } from "date-fns";
import { it } from "date-fns/locale";

import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  TooltipContentProps,
  // Legend,
} from "recharts";

function OrdersAreaChart({ data }: { data: Data[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 30, right: 20, left: 20, bottom: 30 }}
      >
        <CartesianGrid vertical={false} stroke={colors.cartesian} />

        <XAxis
          dataKey="value"
          tick={{ fill: colors.data, fontWeight: "400", fontSize: "13px" }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          content={CustomTooltip}
          cursor={{ fill: colors.tooltipHover }}
        />

        <Bar
          dataKey="statusCounts.delivered"
          name="Consegnati"
          fill={colors.delivered}
          radius={[4, 4, 4, 4]}
        />

        <Bar
          dataKey="totalOrders"
          name="Totale"
          fill={colors.bar}
          radius={[4, 4, 4, 4]}
        />

        {/* <Legend verticalAlign="bottom" content={CustomLegend} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default OrdersAreaChart;

// interface CustomLegendProps {
//   payload?: {
//     value: string;
//     color: string;
//     type?: string;
//     id?: string;
//   }[];
// }

// const CustomLegend = ({ payload }: CustomLegendProps) => {
//   if (!payload) return null;

//   return (
//     <div className="mt-4 flex justify-center gap-4">
//       {payload.map((entry, index) => (
//         <div
//           key={`item-${index}`}
//           className="flex items-center gap-1 text-xs text-neutral-800 dark:text-white"
//         >
//           <span
//             className="inline-block aspect-square size-2.5 rounded-xs"
//             style={{
//               backgroundColor: entry.color,
//             }}
//           />
//           {entry.value}
//         </div>
//       ))}
//     </div>
//   );
// };

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
            <div
              className="size-2 rounded-xs"
              style={{
                backgroundColor: entry.color,
              }}
            />
            <span className="text-xs text-neutral-300 dark:text-neutral-600">
              {entry.name}
            </span>
            <pre className="ml-auto text-sm text-white dark:text-neutral-800">
              {entry.value}
            </pre>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
