import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "./providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "LMGHI — Lambano Medfront Global Health Initiative",
  description: "Structured, governed, data-driven global health delivery infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <Providers>
          <Header />

          <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
            {children}
          </main>

          <footer className="border-t border-black/10 py-10 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 text-sm text-black/60 dark:px-6 dark:text-white/60">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>© {new Date().getFullYear()} LMGHI. All rights reserved.</div>
                <div className="text-black/50 dark:text-white/50">
                  Structured • Governed • Data-driven • Accountable • Scalable
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
