import type { Metadata } from "next"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Book Repair Service | PhoneFix Pro",
  description: "Schedule your mobile phone repair appointment with our expert technicians.",
}

const popularServices = [
  {
    id: "1",
    title: "Screen Replacement",
    description: "Professional screen repair for all smartphone models",
    price: "From $89",
    duration: "30-60 mins",
    image: "/smartphone-screen-repair-technician-working.png",
    slug: "screen-replacement",
    popular: true,
  },
  {
    id: "2",
    title: "Battery Replacement",
    description: "Restore your phone's battery life",
    price: "From $59",
    duration: "20-30 mins",
    image: "/phone-battery-replacement-service.png",
    slug: "battery-replacement",
    popular: true,
  },
  {
    id: "3",
    title: "Water Damage Repair",
    description: "Emergency water damage recovery",
    price: "From $129",
    duration: "2-4 hours",
    image: "/water-damaged-phone-repair.png",
    slug: "water-damage",
    urgent: true,
  },
]

export default function BookingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20">
            Book Appointment
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Schedule Your Repair</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a service below to book your appointment with our expert technicians. Quick, reliable, and
            professional repair services.
          </p>
        </div>

        {/* Quick Booking Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {popularServices.map((service) => (
            <div key={service.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
              {service.popular && (
                <Badge variant="secondary" className="mb-3">
                  Most Popular
                </Badge>
              )}
              {service.urgent && (
                <Badge variant="destructive" className="mb-3">
                  Emergency Service
                </Badge>
              )}
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-primary">{service.price}</span>
                <span className="text-sm text-muted-foreground">{service.duration}</span>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/book/${service.slug}`}>Book Now</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* All Services Link */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Need a different service?</p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-12 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help or Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer service team is here to help you choose the right service and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+1234567890">Call (123) 456-7890</a>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
