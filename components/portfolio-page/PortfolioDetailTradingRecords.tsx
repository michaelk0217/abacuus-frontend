import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import type { DailySummaryRecord } from "@/lib/backend-api/interfaces";
import Grid from "@mui/material/Grid2";

function TradingRecordRow({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Grid container spacing={2} direction="row">
      <Grid size={5}>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {title}:
        </Typography>
      </Grid>
      <Grid size={7}>{children}</Grid>
    </Grid>
  );
}

export default function PortfolioDetailTradingRecords({
  dailyTradingRecords,
}: {
  dailyTradingRecords: DailySummaryRecord[];
}) {
  return (
    <>
      <Box>
        <Typography variant="h5">Daily Trading Records</Typography>
        <Divider sx={{ width: "420px" }} />
      </Box>
      <Box
        sx={{
          mt: 0.5,
          maxHeight: "570px",
          width: "420px",
          overflowY: "auto",
        }}
      >
        {dailyTradingRecords.map((record, index) => {
          return (
            <Box
              key={index}
              sx={{
                // width: "420px",
                height: "134px",
                bgcolor: "background.paper",
                borderRadius: 2,
                borderColor: "divider",
                borderWidth: 1,
                borderStyle: "solid",
                px: 2,
                py: 1,
                my: 1,
              }}
            >
              <Typography variant="subtitle1">{record.date}</Typography>

              <TradingRecordRow title="Balance">
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {record.balance.toFixed(2)}
                </Typography>
              </TradingRecordRow>

              <TradingRecordRow title="Daily Change (%)">
                <Typography
                  variant="subtitle2"
                  sx={{
                    color:
                      record.change > 0
                        ? "#02e32b"
                        : record.change === 0
                          ? "text.secondary"
                          : "red",
                  }}
                >
                  {record.change.toFixed(2)} (
                  {record.change_percentage.toFixed(2)}%)
                </Typography>
              </TradingRecordRow>

              <TradingRecordRow title="Performance">
                <Typography
                  variant="subtitle2"
                  sx={{
                    color:
                      record.change > 0
                        ? "#02e32b"
                        : record.change === 0
                          ? "text.secondary"
                          : "red",
                  }}
                >
                  {record.performance.toFixed(2)}%
                </Typography>
              </TradingRecordRow>

              <TradingRecordRow title="Tradings">
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {record.trading_symbol_list
                    .map(
                      (symbol) =>
                        `${symbol.ticker_symbol}(${symbol.trading_shares})`
                    )
                    .join(", ")}
                </Typography>
              </TradingRecordRow>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
