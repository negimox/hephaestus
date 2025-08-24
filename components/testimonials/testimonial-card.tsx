import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Testimonial {
  id: string
  name: string
  location: string
  service: string
  rating: number
  review: string
  date: string
  verified: boolean
  avatar?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
  compact?: boolean
}

export function TestimonialCard({ testimonial, compact = false }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (compact) {
    return (
      <div className="bg-card rounded-lg border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">{testimonial.name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="font-semibold text-sm">{testimonial.name}</h4>
            <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{testimonial.review}</p>
        <Badge variant="outline" className="mt-2 text-xs">
          {testimonial.service}
        </Badge>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-lg font-semibold text-primary">{testimonial.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{testimonial.name}</h4>
            {testimonial.verified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
          <div className="flex items-center gap-1 mt-1">{renderStars(testimonial.rating)}</div>
        </div>
      </div>

      <blockquote className="text-muted-foreground mb-4 flex-1">"{testimonial.review}"</blockquote>

      <div className="flex items-center justify-between text-sm">
        <Badge variant="outline">{testimonial.service}</Badge>
        <span className="text-muted-foreground">{testimonial.date}</span>
      </div>
    </div>
  )
}
