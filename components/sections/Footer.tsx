export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-5 md:py-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black transition-colors duration-300 mt-auto relative z-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          © {year} Yohan Christazel Jeffry. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
