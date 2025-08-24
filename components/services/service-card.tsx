import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  slug: string;
}

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
  className?: string;
}

export function ServiceCard({
  service,
  featured = false,
  className,
}: ServiceCardProps) {
  if (featured) {
    return (
      <div className={cn("min-h-fold flex flex-col relative", className)}>
        <div className="size-full flex-1 flex flex-col">
          <Image
            priority
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            width={1000}
            height={600}
            quality={100}
            className="object-cover size-full flex-1"
          />
        </div>
        <div className="absolute bottom-0 left-0 grid w-full grid-cols-4 gap-6 pointer-events-none max-md:contents p-sides">
          <div className="col-span-3 col-start-2 pointer-events-auto 2xl:col-start-3 2xl:col-span-2 shrink-0">
            <div className="bg-card/95 backdrop-blur-sm p-6 rounded-lg border">
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-primary">
                  {service.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {service.duration}
                </span>
              </div>
              <Button asChild className="w-full">
                <Link href={`/book/${service.slug}`}>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative group", className)}>
      <div className="block w-full aspect-square overflow-hidden ">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          width={400}
          height={400}
          className="object-cover size-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent " />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold mb-1">{service.title}</h3>
        <p className="text-white/80 text-sm mb-2">{service.price}</p>
        <Button size="sm" asChild>
          <Link href={`/book/${service.slug}`}>Book Service</Link>
        </Button>
      </div>
    </div>
  );
}
