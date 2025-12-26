"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function MagneticButton({ children, href, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    const r = el.getBoundingClientRect();
    const x = (clientX - (r.left + r.width / 2)) * 0.28;
    const y = (clientY - (r.top + r.height / 2)) * 0.28;
    setPos({ x, y });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.12 }}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </motion.a>
  );
}
