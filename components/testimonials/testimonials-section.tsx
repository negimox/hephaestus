import { TestimonialCard } from "./testimonial-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getServiceByTitle } from "@/lib/services";

const featuredTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Downtown",
    service:
      getServiceByTitle("Screen Replacement")?.title || "Screen Replacement",
    rating: 5,
    review:
      "Amazing service! My iPhone screen was completely shattered and they fixed it in just 45 minutes. The quality is perfect and the price was very reasonable. Highly recommend!",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    location: "Midtown",
    service:
      getServiceByTitle("Battery Replacement")?.title || "Battery Replacement",
    rating: 5,
    review:
      "My phone was dying every few hours. After the battery replacement, it lasts all day again! Professional service and they explained everything clearly.",
    date: "1 month ago",
    verified: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    location: "Westside",
    service:
      getServiceByTitle("Water Damage Repair")?.title || "Water Damage Repair",
    rating: 5,
    review:
      "Dropped my phone in the pool and thought it was gone forever. These guys saved it! They recovered all my photos and the phone works perfectly now. Miracle workers!",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: "4",
    name: "David Kim",
    location: "Eastside",
    service: getServiceByTitle("Camera Repair")?.title || "Camera Repair",
    rating: 5,
    review:
      "Camera was blurry and wouldn't focus. They diagnosed the issue quickly and had it fixed the same day. Photos are crystal clear now. Great experience!",
    date: "1 week ago",
    verified: true,
  },
];

interface TestimonialsSectionProps {
  showHeader?: boolean;
  compact?: boolean;
  limit?: number;
}

export function TestimonialsSection({
  showHeader = true,
  compact = false,
  limit,
}: TestimonialsSectionProps) {
  const displayTestimonials = limit
    ? featuredTestimonials.slice(0, limit)
    : featuredTestimonials;

  return (
    <section className="py-12">
      {showHeader && (
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 bg-accent/10 text-accent border-accent/20"
          >
            Customer Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about our repair services.
          </p>
        </div>
      )}

      <div
        className={`grid gap-6 ${compact ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
      >
        {displayTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            compact={compact}
          />
        ))}
      </div>

      {showHeader && (
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/testimonials">Read More Reviews</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
