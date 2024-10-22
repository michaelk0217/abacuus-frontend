import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import type { SymbolSummary } from "@/lib/backend-api/interfaces";
import PortfolioDetailPositionCell from "./PortfolioDetailPositionCell";
export default function PortfolioDetailPositions({
  symbolSummaryList,
}: {
  symbolSummaryList: SymbolSummary[];
}) {
  return (
    <Box>
      <Box>
        <Typography variant="h5">Positions</Typography>
        <Divider />
      </Box>

      <Stack sx={{ mt: 1 }}>
        {symbolSummaryList.map((symbolSummary) => (
          <PortfolioDetailPositionCell symbolSummary={symbolSummary} />
        ))}
      </Stack>
    </Box>
  );
}
