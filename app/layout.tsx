import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABACUUS",
  description: "Precision in Trading",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>{props.children}</body>
    </html>
  );
}
