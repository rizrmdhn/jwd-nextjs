import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Providers from "./providers";
import { env } from "@/env";
import { Toaster } from "@/components/ui/sonner";
import generateMetadata from "@/lib/generate-metadata";

export const metadata = generateMetadata();

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <Providers>
            {children}
            {env.NODE_ENV === "development" && <ReactQueryDevtools />}
            <Toaster position="bottom-right" richColors />
            <div id="sheet-root" />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
