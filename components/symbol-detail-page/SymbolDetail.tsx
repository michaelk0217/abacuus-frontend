"use client";
import { useEffect, useState } from "react";
import { SymbolInfo } from "@/lib/backend-api/interfaces";
import { CSapiGetCall } from "@/lib/backend-api/api";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import SymbolDetailHeader from "./SymbolDetailHeader";
import SymbolDetailCandlestickChart from "./SymbolDetailCandlestickChart";

export default function SymbolDetail() {
  const { symbolTicker } = useParams();
  const decodedSymbolTicker = decodeURIComponent(symbolTicker as string);
  const { data: session } = useSession({ required: true });
  const [symbolData, setSymbolData] = useState<SymbolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_symbol_info/?ticker_symbol=${decodedSymbolTicker}`;

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
  }, [symbolTicker, session]);

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
      <Box sx={{ maxWidth: "60%", height: "500px" }}>
        <SymbolDetailCandlestickChart symbolData={symbolData} />
      </Box>
    </>
  );
}
