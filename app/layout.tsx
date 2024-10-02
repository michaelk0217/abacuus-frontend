import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import type { Navigation } from "@toolpad/core";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { auth } from "../auth";
import { customTheme } from "../theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "favorites",
    title: "Favorites",
    icon: <CandlestickChartIcon />,
    pattern: "favorites/{/:symbolTicker}*",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "portfolio",
    title: "Portfolio",
    icon: <DataUsageIcon />,
  },
  {
    segment: "simulation",
    title: "Simulation",
    icon: <QueryStatsIcon />,
  },
];

const BRANDING = {
  title: "Abacuus",
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
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
      </body>
    </html>
  );
}
