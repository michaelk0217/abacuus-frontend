import { BarChart, BarPlot } from "@mui/x-charts/BarChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";

interface MACDChartProps {
  macd_hist_list: number[];
}

export const MACDChart = ({ macd_hist_list }: MACDChartProps) => {
  const shades = ["#c63b3b", "#f4cccc", "#ffffff", "#b6d7a8", "#34a701"];
  return (
    <ChartContainer
      width={150}
      height={100}
      series={[
        {
          data: macd_hist_list,
          color: "#B4B4B4",
          type: "bar",
        },
      ]}
      xAxis={[
        { scaleType: "band", data: macd_hist_list.map((_, index) => index) },
      ]}
      margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
    >
      <BarPlot />
    </ChartContainer>
  );
};
