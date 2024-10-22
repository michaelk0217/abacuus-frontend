import Box from "@mui/material/Box";
import type { SymbolSummary } from "@/lib/backend-api/interfaces";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";

function PositionRow({
  children,
  rowTitle,
}: {
  children: React.ReactNode;
  rowTitle: string;
}) {
  return (
    <Grid container spacing={2} direction="row" width="100%">
      <Grid size={4.5}>
        <Typography variant="subtitle2" color="text.secondary">
          {rowTitle}:
        </Typography>
      </Grid>
      <Grid size={7.5}>{children}</Grid>
    </Grid>
  );
}

function SymbolAction({ action }: { action: string }) {
  return (
    <Typography
      variant="subtitle1"
      bgcolor={action == "1" ? "#02e32b" : "red"}
      color="black"
      px={1}
      py={0}
      borderRadius={0.5}
    >
      {action == "1" ? "B" : "S"}
    </Typography>
  );
}

export default function PortfolioDetailPositionCell({
  symbolSummary,
}: {
  symbolSummary: SymbolSummary;
}) {
  return (
    <Box
      sx={{
        width: "400px",
        // minWidth: "400px",
        bgcolor: "background.paper",
        borderRadius: 2,
        px: 2,
        py: 1,
        my: 0.5,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={8.5}>
          <Stack>
            <Grid container spacing={2} direction="row">
              <Grid size={4.5}>
                <Typography variant="subtitle1" color="text.primary">
                  {symbolSummary.ticker_symbol}:
                </Typography>
              </Grid>
              <Grid size={7.5}>
                <Typography
                  variant="subtitle1"
                  color={
                    symbolSummary.price_change_percentage > 0
                      ? "#02e32b"
                      : "red"
                  }
                >
                  ${symbolSummary.price.toFixed(2)} (
                  {symbolSummary.price_change_percentage.toFixed(2)}%)
                </Typography>
              </Grid>
            </Grid>
            <PositionRow rowTitle="Shares">
              <Typography variant="subtitle2" color="text.secondary">
                {symbolSummary.shares}
              </Typography>
            </PositionRow>
            <PositionRow rowTitle="Equity Value">
              <Typography variant="subtitle2" color="text.secondary">
                {symbolSummary.equity_value.toFixed(2)}
              </Typography>
            </PositionRow>
            <PositionRow rowTitle="Equity%">
              <Typography variant="subtitle2" color="text.secondary">
                {symbolSummary.equity_percentage.toFixed(2)}%
              </Typography>
            </PositionRow>
            <PositionRow rowTitle="Perf%">
              <Typography
                variant="subtitle2"
                color={
                  symbolSummary.performance > 0
                    ? "#02e32b"
                    : symbolSummary.performance === 0
                      ? "text.secondary"
                      : "red"
                }
              >
                {symbolSummary.performance.toFixed(2)}%
              </Typography>
            </PositionRow>
          </Stack>
        </Grid>
        <Grid size={3.5}>
          <Grid container direction="column" gap={1} alignItems="center">
            <Grid size={3}>
              <Box sx={{ display: "flex", direction: "row", gap: 0.5 }}>
                <SymbolAction action={symbolSummary.short_term_action} />
                <SymbolAction action={symbolSummary.mid_term_action} />
                <SymbolAction action={symbolSummary.long_term_action} />
              </Box>
            </Grid>
            <Grid size="auto">
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                  textAlign: "right",
                }}
              >
                Shares to buy:
              </Typography>
            </Grid>
          </Grid>
          <Grid size="grow">
            <Typography
              variant="h5"
              sx={{
                color:
                  symbolSummary.shares_to_buy > 0
                    ? "#02e32b"
                    : symbolSummary.shares_to_buy == 0
                      ? "text.secondary"
                      : "red",
                textAlign: "right",
              }}
            >
              {symbolSummary.shares_to_buy.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size="auto">
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  symbolSummary.shares_to_buy > 0
                    ? "#02e32b"
                    : symbolSummary.shares_to_buy == 0
                      ? "text.secondary"
                      : "red",
                textAlign: "right",
              }}
            >
              ${(symbolSummary.shares_to_buy * symbolSummary.price).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
