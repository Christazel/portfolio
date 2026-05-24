import Lanyard from "@/components/layout/Lanyard/Lanyard";
import { heroStats } from "@/app/data/homeData";
import PortfolioPill from "@/components/sections/PortfolioPill";
import SectionSurface from "@/components/sections/SectionSurface";

export default function HeroSection() {
  return (
    <SectionSurface className="hero-section-card pt-16 md:pt-24">
      <div className="p-10 md:p-16 xl:p-20 page-enter">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:gap-16">
          <div>
            <p className="section-kicker">Fullstack Developer</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <PortfolioPill strong>Available</PortfolioPill>
              <PortfolioPill>Freelance</PortfolioPill>
            </div>

            <h1 className="neon-title mt-4">Yohan Christazel Jeffry</h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              Fullstack developer building fast, modern products. Next.js + Tailwind for web, Express/MongoDB for
              backend, and Flutter for mobile.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a className="btn-neon" href="#projects">
                View Projects
              </a>
              <a
                className="btn-neon-ghost"
                href="/asset/yohan-christazel-jeffry-cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
              <a className="nav-link" href="mailto:yohan.christazel9@gmail.com">
                Email
              </a>
              <a
                className="nav-link"
                href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="shrink-0">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>

            <div className="stat-card">
              <p className="section-kicker">Now Building</p>
              <p className="mt-2 text-sm text-zinc-300">
                Shipping web apps with clean UX, thoughtful systems, and reliable APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
