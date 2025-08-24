import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ALL_SERVICES, SERVICE_CATEGORIES } from "@/lib/services";

export const metadata: Metadata = {
  title: "ACME | All Repair Services",
  description:
    "Complete list of professional mobile phone repair services. Screen replacement, battery repair, water damage recovery, and more with expert technicians.",
};

const allServices = ALL_SERVICES;
const serviceCategories = SERVICE_CATEGORIES;

export default function ServicesPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 bg-accent/10 text-accent border-accent/20"
          >
            Professional Repair Services
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expert Mobile Phone Repairs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your device back to perfect condition with our professional
            repair services. Quick turnaround, quality guaranteed, and expert
            technicians you can trust.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {serviceCategories.map((category) => (
            <Button
              key={category.slug}
              variant={category.slug === "all" ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link
                href={
                  category.slug === "all"
                    ? "/services"
                    : `/services/category/${category.slug}`
                }
              >
                {category.title} ({category.count})
              </Link>
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allServices.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {service.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {service.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-primary">
                    {service.price}
                  </span>
                  <Button asChild>
                    <Link href={`/services/${service.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Need Help Choosing a Service?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our expert technicians can diagnose your device and recommend the
            best repair solution.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get Free Diagnosis</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
