"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Ripple = { id: string; x: number; y: number };

export default function MotionSystem() {
  const raf = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // Cursor glow (desktop only)
    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    // Click ripple (desktop + mobile)
    const onPointerDown = (e: PointerEvent) => {
      const id = `${Date.now()}-${Math.random()}`;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      // auto-remove
      setTimeout(() => {
        setRipples((r) => r.filter((rr) => rr.id !== id));
      }, 650);
    };

    if (!isTouch) window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      if (!isTouch) window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Floating background orbs */}
      <div className="motion-bg" aria-hidden="true">
        <motion.div
          className="orb orb-a"
          animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb orb-b"
          animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb orb-c"
          animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Cursor glow (desktop) */}
      <div
        className="cursor-glow"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="click-ripple"
            style={{ left: r.x, top: r.y }}
            initial={{ opacity: 0.45, scale: 0 }}
            animate={{ opacity: 0, scale: 2.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-hidden="true"
          />
        ))}
      </AnimatePresence>
    </>
  );
}
