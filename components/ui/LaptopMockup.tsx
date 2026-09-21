interface LaptopMockupProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function LaptopMockup({ src, alt }: LaptopMockupProps) {
  return (
    <div className="laptop-mockup-wrapper">
      {/* Laptop body */}
      <div className="laptop-mockup-body">
        {/* Camera notch */}
        <div className="laptop-mockup-camera" aria-hidden="true">
          <span className="laptop-mockup-camera-dot" />
        </div>

        {/* Screen bezel + content */}
        <div className="laptop-mockup-screen">
          {/* Browser chrome bar */}
          <div className="laptop-mockup-browser-bar" aria-hidden="true">
            <span className="laptop-mockup-dot laptop-mockup-dot-red" />
            <span className="laptop-mockup-dot laptop-mockup-dot-yellow" />
            <span className="laptop-mockup-dot laptop-mockup-dot-green" />
          </div>

          {/* Screenshot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="laptop-mockup-img"
            loading="lazy"
          />
        </div>
      </div>

      {/* Base / stand */}
      <div className="laptop-mockup-stand" aria-hidden="true">
        <div className="laptop-mockup-stand-neck" />
        <div className="laptop-mockup-stand-foot" />
      </div>
    </div>
  );
}
