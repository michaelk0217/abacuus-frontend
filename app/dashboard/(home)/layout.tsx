import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Box from "@mui/material/Box";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout disableCollapsibleSidebar>
      {/* <PageContainer>{props.children}</PageContainer> */}

      <Box sx={{ padding: 4 }}>{props.children}</Box>
    </DashboardLayout>
  );
}
