import "./globals.css";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Geist } from "next/font/google";
import OpeningLoader from "@/components/layout/OpeningLoader";

const CursorFollower = dynamic(() => import("@/components/layout/CursorFollower"));

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yohan Christazel Jeffry",
  description: "Portfolio website of Yohan Christazel Jeffry",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={geistSans.className}>
        <OpeningLoader />
        <CursorFollower />
        <div className="site-shell relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
