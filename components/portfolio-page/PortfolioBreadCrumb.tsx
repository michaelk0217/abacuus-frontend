import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
export default function PortfolioBreadCrumb({
  portfolioId,
  portfolioName,
}: {
  portfolioId: number;
  portfolioName: string;
}) {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/dashboard/portfolio" underline="hover" color="inherit">
          Portfolio
        </Link>
        <Link
          href={`/dashboard/portfolio/portfoliodetail/${portfolioId}`}
          underline="hover"
          color="text.primary"
        >
          {portfolioName}
        </Link>
      </Breadcrumbs>
    </Box>
  );
}
