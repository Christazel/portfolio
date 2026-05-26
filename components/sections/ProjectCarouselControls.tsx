"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TRACK_ID = "project-carousel-track";

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
        <FiChevronLeft aria-hidden="true" />
      </button>

      <button
        type="button"
        className="project-carousel-control project-carousel-control-next"
        onClick={() => slide("next")}
        aria-label="Next project card"
      >
        <FiChevronRight aria-hidden="true" />
      </button>
    </>
  );
}
