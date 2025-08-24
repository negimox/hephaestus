"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Phone, Wrench } from "lucide-react";
import Link from "next/link";

import { QUICK_SERVICES } from "@/lib/services";

export function BookingModal({ isOnHero }: { isOnHero?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className={cn(
            "uppercase",
            isOnHero
              ? "bg-foreground text-background hover:bg-foreground/90"
              : ""
          )}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
          </DialogTitle>
          <DialogDescription>
            Choose a service below or view all available repair services.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {QUICK_SERVICES.map((service) => (
            <div
              key={service.slug}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{service.title}</h4>
                  {service.popular && (
                    <Badge variant="secondary" className="text-xs">
                      Popular
                    </Badge>
                  )}
                  {service.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Emergency
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{service.price}</span>
                  <span>{service.duration}</span>
                </div>
              </div>
              <Button size="sm" asChild onClick={() => setIsOpen(false)}>
                <Link href={`/book/${service.slug}`}>Book</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-4 border-t">
          <Button asChild onClick={() => setIsOpen(false)}>
            <Link href="/services">View All Services</Link>
          </Button>
          <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
            <Link href="/contact">
              <Phone className="w-4 h-4 mr-2" />
              Call (123) 456-7890
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
