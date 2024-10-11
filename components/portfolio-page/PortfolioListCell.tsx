import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PortfolioConfigList } from "@/lib/backend-api/interfaces";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
function PortfolioListCellItem({ children }: { children: React.ReactNode }) {
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

export default function PortfolioListCell({
  portfolio,
}: {
  portfolio: PortfolioConfigList;
}) {
  return (
    <Box
      sx={{
        padding: 2,
        borderColor: "divider",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">{portfolio.portfolio_name}</Typography>
      <Divider />
      <Grid container spacing={2} direction="column" sx={{ marginTop: 2 }}>
        <Grid>
          <PortfolioListCellItem>
            <Typography variant="subtitle2">Positions:</Typography>

            <Grid
              container
              spacing={1}
              sx={{ maxWidth: "400px", justifyContent: "flex-end" }}
            >
              {portfolio.symbol_list.map((symbol, idx) => {
                return (
                  <Grid key={idx}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`${symbol.ticker_symbol} (${symbol.percentage}%)`}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </PortfolioListCellItem>
        </Grid>
        <Grid>
          <PortfolioListCellItem>
            <Typography variant="subtitle2">Starting Date:</Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {portfolio.starting_date}
            </Typography>
          </PortfolioListCellItem>
        </Grid>
        <Grid>
          <PortfolioListCellItem>
            <Typography variant="subtitle2">Fund Amount:</Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {portfolio.total_fund_amount.toFixed(2)}
            </Typography>
          </PortfolioListCellItem>
        </Grid>
        <Grid>
          <PortfolioListCellItem>
            <Typography variant="subtitle2">Balance:</Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {portfolio.balance.toFixed(2)}
            </Typography>
          </PortfolioListCellItem>
        </Grid>
        <Grid>
          <PortfolioListCellItem>
            <Typography variant="subtitle2">GL & Performance:</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  portfolio.performance > 0
                    ? "#02e32b"
                    : portfolio.performance === 0
                      ? "text.secondary"
                      : "red",
              }}
            >
              {`${((portfolio.total_fund_amount * portfolio.performance) / 100).toFixed(2)} (${portfolio.performance.toFixed(2)}%)`}
            </Typography>
          </PortfolioListCellItem>
        </Grid>
        <Grid>
          <PortfolioListCellItem>
            <Typography variant="subtitle2">Daily Change:</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  portfolio.change_percentage > 0
                    ? "#02e32b"
                    : portfolio.performance === 0
                      ? "text.secondary"
                      : "red",
              }}
            >
              {`${portfolio.change.toFixed(2)} (${portfolio.change_percentage.toFixed(2)}%) `}
            </Typography>
          </PortfolioListCellItem>
        </Grid>
      </Grid>
    </Box>
  );
}
