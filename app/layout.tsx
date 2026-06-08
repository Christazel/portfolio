import "./globals.css";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Geist } from "next/font/google";
import OpeningLoader from "@/components/layout/OpeningLoader";

const CursorFollower = dynamic(() => import("@/components/layout/CursorFollower"));
const siteUrl = "https://christazel.vercel.app";
const siteTitle = "Yohan Christazel Jeffry | Fullstack Developer Portfolio";
const siteDescription =
  "Portfolio of Yohan Christazel Jeffry, a fullstack developer building fast web products, reliable APIs, mobile experiences, and clean UI/UX.";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Yohan Christazel Jeffry",
  },
  description: siteDescription,
  applicationName: "Yohan Christazel Jeffry Portfolio",
  authors: [{ name: "Yohan Christazel Jeffry", url: siteUrl }],
  creator: "Yohan Christazel Jeffry",
  publisher: "Yohan Christazel Jeffry",
  keywords: [
    "Yohan Christazel Jeffry",
    "Christazel",
    "Fullstack Developer",
    "Portfolio Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI UX Developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Yohan Christazel Jeffry Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/asset/profile_800.webp",
        width: 800,
        height: 800,
        alt: "Yohan Christazel Jeffry portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/asset/profile_800.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
  themeColor: "#09090b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <OpeningLoader />
        <CursorFollower />
        <div className="site-shell relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
