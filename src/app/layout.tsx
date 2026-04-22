import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LARIAL LTD — Verified CAC Merchant",
    template: "%s — LARIAL LTD",
  },
  description:
    "Verified CAC merchant helping Nigerians worldwide register CAC businesses and companies — with an onsite office in Kaduna State.",
  applicationName: "LARIAL LTD",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "LARIAL LTD — Verified CAC Merchant",
    description:
      "Company registration for Nigerians worldwide. Fast, guided, and reliable — Kaduna office.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "LARIAL LTD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LARIAL LTD — Verified CAC Merchant",
    description:
      "Company registration for Nigerians worldwide. Fast, guided, and reliable — Kaduna office.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
