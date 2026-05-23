"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

type Props = {
  imageSrc?: string;
  alt?: string;
  staticMode?: boolean;
};

export default function LanyardHolderSingle({
  imageSrc = "/asset/profile_800.webp",
  alt = "Profile photo",
  staticMode = false,
}: Props) {
  const reduce = useReducedMotion();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const rotate = useTransform(dragX, [-120, 120], [-9, 9]);
  const shouldIdle = !reduce && !staticMode;

  return (
    <div className="lanyard-wrapper" aria-label={alt}>
      <div className="lanyard-anchor">
        <span className="lanyard-anchor-dot" />
        <span className="lanyard-anchor-glow" />
      </div>

      <motion.div
        className="lanyard-rig"
        animate={shouldIdle ? { rotate: [-1.4, 1.4, -1.4], y: [0, 3, 0] } : undefined}
        transition={shouldIdle ? { duration: 6.5, ease: "easeInOut", repeat: Infinity } : undefined}
        style={{ x: dragX, y: dragY, rotate, transformOrigin: "50% 0%" }}
        drag={!reduce}
        dragConstraints={{ left: -92, right: 92, top: -34, bottom: 86 }}
        dragElastic={0.16}
        whileDrag={{ scale: 1.02 }}
      >
        <div className="lanyard-strap">
          <span className="lanyard-strap-line" />
          <span className="lanyard-strap-line" />
        </div>

        <div className="lanyard-buckle">
          <span />
        </div>

        <div className="lanyard-ring">
          <span />
        </div>

        <div className="lanyard-clip">
          <span />
        </div>

        <div className="lanyard-card-shadow" />

        <div className="lanyard-card">
          <div className="lanyard-card-hole" />
          <div className="lanyard-card-window">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              priority
              quality={80}
              sizes="(max-width: 640px) 190px, (max-width: 1024px) 220px, 250px"
              className="object-cover object-center"
            />
            <span className="lanyard-card-shine" />
          </div>
          <div className="lanyard-card-footer">
            <span>Yohan Christazel Jeffry</span>
            <span>Informatics Student</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
