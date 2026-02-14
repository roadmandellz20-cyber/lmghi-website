import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LMGHI — Lambano Medfront Global Health Initiative",
  description:
    "Structured, governed, data-driven global health delivery infrastructure.",
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact & Transparency" },
  { href: "/resources", label: "Knowledge Hub" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/25" />
              <div className="leading-tight">
                <div className="font-semibold">LMGHI</div>
                <div className="text-xs text-white/60">
                  Lambano Medfront Global Health Initiative
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-2 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/get-involved"
                className="ml-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Donate
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto max-w-6xl px-6 text-sm text-white/60">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} LMGHI. All rights reserved.</div>
              <div className="text-white/50">
                Structured • Governed • Data-driven • Accountable • Scalable
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
