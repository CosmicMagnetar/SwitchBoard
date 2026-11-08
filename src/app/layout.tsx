import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwitchBoard — Human + AI Agent Team OS",
  description:
    "Connect your human team and AI agents in one dashboard. Powered by Switch.",
  openGraph: {
    title: "SwitchBoard — Human + AI Agent Team OS",
    description:
      "Unified dashboard connecting Slack, Discord, Teams, Telegram, and Gmail with AI agents via Switch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}
