"use client";

import React, { useEffect } from "react";

export default function AdminBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const header = document.querySelector("header");
    const prevDisplay = header ? (header as HTMLElement).style.display : "";
    if (header) {
      (header as HTMLElement).style.display = "none";
    }

    return () => {
      if (header) {
        (header as HTMLElement).style.display = prevDisplay || "";
      }
    };
  }, []);

  // Render children directly; pages under this layout should provide their own layout/container
  return <>{children}</>;
}
