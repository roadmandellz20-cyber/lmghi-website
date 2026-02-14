import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Header from "../components/Header";
import MotionSystem from "../components/MotionSystem";
import PageTransition from "../components/PageTransition";

export const metadata: Metadata = {
  title: "LMGHI — Lambano Medfront Global Health Initiative",
  description: "Structured, governed, data-driven global health delivery infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell">
        <Providers>
          {/* Global motion layer */}
          <MotionSystem />

          {/* Header */}
          <Header />

          {/* Content */}
          <main className="container-safe py-10">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* Footer */}
          <footer className="border-t border-black/10 py-10 text-sm text-black/60 dark:border-white/10 dark:text-white/60">
            <div className="container-safe flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} LMGHI. All rights reserved.</div>
              <div className="opacity-70">
                Structured • Governed • Data-driven • Accountable • Scalable
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
