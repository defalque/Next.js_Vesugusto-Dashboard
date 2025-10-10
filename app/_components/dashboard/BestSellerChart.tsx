"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  // PieLabelRenderProps,
} from "recharts";
import { colors } from "@/constants/const";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // const renderValueLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   value,
  // }: PieLabelRenderProps) => {
  //   const RADIAN = Math.PI / 180;

  //   // Safely resolve innerRadius - handle string, number, and function types
  //   let iRadius: number;
  //   if (typeof innerRadius === "function") {
  //     iRadius = 0; // fallback to 0 since we can't call without proper context
  //   } else if (typeof innerRadius === "string") {
  //     // Handle percentage strings - assume viewport context of ~400px
  //     if (innerRadius.includes("%")) {
  //       const percentage = parseFloat(innerRadius.replace("%", ""));
  //       iRadius = (percentage / 100) * 200; // Assume 200px as base radius for percentage calculation
  //     } else {
  //       iRadius = parseFloat(innerRadius) || 0;
  //     }
  //   } else {
  //     iRadius = Number(innerRadius) || 0;
  //   }

  //   // Safely resolve outerRadius - handle string, number, and function types
  //   let oRadius: number;
  //   if (typeof outerRadius === "function") {
  //     oRadius = 200; // fallback to reasonable default
  //   } else if (typeof outerRadius === "string") {
  //     // Handle percentage strings - assume viewport context of ~400px
  //     if (outerRadius.includes("%")) {
  //       const percentage = parseFloat(outerRadius.replace("%", ""));
  //       oRadius = (percentage / 100) * 200; // Assume 200px as base radius for percentage calculation
  //     } else {
  //       oRadius = parseFloat(outerRadius) || 200;
  //     }
  //   } else {
  //     oRadius = Number(outerRadius) || 200;
  //   }

  //   // Calculate radius for label positioning
  //   const radius = iRadius + (oRadius - iRadius) * 0.6; // Position labels closer to outer edge

  //   // Safely resolve cx and cy - handle string, number types
  //   const centerX = typeof cx === "string" ? parseFloat(cx) || 0 : (cx ?? 0);
  //   const centerY = typeof cy === "string" ? parseFloat(cy) || 0 : (cy ?? 0);

  //   const x = centerX + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  //   const y = centerY + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="#fff"
  //       textAnchor="middle"
  //       dominantBaseline="central"
  //       fontSize={14}
  //       fontWeight="bold"
  //       style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }} // Add shadow for better readability
  //     >
  //       {value}
  //     </text>
  //   );
  // };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="80%"
            // label={renderValueLabel}
            labelLine={false}
            dataKey="value"
            // paddingAngle={3}
            legendType="circle"
            onClick={(entry) => {
              if (entry?.id) {
                router.push(`/dashboard/products/${entry.id}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: colors.tooltipBackground,
              border: colors.tooltipBorder,
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            labelStyle={{ color: colors.tooltipText, fontWeight: "bold" }}
            itemStyle={{ color: colors.tooltipText }}
          />

          <Legend
            content={({ payload }) => (
              <div>
                <ul className="flex flex-wrap justify-center gap-2">
                  {payload?.map((entry, index) => (
                    <li
                      key={`item-${index}`}
                      className="flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1 dark:border-none dark:bg-zinc-700/50"
                    >
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-xs">{entry.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BestSellersChart;
