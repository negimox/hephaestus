import { RepairSidebar } from "@/components/layout/sidebar/repair-sidebar";
import { PageLayout } from "@/components/layout/page-layout";
import { ServiceCard } from "@/components/services/service-card";
import { Badge } from "@/components/ui/badge";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { ALL_SERVICES, SERVICE_CATEGORIES } from "@/lib/services";

export default async function Home() {
  const [featuredService, ...otherServices] = ALL_SERVICES;

  return (
    <PageLayout>
      <div className="contents md:grid md:grid-cols-12 md:gap-sides">
        <RepairSidebar
          services={SERVICE_CATEGORIES.map((c) => ({
            title: c.title,
            slug: c.slug,
          }))}
        />
        <div className="flex relative flex-col grid-cols-2 col-span-8 w-full md:grid">
          <ServiceCard
            className="col-span-2"
            service={featuredService}
            featured
          />

          {otherServices.map((service, index) => (
            <ServiceCard
              className="col-span-1"
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-sides">
        <TestimonialsSection limit={4} compact />
      </div>
    </PageLayout>
  );
}
