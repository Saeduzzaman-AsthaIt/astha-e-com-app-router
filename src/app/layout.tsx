import type { Metadata } from "next";
import "./globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inter } from "next/font/google";
import RootLayoutClientWrapper from "@/components/rootLayoutClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astha E-commerce (App Router)",
  description: "Astha E-commerce with App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClientWrapper>
          {children}
        </RootLayoutClientWrapper>
      </body>
    </html>
  )
  
}
