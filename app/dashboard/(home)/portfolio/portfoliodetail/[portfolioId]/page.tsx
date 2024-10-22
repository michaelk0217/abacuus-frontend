"use client";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CSapiGetCall } from "@/lib/backend-api/api";
import type { PortfolioSummaryData } from "@/lib/backend-api/interfaces";
import PortfolioDetailSummary from "@/components/portfolio-page/PortfolioDetailSummary";
import Divider from "@mui/material/Divider";
import PortfolioBreadCrumb from "@/components/portfolio-page/PortfolioBreadCrumb";
import Grid from "@mui/material/Grid2";
import PortfolioDetailPositions from "@/components/portfolio-page/PortfolioDetailPositions";
import PortfolioDetailTradingRecords from "@/components/portfolio-page/PortfolioDetailTradingRecords";
export default function PortfolioDetailPage() {
  const { portfolioId } = useParams();

  const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_portfolio_summary_data/?portfolio_config_id=${portfolioId}`;
  const [data, setData] = useState<PortfolioSummaryData>(
    {} as PortfolioSummaryData
  );
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({ required: true });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!session) {
        return;
      }
      try {
        const data = await CSapiGetCall(session, url);
        const favSymbolData = data.portfolio_summary_data;
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
    <Box>
      <PortfolioBreadCrumb
        portfolioId={data.portfolio_config_id}
        portfolioName={data.portfolio_name}
      />
      <Typography variant="h4">{data.portfolio_name}</Typography>
      <Divider />

      <PortfolioDetailSummary data={data} />
      <Grid container spacing={2} maxWidth="800px">
        <Grid size={{ xs: 12, md: 6 }}>
          <PortfolioDetailPositions
            symbolSummaryList={data.symbol_summary_list}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PortfolioDetailTradingRecords />
        </Grid>
      </Grid>
    </Box>
  );
}
