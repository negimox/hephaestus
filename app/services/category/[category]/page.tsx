import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const allServices = [
  {
    id: "1",
    title: "Screen Replacement",
    description: "Professional screen repair for all smartphone models with genuine parts and warranty.",
    price: "From $89",
    duration: "30-60 mins",
    image: "/smartphone-screen-repair-technician-working.png",
    slug: "screen-replacement",
    category: "Hardware Repair",
  },
  {
    id: "2",
    title: "Battery Replacement",
    description: "Restore your phone's battery life with high-quality replacement batteries.",
    price: "From $59",
    duration: "20-30 mins",
    image: "/phone-battery-replacement-service.png",
    slug: "battery-replacement",
    category: "Hardware Repair",
  },
  {
    id: "3",
    title: "Water Damage Repair",
    description: "Emergency water damage recovery with specialized drying and component repair.",
    price: "From $129",
    duration: "2-4 hours",
    image: "/water-damaged-phone-repair.png",
    slug: "water-damage",
    category: "Emergency Repair",
  },
  {
    id: "4",
    title: "Software Troubleshooting",
    description: "Fix software issues, remove viruses, and optimize your device performance.",
    price: "From $39",
    duration: "15-45 mins",
    image: "/phone-software-repair-diagnostic.png",
    slug: "software-repair",
    category: "Software Service",
  },
  {
    id: "5",
    title: "Camera Repair",
    description: "Professional camera lens and sensor repair for crystal clear photos.",
    price: "From $79",
    duration: "45-90 mins",
    image: "/smartphone-camera-lens-repair.png",
    slug: "camera-repair",
    category: "Hardware Repair",
  },
  {
    id: "6",
    title: "Charging Port Fix",
    description: "Repair loose or damaged charging ports to restore proper charging.",
    price: "From $69",
    duration: "30-45 mins",
    image: "/phone-charging-port-repair.png",
    slug: "charging-port",
    category: "Hardware Repair",
  },
]

const categoryMap = {
  hardware: "Hardware Repair",
  software: "Software Service",
  emergency: "Emergency Repair",
}

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const categoryName = categoryMap[category as keyof typeof categoryMap]

  if (!categoryName) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${categoryName} Services | PhoneFix Pro`,
    description: `Professional ${categoryName.toLowerCase()} services for all smartphone brands.`,
  }
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryName = categoryMap[category as keyof typeof categoryMap]

  if (!categoryName) {
    notFound()
  }

  const filteredServices = allServices.filter((service) => service.category === categoryName)

  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20">
            {categoryName}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{categoryName} Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional {categoryName.toLowerCase()} services with expert technicians and quality guarantee.
          </p>
        </div>

        {/* Back to All Services */}
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/services">← View All Services</Link>
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
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
                  <span className="text-sm text-muted-foreground">{service.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-primary">{service.price}</span>
                  <Button asChild>
                    <Link href={`/services/${service.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
