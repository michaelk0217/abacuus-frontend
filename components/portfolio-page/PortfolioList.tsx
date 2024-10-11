"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CSapiGetCall } from "@/lib/backend-api/api";
import { PortfolioConfigList } from "@/lib/backend-api/interfaces";
import PortfolioListCell from "./PortfolioListCell";

export default function PortfolioList() {
  const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_portfolio_config_list/`;
  const [data, setData] = useState<PortfolioConfigList[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({ required: true });

  const theme = useTheme();
  const isStacked = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!session) {
        return;
      }
      try {
        const data = await CSapiGetCall(session, url);
        const favSymbolData = data.portfolio_config_list;
        if (isMounted) {
          setData(favSymbolData);
          setLoading(false);
          //   console.log("favSymbolData", favSymbolData);
        }
      } catch (error) {
        console.error("Error fetching favorite symbol list:", error);
        setLoading(false);
      }
      //   console.log("session", session);
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5000 ms = 5 seconds

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [url, session]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ maxWidth: "1100px", marginTop: 2 }}>
      <Grid container spacing={2} direction={isStacked ? "column" : "row"}>
        {data.map((portfolio) => (
          <Grid key={portfolio.portfolio_config_id} size={isStacked ? 12 : 6}>
            <PortfolioListCell portfolio={portfolio} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
