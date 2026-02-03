import "./globals.css";
import type { Metadata } from "next";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} font-body`}>
        <BackgroundEffects />
        <div className="min-h-screen">
          {children}
          <footer className="border-t border-zinc-900/80 py-10">
            <div className="container-page text-sm text-zinc-500">
              © {new Date().getFullYear()} • Built with Next.js
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
