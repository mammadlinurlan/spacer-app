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

const SITE_URL = "https://spacer.az";
const TITLE = "Spacer Azerbaijan | Sertifikatlı Spacer & Coilover Satışı";
const DESCRIPTION =
  "Azərbaycanın ən premium spacer və coilover satış mağazası. BMW, Mercedes-Benz, Toyota üçün TÜV sertifikatlı məhsullar. WhatsApp ilə sifariş edin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
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
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "Spacer Azerbaijan",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/ogphoto.png",
        width: 1024,
        height: 1024,
        alt: "Spacer Azerbaijan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/ogphoto.png"],
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
