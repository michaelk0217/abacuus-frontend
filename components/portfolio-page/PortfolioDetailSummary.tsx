"use client";
import Box from "@mui/material/Box";
import type { PortfolioSummaryData } from "@/lib/backend-api/interfaces";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { useRef, useState, useEffect } from "react";

function SummaryRow({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        display: "flex",
        direction: "row",
      }}
    >
      {children}
    </Box>
  );
}

export default function PortfolioDetailSummary({
  data,
}: {
  data: PortfolioSummaryData;
}) {
  //     const containerRef = useRef<HTMLDivElement>(null);
  //   const [isSmallContainer, setIsSmallContainer] = useState(false);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (containerRef.current) {
  //         setIsSmallContainer(containerRef.current.offsetWidth < 700);
  //       }
  //     };

  //     handleResize(); // Check initial container width

  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      sx={{
        width: "100%",
        maxWidth: "700px",
        borderColor: "divider",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 2,
        px: 2,
        py: 1,
        my: 2,
      }}
    >
      <Grid container spacing={2} direction="column" size={{ xs: 12, md: 6 }}>
        <Grid>
          <SummaryRow>
            <Typography variant="subtitle1" color="text.secondary">
              Balance:
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              ${data.balance.toFixed(2)}
            </Typography>
          </SummaryRow>
        </Grid>
        <Grid>
          <SummaryRow>
            <Typography variant="subtitle1" color="text.secondary">
              Total Cash:
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              ${data.cash_total.toFixed(2)}
            </Typography>
          </SummaryRow>
        </Grid>
        <Grid>
          <SummaryRow>
            <Typography variant="subtitle1" color="text.secondary">
              Total Fund Amount:
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              ${data.total_fund_amount.toFixed(2)}
            </Typography>
          </SummaryRow>
        </Grid>
      </Grid>

      <Grid container spacing={2} direction="column" size={{ xs: 12, md: 6 }}>
        <Grid>
          <SummaryRow>
            <Typography variant="subtitle1" color="text.secondary">
              Available Cash:
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color:
                  data.available_cash > 0
                    ? "#02e32b"
                    : data.available_cash === 0
                      ? "text.secondary"
                      : "red",
              }}
            >
              ${data.available_cash.toFixed(2)} (
              {data.cash_percentage.toFixed(2)}%)
            </Typography>
          </SummaryRow>
        </Grid>
        <Grid>
          <SummaryRow>
            <Typography variant="subtitle1" color="text.secondary">
              G/L & Performance:
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color:
                  data.performance > 0
                    ? "#02e32b"
                    : data.performance === 0
                      ? "text.secondary"
                      : "red",
              }}
            >
              {`$${((data.total_fund_amount * data.performance) / 100).toFixed(2)} (${data.performance.toFixed(2)}%)`}
            </Typography>
          </SummaryRow>
        </Grid>
        <Grid>
          <SummaryRow>
            <Typography variant="subtitle1" color="text.secondary">
              Daily Change (%):
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color:
                  data.change_percentage > 0
                    ? "#02e32b"
                    : data.performance === 0
                      ? "text.secondary"
                      : "red",
              }}
            >
              {`$${data.change.toFixed(2)} (${data.change_percentage.toFixed(2)}%)`}
            </Typography>
          </SummaryRow>
        </Grid>
      </Grid>
    </Grid>
  );
}
