"use client";

import { Data } from "@/app/_lib/definitions";
import { capitalize } from "@/app/_lib/utils";
import { colors } from "@/constants/const";
import { format } from "date-fns";
import { it } from "date-fns/locale"; // Import locale italiano

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  // LabelList,
} from "recharts";

function RevenueChart({ data }: { data: Data[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="1%"
              stopColor={colors.barChartColor}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={colors.barChartColor}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <XAxis
          // padding={{ left: 40, right: 40 }}
          dataKey="month"
          tick={{ fill: colors.bar, fontWeight: "bold" }} // Colore del testo (tick)
          tickLine={{ stroke: colors.bar }} // Linea del tick
          axisLine={{ stroke: colors.bar }} // Linea dell'asse
        />

        <YAxis
          allowDecimals={false}
          tick={{ fill: colors.bar, fontWeight: "bold", fontSize: "0.8rem" }} // Colore del testo (tick)
          tickLine={{ stroke: colors.bar }} // Linea del tick
          axisLine={{ stroke: colors.bar }} // Linea dell'asse
          unit="€"
        />

        <Tooltip
          contentStyle={{
            backgroundColor: colors.tooltipBackground,
            border: colors.tooltipBorder,

            borderRadius: "8px",
            // fontWeight: "bold",
            fontSize: "14px",
          }}
          labelStyle={{ color: colors.tooltipText, fontWeight: "bold" }}
          itemStyle={{ color: colors.tooltipText }}
          labelFormatter={(label, payload) => {
            const dateObj = payload?.[0]?.payload?.fullDate;
            const formatted = dateObj
              ? format(dateObj, "MMMM yyyy", { locale: it })
              : label;
            return `Guadagni ${capitalize(formatted)}`;
          }}
        />

        <Area
          type="monotone"
          dataKey={"orderCount"}
          stroke={colors.barChartColor}
          strokeWidth={1}
          fillOpacity={1}
          name="Totale guadagni"
          fill="url(#area)"
          unit="€"
        >
          {/* <LabelList
            dataKey="orderCount"
            position="top"
            fill={colors.text}
            fontWeight="bold"
            content={(props) => {
              const { x, y, value } = props;
              return (
                <text
                  x={Number(x) + 9}
                  y={y}
                  dy={-15}
                  fontSize={16}
                  fill={colors.text}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {value}€
                </text>
              );
            }}
          /> */}
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueChart;
