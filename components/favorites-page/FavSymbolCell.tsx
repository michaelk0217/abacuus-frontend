"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FavSymbolData } from "@/lib/backend-api/interfaces";
import { useEffect, useState } from "react";
import FavSymbolCellChart from "./FavSymbolCellChart";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";

const BBAND_OVERSHOOTING_THRESHOLD = 0.95;
const BBAND_THRESHOLD_FOR_TRADING_SIGNAL_NORMAL = 0.2;
const BBAND_THRESHOLD_FOR_TRADING_SIGNAL_SIDEWAYS = 0.5;
const BBAND_THRESHOLD_FOR_TRADING_SIGNAL_VOLATILE = 0.0;

interface MACDCellProps {
  percentage: number;
  colorIndex: number;
}

interface BBandCellProps {
  color: string;
  text: string;
  ratio: string;
}

interface FavSymbolCellProps {
  favSymbolData: FavSymbolData;
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

function RenderMACDCell({ percentage, colorIndex }: MACDCellProps) {
  const shades = ["#c63b3b", "#f4cccc", "#ffffff", "#b6d7a8", "#34a701"];
  const color = shades[colorIndex + 2];

  return (
    <Box sx={{ bgcolor: color, borderRadius: "4px", padding: "1px" }}>
      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
        {percentage.toFixed(3)}%
      </Typography>
    </Box>
  );
}

function RenderBBandCell({ color, text, ratio }: BBandCellProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "4px",
        padding: "0",
        border: 1,
        borderColor: color,
      }}
    >
      <Stack spacing={0}>
        <Typography sx={{ color: color, fontSize: "0.4rem" }}>
          {ratio}
        </Typography>
        <Typography sx={{ color: color, fontSize: "0.5rem" }}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}

function RenderActionCell({ action }: { action: string }) {
  const color = action === "BUY" ? "green" : "red";
  const text = action === "BUY" ? "B" : "S";

  return (
    <Box sx={{ bgcolor: color, borderRadius: "4px", padding: "1px" }}>
      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
        {text}
      </Typography>
    </Box>
  );
}

function RenderMarketClosedCell() {
  return (
    <Box
      sx={{
        bgcolor: "gray",
        borderRadius: "15%",
        padding: "1px",
        alignSelf: "center",
      }}
    >
      <Typography sx={{ color: "black", fontSize: "0.6rem" }}>
        Closed
      </Typography>
    </Box>
  );
}

export default function FavSymbolCell({ favSymbolData }: FavSymbolCellProps) {
  const [priceColor, setPriceColor] = useState<string | null>(null);
  const [transitionDuration, setTransitionDuration] = useState<string>("0.5s");

  useEffect(() => {
    if (favSymbolData.current_price > 0) {
      setPriceColor("#02e32b");
    } else {
      setPriceColor("red");
    }
    setTransitionDuration("0.1s");

    const timer = setTimeout(() => {
      setPriceColor(null);
      setTransitionDuration("0.5s");
    }, 2000);

    return () => clearTimeout(timer);
  }, [favSymbolData.current_price]);

  const BBand15m = getBBandStatus(
    favSymbolData.bband_pos_15m,
    favSymbolData.bband_breadth_ratio_15m,
    favSymbolData.action_15m
  );
  const BBand1h = getBBandStatus(
    favSymbolData.bband_pos_1h,
    favSymbolData.bband_breadth_ratio_1h,
    favSymbolData.action_1h
  );
  const BBand1d = getBBandStatus(
    favSymbolData.bband_pos_1d,
    favSymbolData.bband_breadth_ratio_1d,
    favSymbolData.action_1d
  );

  const router = useRouter();

  const handleCellClick = () => {
    const encodedSymbol = encodeURIComponent(favSymbolData.ticker_symbol);
    router.push(`/dashboard/favorites/${encodedSymbol}`);
  };

  return (
    <Box
      onClick={handleCellClick}
      sx={{
        maxWidth: "700px",
        borderRadius: "12px",
        backgroundColor: "background.paper",
        color: "text.primary",
        flexGrow: 1,
        padding: "12px",
        overflow: "auto",
      }}
    >
      <Grid container spacing={1}>
        {/* Ticker symbol and price */}
        <Grid size="grow">
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={0.5} justifyContent="space-between">
              <Typography sx={{ fontWeight: "bold" }}>
                {favSymbolData.ticker_symbol}
              </Typography>
              {/* {favSymbolData.notification_enabled && <NotificationsIcon />} */}
              {favSymbolData.market_closed && <RenderMarketClosedCell />}
            </Stack>
            <Box>
              <Typography
                sx={{
                  color: priceColor || "inherit",
                  transition: `color ${transitionDuration} ease-in-out`,
                  fontSize: "2rem",
                }}
              >
                {favSymbolData.current_price.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{ color: favSymbolData.price_change > 0 ? "green" : "red" }}
            >
              <Stack direction="row" spacing={0.5}>
                <Typography>{favSymbolData.price_change.toFixed(2)}</Typography>
                <Typography>
                  {favSymbolData.price_change_percentage.toFixed(2)}%
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid size={4}>
          <Box
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {/* <Typography sx={{ fontSize: "2rem" }}>CHART</Typography> */}
            <FavSymbolCellChart favSymbolData={favSymbolData} />
          </Box>
        </Grid>

        <Grid size={1}>
          <Box
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Stack spacing={1}>
              <Typography sx={{ fontSize: "0.8rem" }}>Itv</Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>15m</Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>1h</Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>1d</Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid size={1.5}>
          <Stack spacing={0.5} sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              MACD
            </Typography>
            <RenderMACDCell
              percentage={favSymbolData.macd_15m_percentage}
              colorIndex={favSymbolData.macd_15m_hist_color_index}
            />
            <RenderMACDCell
              percentage={favSymbolData.macd_1h_percentage}
              colorIndex={favSymbolData.macd_1h_hist_color_index}
            />
            <RenderMACDCell
              percentage={favSymbolData.macd_1d_percentage}
              colorIndex={favSymbolData.macd_1d_hist_color_index}
            />
          </Stack>
        </Grid>

        <Grid size={1.5}>
          <Stack spacing={0.5} sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              BBands-Tr
            </Typography>
            <RenderBBandCell
              color={BBand15m.color}
              text={BBand15m.text}
              ratio={BBand15m.ratio}
            />
            <RenderBBandCell
              color={BBand1h.color}
              text={BBand1h.text}
              ratio={BBand1h.ratio}
            />
            <RenderBBandCell
              color={BBand1d.color}
              text={BBand1d.text}
              ratio={BBand1d.ratio}
            />
          </Stack>
        </Grid>

        <Grid size={1}>
          <Stack spacing={0.5} sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              Action
            </Typography>
            {/* <Typography>{"B"}</Typography>
            <Typography>{"S"}</Typography>
            <Typography>{"H"}</Typography> */}
            <RenderActionCell action={favSymbolData.action_15m} />
            <RenderActionCell action={favSymbolData.action_1h} />
            <RenderActionCell action={favSymbolData.action_1d} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
