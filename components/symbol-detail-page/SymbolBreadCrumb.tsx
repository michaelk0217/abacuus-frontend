import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
export default function SymbolBreadCrumb({
  encodedTicker,
}: {
  encodedTicker: string;
}) {
  const decodedTicker = decodeURIComponent(encodedTicker);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/favorites">
        Favorites
      </Link>
      <Typography color="text.primary">{decodedTicker}</Typography>
    </Breadcrumbs>
  );
}
