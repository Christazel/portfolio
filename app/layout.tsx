import "./globals.css";
import type { Metadata } from "next";
import CursorTrailEffect from "@/components/animations/CursorTrailEffect";
import OpeningLoader from "@/components/layout/OpeningLoader";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans">
        <OpeningLoader />
        <CursorTrailEffect />
        <div className="min-h-screen">
          {children}
          <footer className="border-t border-zinc-800 py-8">
            <div className="container-page text-sm text-zinc-500">
              © {new Date().getFullYear()} • Built with Next.js
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
