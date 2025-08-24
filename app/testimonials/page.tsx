import type { Metadata } from "next"
import { PageLayout } from "@/components/layout/page-layout"
import { TestimonialCard } from "@/components/testimonials/testimonial-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | PhoneFix Pro",
  description:
    "Read what our customers say about our professional mobile phone repair services. Real reviews from satisfied customers.",
}

const allTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Downtown",
    service: "Screen Replacement",
    rating: 5,
    review:
      "Amazing service! My iPhone screen was completely shattered and they fixed it in just 45 minutes. The quality is perfect and the price was very reasonable. The technician was professional and explained the whole process. I'll definitely come back if I need any other repairs!",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    location: "Midtown",
    service: "Battery Replacement",
    rating: 5,
    review:
      "My phone was dying every few hours and I was constantly carrying a charger. After the battery replacement, it lasts all day again! Professional service and they explained everything clearly. The warranty gave me peace of mind too.",
    date: "1 month ago",
    verified: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    location: "Westside",
    service: "Water Damage Repair",
    rating: 5,
    review:
      "Dropped my phone in the pool during a party and thought it was gone forever. These guys saved it! They recovered all my photos and contacts, and the phone works perfectly now. Absolute miracle workers! Worth every penny.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: "4",
    name: "David Kim",
    location: "Eastside",
    service: "Camera Repair",
    rating: 5,
    review:
      "Camera was blurry and wouldn't focus properly. They diagnosed the issue quickly and had it fixed the same day. Photos are crystal clear now and the focus is perfect. Great experience from start to finish!",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "5",
    name: "Jessica Martinez",
    location: "Northside",
    service: "Charging Port Fix",
    rating: 5,
    review:
      "Charging port was loose and my phone would only charge at certain angles. They fixed it perfectly and now it charges like new. Quick service and fair pricing. Highly recommend!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "6",
    name: "Robert Taylor",
    location: "Southside",
    service: "Software Troubleshooting",
    rating: 5,
    review:
      "Phone was running super slow and had weird pop-ups. They cleaned everything up, removed malware, and optimized the performance. Feels like a brand new phone now!",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "7",
    name: "Amanda Wilson",
    location: "Central",
    service: "Screen Replacement",
    rating: 5,
    review:
      "Cracked my screen badly but they had it looking perfect in under an hour. The replacement screen quality is excellent and you can't even tell it was repaired. Professional and efficient!",
    date: "4 days ago",
    verified: true,
  },
  {
    id: "8",
    name: "James Brown",
    location: "Harbor District",
    service: "Water Damage Repair",
    rating: 4,
    review:
      "Phone got soaked in the rain. They managed to save most of the functionality, though the speaker is slightly different now. Still very happy with the service and the fact that they saved my data!",
    date: "2 weeks ago",
    verified: true,
  },
]

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Happy Customers",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
  },
  {
    icon: Award,
    value: "5 Years",
    label: "Experience",
  },
]

export default function TestimonialsPage() {
  const averageRating = allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length

  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20">
            Customer Reviews
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Real reviews from real customers. See why thousands of people trust us with their mobile device repairs.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Summary */}
        <div className="bg-muted rounded-lg p-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
          </div>
          <p className="text-muted-foreground">
            Based on {allTestimonials.length} verified reviews from customers who used our repair services
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-lg border p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers who trust us with their mobile device repairs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book">Book Repair Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
