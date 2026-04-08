"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const navLinks = [
  { href: "/", label: "Browse" },
  { href: "/explore", label: "Explore" },
];

export function CompendiumHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-warm-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-primary-700 font-[family-name:var(--font-heading)]"
          >
            Kalamos
            <span className="text-warm-400 font-normal text-sm">
              Compendium
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                    ? "bg-primary-50 text-primary-700"
                    : "text-warm-600 hover:text-warm-900 hover:bg-warm-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <a
          href="https://kalamos.care"
          className="text-sm text-warm-500 hover:text-warm-700 flex items-center gap-1"
        >
          kalamos.care
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
