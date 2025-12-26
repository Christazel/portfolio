export default function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />

      {/* subtle top glow */}
      <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-25 bg-white/10" />

      {/* subtle corner glows */}
      <div className="absolute -bottom-56 -left-56 h-[520px] w-[520px] rounded-full blur-3xl opacity-20 bg-white/10" />
      <div className="absolute -bottom-56 -right-56 h-[520px] w-[520px] rounded-full blur-3xl opacity-15 bg-white/10" />

      {/* very light grid */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:96px_96px]" />
    </div>
  );
}
