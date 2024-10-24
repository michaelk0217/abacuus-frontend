import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { SymbolInfo, CandleData } from "@/lib/backend-api/interfaces";

export default function SymbolDetailCandlestickChart({
  symbolData,
  interval,
}: {
  symbolData: SymbolInfo;
  interval: string;
}) {
  const selectedIntervalData = () => {
    if (interval === "1h") {
      return symbolData.candle_1h_data_list;
    } else if (interval === "1d") {
      return symbolData.candle_1d_data_list;
    }
    return symbolData.candle_15m_data_list;
  };

  const candleData = selectedIntervalData().map((data: CandleData) => [
    data.open,
    data.close,
    data.low,
    data.high,
  ]);

  const bbandUpper = selectedIntervalData().map((data: CandleData) =>
    data.bband_upper.toFixed(2)
  );
  const bbandMiddle = selectedIntervalData().map((data: CandleData) =>
    data.bband_middle.toFixed(2)
  );
  const bbandLower = selectedIntervalData().map((data: CandleData) =>
    data.bband_lower.toFixed(2)
  );

  const lastTimestamp = symbolData.updated_at_timestamp;
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    // year: "numeric",
    // month: "short",
    // day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    // timeZoneName: "short",
  });
  const dates = selectedIntervalData().map((_, index) =>
    dateFormatter.format(
      new Date(
        lastTimestamp * 1000 -
          (symbolData.candle_1h_data_list.length - 1 - index) * 3600 * 1000
      )
    )
  );

  const option: EChartsOption = {
    title: {
      text: "Candlestick Chart with Bollinger Bands",
      left: "center",
      show: false,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "category",
      data: dates,
      boundaryGap: false,
      show: true,
    },
    yAxis: {
      scale: true,
      show: true,
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    series: [
      {
        name: "Candlestick",
        type: "candlestick",
        data: candleData,
        itemStyle: {
          color0: "#ec0000",
          color: "#00da3c",
          borderColor0: "#8A0000",
          borderColor: "#008F28",
        },
      },
      {
        name: "Bollinger Upper",
        type: "line",
        data: bbandUpper,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: "#FF0000",
          width: 1,
        },
      },
      {
        name: "Bollinger Middle",
        type: "line",
        data: bbandMiddle,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: "#0000FF",
          width: 1,
        },
      },
      {
        name: "Bollinger Lower",
        type: "line",
        data: bbandLower,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: "#00FF00",
          width: 1,
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
}
