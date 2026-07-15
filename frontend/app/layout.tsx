import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import { Providers } from "@/providers";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocWiseAI",
  description: "AI-powered personal document assistant.",
  icons: {
    icon: "/logo2.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
