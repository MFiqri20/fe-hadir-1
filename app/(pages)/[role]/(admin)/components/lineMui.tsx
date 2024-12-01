import { RecapPayload } from "@/app/lib/(absen)";
import useCrudModule from "@/hook/useCRUD";
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



export default function SimpleAreaChart() {
  const { useList } = useCrudModule();
  const { data, isFetching, isLoading } = useList<RecapPayload>('absen/week');

const dataRecap = data?.data
  ? [
      { day: "Senin", hadir: data.data.Senin },
      { day: "Selasa", hadir: data.data.Selasa },
      { day: "Rabu", hadir: data.data.Rabu },
      { day: "Kamis", hadir: data.data.Kamis },
      { day: "Jumat", hadir: data.data.Jumat },
      { day: "Sabtu", hadir: data.data.Sabtu },
    ]
  : [];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={dataRecap}
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
          tickMargin={10} // Adds margin between the ticks and the axis line
          axisLine={false} // Hides the X-axis line
          tickLine={false} // Hides tick lines on X-axis
        />
        <YAxis
          ticks={[20, 40, 60, 80, 100]} // Specify ticks to show only from 20 upwards
          domain={[0, 100]}
          interval={0}
          axisLine={false}
          tickLine={false}
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