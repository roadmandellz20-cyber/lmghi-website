import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "./providers";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "LMGHI — Lambano Medfront Global Health Initiative",
  description: "Structured, governed, data-driven global health delivery infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="no-overflow-x">
        <div className="app-bg" />
        <ThemeProvider>
          <Header />
          <main className="container-safe py-10">{children}</main>
          <footer className="mt-14 border-t border-black/10 py-10 dark:border-white/10">
            <div className="container-safe text-sm opacity-80">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>© {new Date().getFullYear()} LMGHI. All rights reserved.</div>
                <div className="opacity-70">
                  Structured • Governed • Data-driven • Accountable • Scalable
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
