"use client";

const TRACK_ID = "project-carousel-track";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="h-[1em] w-[1em]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function slide(direction: "prev" | "next") {
  const track = document.getElementById(TRACK_ID);
  if (!track) return;

  const amount = track.clientWidth * 0.82;
  track.scrollBy({
    left: direction === "next" ? amount : -amount,
    behavior: "smooth",
  });
}

export default function ProjectCarouselControls() {
  return (
    <>
      <button
        type="button"
        className="project-carousel-control project-carousel-control-prev"
        onClick={() => slide("prev")}
        aria-label="Previous project card"
      >
        <ChevronIcon direction="left" />
      </button>

      <button
        type="button"
        className="project-carousel-control project-carousel-control-next"
        onClick={() => slide("next")}
        aria-label="Next project card"
      >
        <ChevronIcon direction="right" />
      </button>
    </>
  );
}
