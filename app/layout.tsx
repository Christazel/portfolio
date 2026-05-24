import "./globals.css";
import type { Metadata } from "next";
import ClickSpark from "@/components/animations/ClickSpark";
import OpeningLoader from "@/components/layout/OpeningLoader";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans">
        <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          <OpeningLoader />
          <div className="min-h-screen">
            {children}
            <footer className="border-t border-zinc-800 py-8">
              <div className="container-page text-sm text-zinc-500">
                © {new Date().getFullYear()} • Built with Next.js
              </div>
            </footer>
          </div>
        </ClickSpark>
      </body>
    </html>
  );
}
