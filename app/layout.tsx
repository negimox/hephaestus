import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CartProvider } from "@/components/cart/cart-context";
import { DebugGrid } from "@/components/debug-grid";
import { isDevelopment } from "@/lib/constants";
import { Header } from "../components/layout/header";
import { SERVICE_CATEGORIES } from "@/lib/services";
import dynamic from "next/dynamic";
import { V0Provider } from "../lib/context";
import { cn } from "../lib/utils";

const V0Setup = dynamic(() => import("@/components/v0-setup"));

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhoneFix Pro - Expert Mobile Repair Services",
  description:
    "Professional smartphone repair services with quick turnaround times. Screen replacement, battery repair, water damage recovery, and more.",
};

/**
 * Root Layout Component for PhoneFix Pro
 *
 * This is the main layout component that wraps the entire application.
 * It provides essential providers and global functionality including:
 * - Mobile repair service booking and management
 * - Font configuration with Geist Sans and Mono
 * - Toast notifications for user feedback
 * - URL state management with nuqs
 * - Development debugging tools
 * - v0 environment detection and setup
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serviceCategories = SERVICE_CATEGORIES.map((c) => ({
    title: c.title,
    handle: c.slug,
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen",
          { "is-v0": isV0 }
        )}
        suppressHydrationWarning
      >
        <V0Provider isV0={isV0}>
          <CartProvider>
            <NuqsAdapter>
              <main data-vaul-drawer-wrapper="true">
                <Header collections={serviceCategories} />
                {children}
              </main>
              {isDevelopment && <DebugGrid />}
              <Toaster closeButton position="bottom-right" />
            </NuqsAdapter>
          </CartProvider>
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  );
}
