import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
  },
});

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [40, 60, 81, 29, 65, 85];
const xLabels = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

export default function SimpleLineChart() {
  return (
    <div className="font-quick text-2xl">
      <ThemeProvider theme={theme}>
        <LineChart
          className="w-full"
          height={300}
          series={[{ data: pData, color: "#0077B6" }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </ThemeProvider>
    </div>
  );
}
