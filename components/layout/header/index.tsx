"use client";

import MobileMenu from "./mobile-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoSvg } from "./logo-svg";
import { BookingModal } from "@/components/booking/booking-modal";
import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book Repair", href: "/book" },
  { label: "Reviews", href: "/testimonials" },
];

interface HeaderProps {
  collections: Array<{ title: string; handle: string }>;
}

export function Header({ collections }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "grid fixed top-0 left-0 z-50 grid-cols-3 items-start w-full p-sides md:grid-cols-12 md:gap-sides",
        pathname === "/" && "header-on-hero"
      )}
    >
      <div className="block flex-none md:hidden">
        <MobileMenu collections={collections} />
      </div>
      <Link href="/" className="md:col-span-3 xl:col-span-2" prefetch>
        <LogoSvg className="w-auto h-6 max-md:place-self-center md:w-full md:h-auto max-w-96" />
      </Link>
      <nav
        className={`flex gap-2 justify-end items-center md:col-span-9 xl:col-span-10`}
        aria-label="Main navigation"
      >
        <ul
          className={cn(
            "items-center gap-5 py-0.5 px-3 rounded-sm backdrop-blur-md hidden md:flex",
            pathname === "/" ? "header-overlay-nav" : "bg-background/10"
          )}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-semibold text-base transition-colors duration-200 uppercase",
                  pathname === "/"
                    ? "header-overlay-link"
                    : pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/50"
                )}
                prefetch
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Visible phone CTA for quick support */}
        <a
          href="tel:+18005556789"
          className={cn(
            "hidden md:inline-block mr-3 font-medium text-sm",
            pathname === "/" ? "text-background" : "text-foreground/90"
          )}
          aria-label="Call PhoneFix Pro"
        >
          (800) 555-6789
        </a>

        <BookingModal isOnHero={pathname === "/"} />
      </nav>
    </header>
  );
}
