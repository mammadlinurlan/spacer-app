import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Spacer Azerbaijan | Sertifikatlı Spacer & Coilover Satışı",
  description:
    "Azərbaycanın ən premium spacer və coilover satış mağazası. BMW, Mercedes-Benz, Toyota üçün TÜV sertifikatlı məhsullar. WhatsApp ilə sifariş edin.",
  keywords: [
    "spacer",
    "coilover",
    "azerbaycan",
    "baku",
    "BMW spacer",
    "Mercedes spacer",
    "Toyota spacer",
    "avtomobil hissələri",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
