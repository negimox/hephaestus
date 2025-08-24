import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/page-layout";
import { BookingForm } from "@/components/booking/booking-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ALL_SERVICES, getServiceBySlug } from "@/lib/services";

export async function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const serviceInfo = getServiceBySlug(service as string);

  if (!serviceInfo) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `Book ${serviceInfo.title} | PhoneFix Pro`,
    description: `Schedule your ${serviceInfo.title.toLowerCase()} appointment with our expert technicians.`,
  };
}

export default async function BookServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const serviceInfo = getServiceBySlug(service as string);

  if (!serviceInfo) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8 max-w-4xl">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/services" prefetch>
                  Services
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/services/${service}`} prefetch>
                  {serviceInfo.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Book Appointment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-6 sticky top-8">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  src={serviceInfo.image || "/placeholder.svg"}
                  alt={serviceInfo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {serviceInfo.title}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {serviceInfo.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Duration:
                  </span>
                  <span className="text-sm font-medium">
                    {serviceInfo.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="text-sm font-medium">
                    {serviceInfo.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Category:
                  </span>
                  <span className="text-sm font-medium">
                    {serviceInfo.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-6">
              <h1 className="text-2xl font-bold mb-6">Book Your Appointment</h1>
              <BookingForm service={serviceInfo} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
