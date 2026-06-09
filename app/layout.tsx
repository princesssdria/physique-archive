import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Physique Archive",
  description: "Discover physique-inspired workout styles from iconic celebrity eras."
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/muscle-map", label: "Muscle Map" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} min-h-screen font-sans antialiased`}>
        <header className="sticky top-0 z-50 border-b border-line bg-ink/72 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-normal">
              <span className="grid size-9 place-items-center rounded-2xl bg-champagne text-ink">
                <Dumbbell size={19} />
              </span>
              Physique Archive
            </Link>
            <div className="flex items-center gap-1 rounded-full border border-line bg-white/5 p-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
