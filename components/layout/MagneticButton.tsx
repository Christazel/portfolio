"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function MagneticButton({ children, href, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Throttle to ~16ms (60fps)
    const now = performance.now();
    if (now - lastTimeRef.current < 16) return;
    lastTimeRef.current = now;

    // Cancel previous RAF if exists
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el || !isHoveringRef.current) return;

      const { clientX, clientY } = e;
      const r = el.getBoundingClientRect();
      const x = (clientX - (r.left + r.width / 2)) * 0.28;
      const y = (clientY - (r.top + r.height / 2)) * 0.28;
      
      setPos((prevPos) => {
        // Only update if position actually changed
        if (prevPos.x === x && prevPos.y === y) return prevPos;
        return { x, y };
      });

      rafRef.current = null;
    });
  }, []);

  const onEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const onLeave = useCallback(() => {
    isHoveringRef.current = false;
    setPos({ x: 0, y: 0 });
    
    // Cancel any pending RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isHoveringRef.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const isExternal = href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.12,
        restDelta: 0.001,
        restSpeed: 10,
      }}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </motion.a>
  );
}
