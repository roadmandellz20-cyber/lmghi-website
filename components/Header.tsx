"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact & Transparency" },
  { href: "/resources", label: "Knowledge Hub" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // ✅ prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  // ✅ toggle theme properly
  const toggleTheme = () => {
    const root = document.documentElement;

    if (dark) {
      root.classList.remove("dark");
      setDark(false);
    } else {
      root.classList.add("dark");
      setDark(true);
    }
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
      <div className="container-safe flex items-center justify-between py-4">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30" />
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">LMGHI</div>
            <div className="text-xs opacity-60">
              Lambano Medfront Global Health Initiative
            </div>
          </div>
        </Link>

        {/* ✅ Desktop nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="liquid-btn px-4 py-2 text-sm"
            >
              {item.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="liquid-btn ml-2 flex items-center justify-center p-2"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Donate button */}
          <Link
            href="/get-involved"
            className="ml-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Donate
          </Link>
        </nav>

        {/* ✅ Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="liquid-btn p-2"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setOpen(true)}
            className="liquid-btn p-2"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* ✅ Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 shadow-2xl dark:bg-neutral-950">
            <div className="mb-6 flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <button
                onClick={() => setOpen(false)}
                className="liquid-btn p-2"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="liquid-btn w-full px-4 py-3 text-sm"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/get-involved"
                onClick={() => setOpen(false)}
                className="mt-3 w-full rounded-full bg-emerald-500 px-5 py-3 text-center font-semibold text-black"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
