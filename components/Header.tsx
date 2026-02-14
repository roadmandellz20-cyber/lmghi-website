"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact & Transparency" },
  { href: "/resources", label: "Knowledge Hub" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const next = theme === "dark" ? "light" : "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => setTheme(next)}
      className="liquid-btn rounded-full px-3 py-2 text-xs font-semibold"
      type="button"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </motion.button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/25" />
          <div className="leading-tight">
            <div className="text-sm font-semibold md:text-base">LMGHI</div>
            <div className="hidden text-xs text-black/60 dark:text-white/60 md:block">
              Lambano Medfront Global Health Initiative
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-black/80 hover:bg-black/5 hover:text-black dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle />

          <Link
            href="/get-involved"
            className="ml-2 liquid-btn rounded-full bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Donate
          </Link>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="liquid-btn rounded-full px-3 py-2 text-xs font-semibold"
            type="button"
            aria-label="Open menu"
          >
            Menu
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black"
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Navigation</div>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setOpen(false)}
                  className="liquid-btn rounded-full px-3 py-2 text-xs font-semibold"
                  type="button"
                >
                  Close
                </motion.button>
              </div>

              <div className="mt-5 space-y-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/get-involved"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  Donate
                </Link>

                <div className="mt-3 text-xs text-black/60 dark:text-white/60">
                  Structured • Governed • Data-driven • Accountable • Scalable
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
