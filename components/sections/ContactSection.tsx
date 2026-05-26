import CommentBox from "@/components/ui/CommentBox";
import PortfolioPill from "@/components/sections/PortfolioPill";
import SectionSurface from "@/components/sections/SectionSurface";

export default function ContactSection() {
  return (
    <SectionSurface id="contact">
      <div className="p-8 md:p-12 xl:p-16">
        <p className="section-kicker">Get in touch</p>
        <h2 className="section-title">Contact</h2>

        <div className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-4">
              <div>
                <p className="text-xs text-zinc-500">Email</p>
                <a className="text-sm text-zinc-300 transition hover:text-white" href="mailto:yohan.christazel9@gmail.com">
                  yohan.christazel9@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-zinc-500">WhatsApp</p>
                <a
                  className="text-sm text-zinc-300 transition hover:text-white"
                  href="https://wa.me/6282150754301"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 821-5075-4301
                </a>
              </div>
              <div>
                <p className="text-xs text-zinc-500">LinkedIn</p>
                <a
                  className="text-sm text-zinc-300 transition hover:text-white"
                  href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/yohan-christazel-jeffry
                </a>
              </div>
            </div>

            <div className="stat-card h-fit">
              <p className="section-kicker">Availability</p>
              <p className="mt-2 text-sm text-zinc-300">
                Open for freelance projects, internships, and collaborative builds.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <PortfolioPill>Remote</PortfolioPill>
                <PortfolioPill>On-site</PortfolioPill>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <CommentBox />
        </div>
      </div>
    </SectionSurface>
  );
}
