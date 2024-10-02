"use client";
import { Box, Typography } from "@mui/material";
import SymbolBreadCrumb from "./SymbolBreadCrumb";
import { SymbolInfo } from "@/lib/backend-api/interfaces";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
export default function SymbolDetailHeader({
  symbolTicker,
  symbolData,
  decodedSymbolTicker,
}: {
  symbolTicker: string;
  symbolData: SymbolInfo;
  decodedSymbolTicker: string;
}) {
  const [priceColor, setPriceColor] = useState<string | null>(null);
  const [transitionDuration, setTransitionDuration] = useState<string>("0.5s");
  useEffect(() => {
    if (symbolData.current_price > 0) {
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
  }, [symbolData.current_price]);

  const timestamp = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(new Date(symbolData.updated_at_timestamp * 1000));

  return (
    <Box>
      <SymbolBreadCrumb encodedTicker={symbolTicker as string} />
      <Typography variant="h4">{decodedSymbolTicker}</Typography>
      <Divider />
      <Stack direction="row" spacing={2}>
        <Typography
          // variant="h6"
          sx={{
            color: priceColor || "inherit",
            transition: `color ${transitionDuration} ease-in-out`,
            fontSize: "2.5rem",
          }}
        >
          {symbolData.current_price.toFixed(2)}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            color: symbolData.price_change > 0 ? "green" : "red",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography>{symbolData.price_change.toFixed(2)}</Typography>
          <Typography>
            ({symbolData.price_change_percentage.toFixed(2)}%)
          </Typography>
        </Stack>
      </Stack>
      <Typography sx={{ color: "text.secondary" }}>
        Updated at: {timestamp}
      </Typography>
    </Box>
  );
}
