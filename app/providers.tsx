"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Keep theme stable on first load (prevents flash)
  useEffect(() => {
    // If you want default DARK, keep this:
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.6,
      }}
    >
      {children}
    </MotionConfig>
  );
}
