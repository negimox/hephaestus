"use client";

import { useState } from "react";
import { TestimonialCard } from "./testimonial-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getServiceByTitle } from "@/lib/services";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Downtown",
    service:
      getServiceByTitle("Screen Replacement")?.title || "Screen Replacement",
    rating: 5,
    review:
      "Amazing service! Fixed my iPhone screen in just 45 minutes. Quality is perfect!",
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
      "Phone lasts all day again! Professional service and clear explanations.",
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
      "Saved my phone from pool damage! Recovered all my photos. Miracle workers!",
    date: "3 weeks ago",
    verified: true,
  },
];

export function TestimonialsWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-muted rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevTestimonial}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextTestimonial}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <TestimonialCard testimonial={testimonials[currentIndex]} compact />
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
