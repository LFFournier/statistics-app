import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Switch from '@mui/material/Switch';

import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from '@/theme/darkTheme';

const roboto = Roboto({
      weight: ['300', '400', '500', '700'],
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-roboto',
    });

export const metadata: Metadata = {
  title: "Statistics App",
    description: "Basic Statistics Demo",
    viewport: {
        initialScale: 1,
        width: 'device-width',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={roboto.variable}>
      <body>
      <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            {children}
          </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
