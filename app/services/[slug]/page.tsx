import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Clock, Shield, CheckCircle } from "lucide-react"

const serviceData = {
  "screen-replacement": {
    id: "1",
    title: "Screen Replacement",
    description: "Professional screen repair for all smartphone models with genuine parts and warranty.",
    longDescription:
      "Our expert technicians provide professional screen replacement services for all major smartphone brands. We use only genuine OEM parts and provide a comprehensive warranty on all repairs. Whether you have a cracked screen, dead pixels, or touch sensitivity issues, we can restore your device to perfect working condition.",
    price: "From $89",
    duration: "30-60 mins",
    image: "/smartphone-screen-repair-technician-working.png",
    category: "Hardware Repair",
    features: ["Genuine OEM parts", "90-day warranty", "Same-day service", "All brands supported"],
    process: [
      "Device inspection and diagnosis",
      "Careful disassembly of device",
      "Screen removal and replacement",
      "Quality testing and calibration",
      "Final inspection and cleanup",
    ],
    supportedDevices: ["iPhone (all models)", "Samsung Galaxy", "Google Pixel", "OnePlus", "Huawei", "Xiaomi"],
    warranty: "90 days on parts and labor",
  },
  "battery-replacement": {
    id: "2",
    title: "Battery Replacement",
    description: "Restore your phone's battery life with high-quality replacement batteries.",
    longDescription:
      "Is your phone dying quickly or not holding a charge? Our battery replacement service uses high-quality, high-capacity batteries to restore your device's performance. We properly dispose of old batteries and provide optimization tips to maximize your new battery's lifespan.",
    price: "From $59",
    duration: "20-30 mins",
    image: "/phone-battery-replacement-service.png",
    category: "Hardware Repair",
    features: ["High-capacity batteries", "Quick service", "Performance guarantee", "Eco-friendly disposal"],
    process: [
      "Battery health diagnosis",
      "Safe device opening",
      "Old battery removal",
      "New battery installation",
      "Performance testing and calibration",
    ],
    supportedDevices: ["iPhone (all models)", "Samsung Galaxy", "Google Pixel", "OnePlus", "Huawei"],
    warranty: "1 year on battery performance",
  },
  "water-damage": {
    id: "3",
    title: "Water Damage Repair",
    description: "Emergency water damage recovery with specialized drying and component repair.",
    longDescription:
      "Dropped your phone in water? Time is critical! Our emergency water damage repair service uses advanced drying techniques and component-level repair to save your device and data. We offer 24/7 emergency service for water damage cases.",
    price: "From $129",
    duration: "2-4 hours",
    image: "/water-damaged-phone-repair.png",
    category: "Emergency Repair",
    features: [
      "24/7 emergency service",
      "Advanced drying techniques",
      "Component-level repair",
      "Data recovery included",
    ],
    process: [
      "Immediate power-off and assessment",
      "Disassembly and cleaning",
      "Specialized drying process",
      "Component testing and replacement",
      "Data recovery and device testing",
    ],
    supportedDevices: ["All smartphone brands", "Tablets", "Smartwatches"],
    warranty: "60 days on repair work",
  },
  "software-repair": {
    id: "4",
    title: "Software Troubleshooting",
    description: "Fix software issues, remove viruses, and optimize your device performance.",
    longDescription:
      "Software problems slowing down your device? Our comprehensive software service includes virus removal, performance optimization, OS updates, and data backup. We can resolve crashes, freezing, slow performance, and malware issues.",
    price: "From $39",
    duration: "15-45 mins",
    image: "/phone-software-repair-diagnostic.png",
    category: "Software Service",
    features: ["Virus removal", "Performance optimization", "OS updates", "Data backup"],
    process: [
      "Comprehensive system diagnosis",
      "Malware and virus removal",
      "System optimization",
      "OS update and security patches",
      "Data backup and recovery setup",
    ],
    supportedDevices: ["iOS devices", "Android devices", "All brands and models"],
    warranty: "30 days on software fixes",
  },
  "camera-repair": {
    id: "5",
    title: "Camera Repair",
    description: "Professional camera lens and sensor repair for crystal clear photos.",
    longDescription:
      "Blurry photos or camera not working? Our camera repair service covers lens replacement, sensor calibration, and focus adjustment. We ensure your camera performs like new with professional-grade testing and calibration.",
    price: "From $79",
    duration: "45-90 mins",
    image: "/smartphone-camera-lens-repair.png",
    category: "Hardware Repair",
    features: ["Lens replacement", "Sensor calibration", "Focus adjustment", "Quality testing"],
    process: [
      "Camera system diagnosis",
      "Lens and sensor inspection",
      "Component replacement if needed",
      "Calibration and focus adjustment",
      "Photo quality testing",
    ],
    supportedDevices: ["iPhone (all models)", "Samsung Galaxy", "Google Pixel", "OnePlus"],
    warranty: "90 days on camera repairs",
  },
  "charging-port": {
    id: "6",
    title: "Charging Port Fix",
    description: "Repair loose or damaged charging ports to restore proper charging.",
    longDescription:
      "Charging port not working properly? We repair loose, damaged, or corroded charging ports to restore proper charging functionality. Our service includes port replacement, cable testing, and waterproof sealing restoration.",
    price: "From $69",
    duration: "30-45 mins",
    image: "/phone-charging-port-repair.png",
    category: "Hardware Repair",
    features: ["Port replacement", "Cable testing", "Fast charging support", "Waterproof sealing"],
    process: [
      "Charging system diagnosis",
      "Port inspection and cleaning",
      "Component replacement if needed",
      "Fast charging compatibility testing",
      "Waterproof seal restoration",
    ],
    supportedDevices: ["iPhone (all models)", "Samsung Galaxy", "Google Pixel", "OnePlus", "Huawei"],
    warranty: "90 days on charging port repairs",
  },
}

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = serviceData[slug as keyof typeof serviceData]

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title} | PhoneFix Pro`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceData[slug as keyof typeof serviceData]

  if (!service) {
    notFound()
  }

  return (
    <PageLayout className="bg-muted">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-sides min-h-max">
        {/* Mobile Image */}
        <div className="md:hidden col-span-full h-[40vh] min-h-[300px]">
          <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-full object-cover" />
        </div>

        {/* Service Details Sidebar */}
        <div className="flex sticky top-0 flex-col col-span-5 2xl:col-span-4 max-md:col-span-full md:h-screen min-h-max max-md:p-sides md:pl-sides md:pt-top-spacing max-md:static">
          <div className="col-span-full">
            <Breadcrumb className="col-span-full mb-4 md:mb-8">
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
                  <BreadcrumbPage>{service.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col col-span-full gap-4 md:mb-10 max-md:order-2">
              <div className="flex flex-col grid-cols-2 px-3 py-2 rounded-md bg-popover md:grid md:gap-x-4 md:gap-y-6 place-items-baseline">
                <div className="col-span-2">
                  <Badge variant="secondary" className="mb-2">
                    {service.category}
                  </Badge>
                  <h1 className="text-lg font-semibold lg:text-xl 2xl:text-2xl text-balance max-md:mb-4">
                    {service.title}
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground col-span-2">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </div>
                <p className="flex gap-3 items-center text-lg font-semibold lg:text-xl 2xl:text-2xl">{service.price}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/book/${slug}`}>Book This Service</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Service Features */}
          <div className="col-span-full mb-6">
            <h3 className="font-semibold mb-3">What's Included</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Warranty Info */}
          <div className="col-span-full mb-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              {service.warranty}
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden overflow-y-auto relative col-span-7 col-start-6 w-full md:block p-sides pt-top-spacing">
          <div className="space-y-8">
            {/* Service Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>
              <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>
            </div>

            {/* Repair Process */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Repair Process</h2>
              <div className="space-y-3">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Devices */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Supported Devices</h2>
              <div className="grid grid-cols-2 gap-2">
                {service.supportedDevices.map((device, index) => (
                  <Badge key={index} variant="outline" className="justify-center">
                    {device}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
