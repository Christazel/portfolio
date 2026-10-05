import Link from "next/link";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <main className="flex-1 flex items-center justify-center py-28 px-4">
        <div className="text-center max-w-md mx-auto flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10 mb-6 text-2xl font-bold text-neutral-800 dark:text-neutral-300">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-3">
            Page Not Found
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
            The page you are looking for doesn&apos;t exist, has been moved, or the link may be outdated.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-semibold text-sm px-6 py-2.5 rounded-full transition shadow-sm active:scale-95"
            >
              Back to Home
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-white dark:border-white/10 font-semibold text-sm px-6 py-2.5 rounded-full transition active:scale-95"
            >
              Explore My Work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
