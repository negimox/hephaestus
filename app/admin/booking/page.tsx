import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";

async function fetchBookings() {
  // Use NEXT_PUBLIC_SITE_URL if set (for local preview or custom domain).
  // Otherwise use a relative path so server-side fetch resolves correctly on the deployment platform.
  const base = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";
  const url = `${base}/api/bookings`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  const data = await res.json();
  return data.bookings || [];
}

export default async function AdminBookingsPage() {
  const bookings = await fetchBookings();

  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Bookings</h1>
          <Link href="/admin">Back to Admin</Link>
        </div>

        <Table>
          <TableCaption>Recent bookings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b: any) => (
              <TableRow key={b.id}>
                <TableCell>
                  <Link href={`/admin/booking/${b.id}`}>{b.id}</Link>
                </TableCell>
                <TableCell>{b.service}</TableCell>
                <TableCell>
                  {b.customer?.firstName} {b.customer?.lastName}
                  <div className="text-xs text-muted-foreground">
                    {b.customer?.email} • {b.customer?.phone}
                  </div>
                </TableCell>
                <TableCell>
                  {b.device?.model}
                  <div className="text-xs text-muted-foreground">
                    {b.device?.condition}
                  </div>
                </TableCell>
                <TableCell>
                  {b.date ? new Date(b.date).toLocaleDateString() : ""} {b.time}
                </TableCell>
                <TableCell>{b.status}</TableCell>
                <TableCell>
                  {b.createdAt ? new Date(b.createdAt).toLocaleString() : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
}
