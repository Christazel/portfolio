import "./globals.css";
import type { Metadata, Viewport } from "next";
import ClickSpark from "@/components/animations/ClickSpark";
import OpeningLoader from "@/components/layout/OpeningLoader";

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
      <body className="font-sans">
        <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          <OpeningLoader />
          <div className="site-shell relative z-10 min-h-screen">
            {children}
          </div>
        </ClickSpark>
      </body>
    </html>
  );
}
