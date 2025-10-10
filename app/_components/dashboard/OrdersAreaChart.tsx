"use client";

import { capitalize } from "@/app/_lib/utils";
import { colors } from "@/constants/const";
import { format } from "date-fns";
import { it } from "date-fns/locale";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  Legend,
} from "recharts";

type Data = {
  month: string;
  orderCount: number;
  fullDate: Date;
  statusCounts?: { delivered: number; ready: number; unconfirmed: number };
};

function OrdersAreaChart({ data }: { data: Data[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis
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
        />

        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: colors.tooltipBackground,
            border: colors.tooltipBorder,
            borderRadius: "8px",
            fontSize: "14px",
            padding: "10px",
          }}
          labelStyle={{
            color: colors.tooltipText,
            marginBottom: "8px",
            fontWeight: "bold",
          }}
          itemStyle={{ color: colors.tooltipText }}
          labelFormatter={(label, payload) => {
            const dateObj = payload?.[0]?.payload?.fullDate;
            const formatted = dateObj
              ? format(dateObj, "MMMM yyyy", { locale: it })
              : label;
            return `Ordini ${capitalize(formatted)}`;
          }}
        />

        {/* <defs>
          <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
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
        </defs> */}
        {/* <defs>
          <linearGradient id="delivered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="1%" stopColor={colors.delivered} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors.delivered} stopOpacity={0} />
          </linearGradient>
        </defs> */}

        <Bar
          dataKey="statusCounts.delivered"
          name="Consegnati"
          fill={colors.delivered}
          radius={[4, 4, 0, 0]} // angoli arrotondati in alto
          // activeBar={{ stroke: "#ee9873ba", strokeWidth: 1 }}
        >
          <LabelList
            dataKey="statusCounts.delivered"
            position="top"
            fill={colors.delivered}
            fontWeight="bold"
          />
        </Bar>
        <Bar
          dataKey="orderCount"
          name="Totale"
          fill={colors.bar}
          radius={[4, 4, 0, 0]} // angoli arrotondati in alto
          // activeBar={{ stroke: "#e24840", strokeWidth: 1 }}
        >
          <LabelList
            dataKey="orderCount"
            position="top"
            fill={colors.text}
            fontWeight="bold"
          />
        </Bar>
        <Legend verticalAlign="top" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default OrdersAreaChart;
