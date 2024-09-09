import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <BarChart
      borderRadius={6}
      xAxis={[{ scaleType: "band", data: ["PE", "P", "A"] }]}
      series={[{ data: [80, 100, 45], color: "#0077B6" }]}
      className="w-full"
      height={300}
    />
  );
}
