import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import type { Navigation } from "@toolpad/core";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { auth } from "@/auth";
import { customTheme } from "@/theme";
// import { ChartColumnStacked } from "lucide-react";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    pattern: "dashboard",
  },
  {
    segment: "dashboard/favorites",
    title: "Favorites",
    icon: <CandlestickChartIcon />,
    pattern: "dashboard/favorites/{/:symbolTicker}*",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "dashboard/portfolio",
    title: "Portfolio",
    icon: <DataUsageIcon />,
    pattern: "dashboard/portfolio",
  },
  {
    segment: "dashboard/simulation",
    title: "Simulation",
    icon: <QueryStatsIcon />,
    pattern: "dashboard/simulation",
  },
];

const BRANDING = {
  title: "ABACUUS",
  // icon: <img src="/chart-column-stacked.png" alt="Abacuus" />,
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <AppProvider
          navigation={NAVIGATION}
          branding={BRANDING}
          session={session}
          authentication={AUTHENTICATION}
          theme={customTheme}
        >
          {props.children}
        </AppProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
