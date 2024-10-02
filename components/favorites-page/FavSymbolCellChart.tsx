"use client";
import Box from "@mui/material/Box";
import { FavSymbolData } from "@/lib/backend-api/interfaces";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
export default function FavSymbolCellChart({
  favSymbolData,
}: {
  favSymbolData: FavSymbolData;
}) {
  const pData = favSymbolData.candle_15m_list.map((candle) => candle.close);
  const xLabels = favSymbolData.candle_15m_list.map(
    (candle) => candle.timestamp
  );

  return (
    <ChartContainer
      height={100}
      width={150}
      series={[{ type: "line", data: pData }]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      disableAxisListener
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      <LinePlot />
    </ChartContainer>
  );
}
