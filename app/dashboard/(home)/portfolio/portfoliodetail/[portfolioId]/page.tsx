"use client";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CSapiGetCall } from "@/lib/backend-api/api";
import type {
  DailySummaryRecord,
  PortfolioSummaryData,
} from "@/lib/backend-api/interfaces";
import PortfolioDetailSummary from "@/components/portfolio-page/PortfolioDetailSummary";
import Divider from "@mui/material/Divider";
import PortfolioBreadCrumb from "@/components/portfolio-page/PortfolioBreadCrumb";
import Grid from "@mui/material/Grid2";
import PortfolioDetailPositions from "@/components/portfolio-page/PortfolioDetailPositions";
import PortfolioDetailTradingRecords from "@/components/portfolio-page/PortfolioDetailTradingRecords";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function PortfolioDetailPage() {
  const { portfolioId } = useParams();

  const portfolio_summary_url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_portfolio_summary_data/?portfolio_config_id=${portfolioId}`;
  const daily_trading_records_url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_daily_summary_record_list/?portfolio_config_id=${portfolioId}`;

  const [data, setData] = useState<PortfolioSummaryData>(
    {} as PortfolioSummaryData
  );

  const [dailyTradingRecords, setDailyTradingRecords] = useState<
    DailySummaryRecord[]
  >([]);
  const [recordLoading, setRecordLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({ required: true });

  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down(1250));

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!session) {
        return;
      }
      try {
        const data = await CSapiGetCall(session, portfolio_summary_url);
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
  }, [portfolio_summary_url, session]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!session) {
        return;
      }
      try {
        const recordData = await CSapiGetCall(
          session,
          daily_trading_records_url
        );
        const recordList = recordData.daily_summary_record_list;
        if (isMounted) {
          setDailyTradingRecords(recordList);
          console.log("recordList", recordList);
          setRecordLoading(false);
        }
      } catch (error) {
        console.error("Error fetching daily trading records:", error);
        setRecordLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [session, daily_trading_records_url]);

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
      <Grid container spacing={2} maxWidth="840px">
        <Grid size={breakpoint ? 12 : 6}>
          <PortfolioDetailPositions
            symbolSummaryList={data.symbol_summary_list}
          />
        </Grid>
        <Grid size={breakpoint ? 12 : 6}>
          {recordLoading ? (
            <Box>Loading...</Box>
          ) : (
            <PortfolioDetailTradingRecords
              dailyTradingRecords={dailyTradingRecords}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
