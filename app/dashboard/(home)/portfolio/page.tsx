import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PortfolioList from "@/components/portfolio-page/PortfolioList";
export default function PortfolioPage() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Portfolio</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Portfolio</Typography>
      <Divider sx={{ maxWidth: "1100px" }} />
      <PortfolioList />
    </>
  );
}
