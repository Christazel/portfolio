export default function Footer() {
  return (
    <footer className="relative left-1/2 min-h-[70vh] w-screen -translate-x-1/2 overflow-hidden bg-zinc-100 text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] bg-[radial-gradient(circle_at_1px_1px,#09090b_1px,transparent_0)] bg-size-[18px_18px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-950/15" />

      <div className="relative z-10 flex min-h-[70vh] flex-col justify-between px-5 py-8 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <nav className="flex flex-wrap gap-5 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500 sm:gap-8">
            <a className="transition duration-300 hover:text-zinc-950" href="#about">
              About
            </a>
            <a className="transition duration-300 hover:text-zinc-950" href="#projects">
              Projects
            </a>
            <a className="transition duration-300 hover:text-zinc-950" href="#contact">
              Contact
            </a>
          </nav>

          <p className="text-sm font-medium text-zinc-500">© 2026 Christazel</p>
        </div>

        <div className="select-none">
          <p className="footer-giant-text">christazel</p>
        </div>
      </div>
    </footer>
  );
}
