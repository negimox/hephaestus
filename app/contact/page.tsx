import type { Metadata } from "next"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | PhoneFix Pro",
  description:
    "Get in touch with our expert repair technicians. Call, email, or visit our location for mobile phone repair services.",
}

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-sides py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20">
            Get In Touch
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact Our Experts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our repair services? Need a quote? Our friendly team is here to help you get your
            device back to perfect condition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                    <p className="text-sm text-muted-foreground">Call for immediate assistance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@phonefixpro.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">123 Tech Street, Downtown</p>
                    <p className="text-sm text-muted-foreground">Easy parking available</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-muted-foreground">Mon-Fri: 9AM-7PM</p>
                    <p className="text-muted-foreground">Sat: 10AM-6PM, Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Service */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <h3 className="font-semibold text-destructive mb-2">Emergency Water Damage?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Time is critical for water damage repairs. Call us immediately for 24/7 emergency service.
              </p>
              <Button variant="destructive" asChild>
                <a href="tel:+1234567890">Call Emergency Line</a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
              </div>
              <div>
                <Label htmlFor="device">Device Model</Label>
                <Input id="device" placeholder="iPhone 15 Pro, Samsung Galaxy S24, etc." />
              </div>
              <div>
                <Label htmlFor="issue">Describe the Issue</Label>
                <Textarea id="issue" placeholder="Please describe what's wrong with your device..." rows={4} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
