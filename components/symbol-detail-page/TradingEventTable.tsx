"use client";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { CSapiGetCall } from "@/lib/backend-api/api";
import { Session } from "next-auth";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import type {
  TradingEvent,
  TradingEventResponse,
} from "@/lib/backend-api/interfaces";

export default function TradingEventTable({
  tickerSymbol,
}: {
  tickerSymbol: string;
}) {
  const { data: session } = useSession({ required: true });
  const [interval, setInterval] = useState<string | null>(null);
  const [data, setData] = useState<TradingEvent[]>([]);

  const handleClick = (interval: string) => {
    setInterval(interval);
  };

  useEffect(() => {
    let isMounted = true;
    if (!session || !interval) {
      return; // Exit early if session or interval is not set
    }
    const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_trading_events/?ticker_symbol=${tickerSymbol}&interval=${interval}&start=${0}&limit=${500}`;

    const fetchData = async () => {
      try {
        const data = await CSapiGetCall(session, url);

        const tradingEvents = data.trading_event_list;
        if (isMounted) {
          setData(tradingEvents);
          //   console.log(data);
        }
      } catch (error) {
        console.error("Error fetching trading events: ", error);
      }
    };

    fetchData(); // Call fetchData whenever interval changes
    console.log(data);
    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [interval, session]); // Add session to the dependency array

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "ticker_symbol", headerName: "Symbol", width: 100 },
    { field: "timestamp", headerName: "Timestamp", width: 220 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "action_type",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "SELL" ? "red" : "#02e32b",
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "interval", headerName: "Interval", width: 100 },
  ];

  const rows: GridRowsProp = data.map((event, index) => ({
    // id: `${event.ticker_symbol}-${event.datetime_timestamp}-${index}`, // Create a unique ID
    id: index,
    ticker_symbol: event.ticker_symbol,
    timestamp: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(new Date(event.datetime_timestamp * 1000)),
    price: event.price,
    action_type: event.action_type,
    interval: event.interval,
  }));

  return (
    <Box>
      <Typography>Trading Events</Typography>
      <Grid container direction={"row"} spacing={2}>
        <Grid>
          <Button variant="outlined" onClick={() => handleClick("all")}>
            <Typography>All</Typography>
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={() => handleClick("1d")}>
            <Typography>1d</Typography>
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={() => handleClick("1h")}>
            <Typography>1h</Typography>
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={() => handleClick("15m")}>
            <Typography>15m</Typography>
          </Button>
        </Grid>
      </Grid>
      {data.length == 0 && <Typography>Select an interval</Typography>}
      {data.length > 0 && (
        <div style={{ height: 500, width: "700px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            columnVisibilityModel={{
              id: false,
            }}
          />
        </div>
      )}
    </Box>
  );
}
