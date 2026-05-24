"use client";

import Lanyard from "@/components/layout/Lanyard/Lanyard";
import MetaBalls from "@/components/layout/MetaBalls";
import { heroStats } from "@/app/data/homeData";
import PortfolioPill from "@/components/sections/PortfolioPill";
import SectionSurface from "@/components/sections/SectionSurface";

export default function HeroSection() {
  return (
    <SectionSurface className="hero-section-card pt-0">
      <div className="hero-container">
        {/* Left side: Dark visual section with Lanyard */}
        <div className="hero-left">
          <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={2}
            ballCount={15}
            animationSize={30}
            enableMouseInteraction
            enableTransparency={true}
            hoverSmoothness={0.15}
            clumpFactor={1}
            speed={0.3}
          />
          <div className="hero-lanyard-wrapper">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>

        {/* Right side: Light content section */}
        <div className="hero-right page-enter">
          <div className="hero-content-inner">
            <div className="hero-eyebrow">
              <span className="hero-dot" aria-hidden="true" />
              <p className="section-kicker">Fullstack Developer</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <PortfolioPill strong>Available</PortfolioPill>
              <PortfolioPill>Freelance</PortfolioPill>
            </div>

            <h1 className="hero-title mt-6">
              Yohan
              <span className="hero-title-accent">Christazel</span>
              Jeffry
            </h1>

            <p className="hero-subtitle mt-6">
              Fullstack developer building fast, modern products. Next.js + Tailwind for web, Express/MongoDB for
              backend, and Flutter for mobile.
            </p>

            <div className="hero-actions mt-8">
              <a className="btn-neon" href="#projects">
                View Projects
              </a>
              <a
                className="btn-neon-ghost"
                href="/asset/yohan-christazel-jeffry-cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Get CV PDF
              </a>
            </div>

            <div className="hero-meta mt-6">
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

            <div className="hero-stats mt-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
