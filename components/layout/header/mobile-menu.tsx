"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navItems } from "./index";
import { useBodyScrollLock } from "@/lib/hooks/use-body-scroll-lock";
import { ServiceLinks } from "../service-links";

interface MobileMenuProps {
  collections: Array<{ title: string; handle: string }>;
}

export default function MobileMenu({ collections }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // Lock body scroll when menu is open
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const serviceCategories = collections.map((collection) => ({
    title: collection.title,
    slug: collection.handle,
  }));

  return (
    <>
      <Button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        variant="secondary"
        size="sm"
        className="uppercase md:hidden"
      >
        Menu
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-foreground/30"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 bottom-0 left-0 flex w-full md:w-[400px] p-modal-sides z-50"
            >
              <div className="flex flex-col p-3 w-full rounded bg-muted md:p-4">
                <div className="flex justify-between items-baseline pl-2 mb-6">
                  <p className="text-2xl font-semibold">Navigation</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Close menu"
                    onClick={closeMobileMenu}
                  >
                    Close
                  </Button>
                </div>

                <nav className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      size="sm"
                      variant="secondary"
                      onClick={closeMobileMenu}
                      className="justify-start uppercase bg-background/50"
                      asChild
                    >
                      <Link href={item.href} prefetch>
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>

                <ServiceLinks label="Services" services={serviceCategories} />

                <div className="mt-auto mb-6 text-sm leading-tight">
                  <p className="italic font-semibold">
                    Expert repairs. Fast turnaround.
                  </p>
                  <div className="mt-3 opacity-80">
                    <p>
                      Trusted technicians — genuine parts — 30-day warranty.
                    </p>
                    <p className="mt-1">Open: Mon–Fri 9:00 AM – 6:00 PM</p>
                    <p className="mt-1">
                      Phone:{" "}
                      <a className="underline" href="tel:+18005551234">
                        (800) 555-1234
                      </a>
                    </p>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-col gap-2 w-full">
                  <Button asChild className="w-full">
                    <Link href="/book">Start booking</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-transparent"
                  >
                    <Link href="/contact">Get support</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
