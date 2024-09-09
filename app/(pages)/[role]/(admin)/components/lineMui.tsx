import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Monday", hadir: 40 },
  { day: "Tuesday", hadir: 60 },
  { day: "Wednesday", hadir: 81 },
  { day: "Thursday", hadir: 29 },
  { day: "Friday", hadir: 65 },
  { day: "Saturday", hadir: 85 },
];

export default function SimpleAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0077B6" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#0077B6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 14, fill: "#495057" }} // Customize tick font size and color
          tickMargin={16} // Adds margin between the ticks and the axis line
          axisLine={false} // Hides the X-axis line
          tickLine={false} // Hides tick lines on X-axis
        />
        <YAxis
          ticks={[20, 40, 60, 80, 100]} // Specify ticks to show only from 20 upwards
          domain={[0, 100]}
          interval={0}
          axisLine={false}
          tickLine={false}
          tickMargin={12}
          tickFormatter={(value) => (value === 0 ? "" : value)} // Hide the "0" label
          tick={{ fontSize: 14, fill: "#495057" }} // Customize tick font size and color
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="hadir"
          stroke="#0077B6"
          fillOpacity={1}
          strokeWidth={2}
          fill="url(#colorUv)" // Apply the gradient fill
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
