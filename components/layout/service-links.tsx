import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceLinksProps {
  services: Array<{ title: string; slug: string }>
  align?: "left" | "right"
  label?: string
  className?: string
}

export function ServiceLinks({ services, label = "Services", align = "left", className }: ServiceLinksProps) {
  return (
    <div className={cn(align === "right" ? "text-right" : "text-left", className)}>
      <h4 className="text-lg font-extrabold md:text-xl">{label}</h4>

      <ul className="flex flex-col gap-1.5 leading-5 mt-5">
        {services.map((service, index) => (
          <li key={`${service.slug}-${index}`}>
            <Link href={`/services/${service.slug}`} prefetch className="hover:text-primary transition-colors">
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
