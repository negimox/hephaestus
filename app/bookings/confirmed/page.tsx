import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import dynamic from "next/dynamic";

const BookingConfetti = dynamic(() => import("@/components/booking/confetti"));

interface Props {
  searchParams?: Promise<{ bookingId?: string }> | { bookingId?: string };
}

export default async function BookingConfirmedPage({ searchParams }: Props) {
  const resolved = await Promise.resolve(searchParams);
  const id = resolved?.bookingId;

  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-sides py-12">
        <div className="w-full max-w-xl">
          <Card className="p-8">
            <CardContent className="flex flex-col items-center text-center gap-6">
              <BookingConfetti />
              <div className="flex items-center justify-center bg-green-100 rounded-full w-20 h-20">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-2xl font-semibold">Booking Confirmed</h1>

              <p className="text-sm text-muted-foreground max-w-prose">
                Thank you — your booking has been received. We'll contact you
                shortly with confirmation details.
              </p>

              {id ? (
                <div className="w-full">
                  <div className="mt-2 mb-4 px-4 py-3 border rounded-md bg-surface">
                    <p className="text-xs text-muted-foreground">Booking ID</p>
                    <p className="mt-1 font-mono text-sm break-all">{id}</p>
                  </div>
                </div>
              ) : null}

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild>
                  <Link href="/services">Book another appointment</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
