import { Typography } from "@mui/material";
import { SymbolInfo } from "@/lib/backend-api/interfaces";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { MACDChart } from "./MacdChart";

const BBAND_OVERSHOOTING_THRESHOLD = 0.95;
const BBAND_THRESHOLD_FOR_TRADING_SIGNAL_NORMAL = 0.2;
const BBAND_THRESHOLD_FOR_TRADING_SIGNAL_SIDEWAYS = 0.5;
const BBAND_THRESHOLD_FOR_TRADING_SIGNAL_VOLATILE = 0.0;

interface BBandCellProps {
  color: string;
  text: string;
  ratio: string;
}

const getBBandStatus = (
  bband_ratio: number,
  bband_breadth_ratio: number,
  action: string
) => {
  let bband_ratio_threshold;
  if (bband_breadth_ratio < 0.01) {
    bband_ratio_threshold = BBAND_THRESHOLD_FOR_TRADING_SIGNAL_SIDEWAYS;
  } else if (bband_breadth_ratio < 0.05) {
    bband_ratio_threshold = BBAND_THRESHOLD_FOR_TRADING_SIGNAL_NORMAL;
  } else {
    bband_ratio_threshold = BBAND_THRESHOLD_FOR_TRADING_SIGNAL_VOLATILE;
  }

  if (bband_ratio >= BBAND_OVERSHOOTING_THRESHOLD) {
    return {
      text: `Overbought`,
      ratio: bband_ratio.toFixed(2),
      color: "red",
    };
  } else if (bband_ratio >= bband_ratio_threshold) {
    return {
      text: `> Mid-Band`,
      ratio: bband_ratio.toFixed(2),
      color: "white",
    };
  } else if (bband_ratio >= 0) {
    return {
      text: `${action === "BUY" ? "N-Reversal" : "C-Reversal"}`,
      ratio: bband_ratio.toFixed(2),
      color: action === "BUY" ? "orange" : "red",
    };
  } else if (bband_ratio >= -bband_ratio_threshold) {
    return {
      text: `${action === "SELL" ? "N-Reversal" : "C-Reversal"}`,
      ratio: bband_ratio.toFixed(2),
      color: action === "SELL" ? "orange" : "red",
    };
  } else if (bband_ratio >= -BBAND_OVERSHOOTING_THRESHOLD) {
    return {
      text: "< Mid-Band",
      ratio: bband_ratio.toFixed(2),
      color: "white",
    };
  } else {
    return { text: "Oversold", ratio: bband_ratio.toFixed(2), color: "red" };
  }
};

function RenderBBandCell({ color, text, ratio }: BBandCellProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "4px",
        padding: "0",
        border: 1,
        borderColor: color,
        width: "65px",
        textAlign: "center",
      }}
    >
      <Stack spacing={0}>
        <Typography sx={{ color: color, fontSize: "0.5rem" }}>
          {ratio}
        </Typography>
        <Typography sx={{ color: color, fontSize: "0.6rem" }}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}

function ItemBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Box>
  );
}

function RenderMACDCell({
  percentage,
  colorIndex,
}: {
  percentage: number;
  colorIndex: number;
}) {
  const shades = ["#c63b3b", "#f4cccc", "#ffffff", "#b6d7a8", "#34a701"];
  const color = shades[colorIndex + 2]; // Map color index (-2 to 2) to color scale
  return (
    <Typography
      sx={{
        bgcolor: color,
        fontWeight: "bold",
        borderRadius: "4px",
        paddingX: "2px",
        color: "black",
        width: "65px",
        textAlign: "center",
      }}
    >
      {percentage.toFixed(3)}%
    </Typography>
  );
}

export default function MacdBBCell({
  symbolData,
  interval,
  onClick,
}: {
  symbolData: SymbolInfo;
  interval: string;
  onClick?: () => void;
}) {
  const action = () => {
    if (interval === "15m") {
      return symbolData.action_15m;
    }
    if (interval === "1h") {
      return symbolData.action_1h;
    }
    if (interval === "1d") {
      return symbolData.action_1d;
    }
    return "BUY";
  };

  const actionColor = () => {
    if (action() === "BUY") {
      return "#02e32b";
    }
    return "red";
  };

  const macdPercentage = () => {
    if (interval === "15m") {
      return symbolData.macd_15m_percentage;
    }
    if (interval === "1h") {
      return symbolData.macd_1h_percentage;
    }
    if (interval === "1d") {
      return symbolData.macd_1d_percentage;
    }
    return 0;
  };

  const macdColorIndex = () => {
    if (interval === "15m") {
      return symbolData.macd_15m_hist_color_list[
        symbolData.macd_15m_hist_color_list.length - 1
      ];
    }
    if (interval === "1h") {
      return symbolData.macd_1h_hist_color_list[
        symbolData.macd_1h_hist_color_list.length - 1
      ];
    }
    if (interval === "1d") {
      return symbolData.macd_1d_hist_color_list[
        symbolData.macd_1d_hist_color_list.length - 1
      ];
    }
    return 0;
  };

  const macd_hist_list = () => {
    if (interval === "15m") {
      return symbolData.macd_15m_hist_list;
    }
    if (interval === "1h") {
      return symbolData.macd_1h_hist_list;
    }
    if (interval === "1d") {
      return symbolData.macd_1d_hist_list;
    }
    return [];
  };

  const bband_h = () => {
    if (interval === "15m") {
      return symbolData.bband_upper_15m;
    }
    if (interval === "1h") {
      return symbolData.bband_upper_1h;
    }
    if (interval === "1d") {
      return symbolData.bband_upper_1d;
    }
    return 0;
  };

  const bband_l = () => {
    if (interval === "15m") {
      return symbolData.bband_lower_15m;
    }
    if (interval === "1h") {
      return symbolData.bband_lower_1h;
    }
    if (interval === "1d") {
      return symbolData.bband_lower_1d;
    }
    return 0;
  };

  const bband_ratio = () => {
    if (interval === "15m") {
      return symbolData.bband_ratio_15m;
    }
    if (interval === "1h") {
      return symbolData.bband_ratio_1h;
    }
    if (interval === "1d") {
      return symbolData.bband_ratio_1d;
    }
    return 0;
  };

  const bband = getBBandStatus(
    bband_ratio(),
    (bband_h() - bband_l()) / symbolData.current_price,
    action()
  );

  return (
    <Box
      sx={{
        border: "2px solid #FFFFFF",
        borderRadius: "12px",
        p: 1,
        fontSize: "12px",
        // marginY: "1rem",
      }}
      onClick={onClick}
    >
      <Grid container direction={"row"} spacing={2} sx={{ width: "100%" }}>
        <Grid container size={6} direction={"column"}>
          <Grid>
            <ItemBox>
              <Typography>Interval {interval}</Typography>
              <Typography
                sx={{
                  bgcolor: actionColor(),
                  fontWeight: "bold",
                  borderRadius: "4px",
                  paddingX: "2px",
                  color: "black",
                  width: "45px",
                  textAlign: "center",
                }}
              >
                {action()}
              </Typography>
            </ItemBox>
          </Grid>

          <Grid>
            <ItemBox>
              <Typography sx={{ fontSize: "0.8rem" }}>BBand-H</Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {bband_h().toFixed(2)}
              </Typography>
            </ItemBox>
          </Grid>

          <Grid>
            <ItemBox>
              <Typography sx={{ fontSize: "0.8rem" }}>BBand-L</Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {bband_l().toFixed(2)}
              </Typography>
            </ItemBox>
          </Grid>

          <Grid>
            <ItemBox>
              <Typography sx={{ fontSize: "0.8rem" }}>Price Pos</Typography>
              <RenderBBandCell
                color={bband.color}
                text={bband.text}
                ratio={bband.ratio}
              />
            </ItemBox>
          </Grid>
        </Grid>

        <Grid container size={6} direction={"column"}>
          <Grid>
            <ItemBox>
              <Typography>MACD {interval}</Typography>
              <RenderMACDCell
                percentage={macdPercentage()}
                colorIndex={macdColorIndex()}
              />
            </ItemBox>
          </Grid>
          <Grid>
            <MACDChart macd_hist_list={macd_hist_list()} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
