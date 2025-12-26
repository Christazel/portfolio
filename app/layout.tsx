import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
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
