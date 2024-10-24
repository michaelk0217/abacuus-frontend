"use client";
import { useEffect, useState } from "react";
import { SymbolInfo } from "@/lib/backend-api/interfaces";
import { CSapiGetCall } from "@/lib/backend-api/api";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { useParams } from "next/navigation";
import SymbolDetailHeader from "./SymbolDetailHeader";
import SymbolDetailCandlestickChart from "./SymbolDetailCandlestickChart";
import MacdBBCell from "./MacdBBCell";
import TradingEventTable from "./TradingEventTable";

export default function SymbolDetail() {
  const { symbolTicker } = useParams();
  const decodedSymbolTicker = decodeURIComponent(symbolTicker as string);
  const { data: session } = useSession({ required: true });
  const [symbolData, setSymbolData] = useState<SymbolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState<string>("15m");
  const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_symbol_info/?ticker_symbol=${decodedSymbolTicker}`;

  const handleMacdBBClick = (interval: string) => {
    console.log(interval);
    setSelectedInterval(interval);
  };

  useEffect(() => {
    let isMounted = true;
    if (!session) {
      return;
    }

    const fetchSymbolData = async () => {
      try {
        const data = await CSapiGetCall(session, url);
        if (isMounted) {
          setSymbolData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching symbol data:", error);
        setLoading(false);
      }
    };

    fetchSymbolData();

    const intervalId = setInterval(() => {
      fetchSymbolData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [symbolTicker, session, url]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!symbolData) {
    return <Typography>No data available for {symbolTicker}</Typography>;
  }

  return (
    <>
      <SymbolDetailHeader
        symbolTicker={symbolTicker as string}
        symbolData={symbolData}
        decodedSymbolTicker={decodedSymbolTicker}
      />
      <Grid container spacing={2}>
        <Grid size={{ xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }}>
          <Box
            sx={{
              height: "500px",
              borderColor: "divider",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 2,
              marginTop: "1rem",
            }}
          >
            <SymbolDetailCandlestickChart
              interval={selectedInterval}
              symbolData={symbolData}
            />
          </Box>
        </Grid>
        <Grid
          container
          size={{ xl: 4, lg: 4, md: 12, sm: 12, xs: 12 }}
          spacing={2}
          direction={"column"}
          marginTop={"1rem"}
        >
          <Grid width={"100%"}>
            <MacdBBCell
              onClick={() => handleMacdBBClick("15m")}
              symbolData={symbolData}
              interval="15m"
            />
          </Grid>
          <Grid width={"100%"}>
            <MacdBBCell
              onClick={() => handleMacdBBClick("1h")}
              symbolData={symbolData}
              interval="1h"
            />
          </Grid>
          <Grid width={"100%"}>
            <MacdBBCell
              onClick={() => handleMacdBBClick("1d")}
              symbolData={symbolData}
              interval="1d"
            />
          </Grid>
        </Grid>
      </Grid>
      <TradingEventTable tickerSymbol={decodedSymbolTicker} />
    </>
  );
}
