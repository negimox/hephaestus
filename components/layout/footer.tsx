import { LogoSvg } from "./header/logo-svg";
import { ServiceLinks } from "./service-links";
import { FOOTER_SERVICES } from "@/lib/services";
import { SidebarLinks } from "./sidebar/product-sidebar-links";

export function Footer() {
  // Curated list of services for the footer (keeps footer fast and predictable)
  const services = FOOTER_SERVICES;

  return (
    <footer className="p-sides">
      <div className="w-full md:h-[532px] p-sides md:p-11 text-background bg-foreground rounded-[12px] flex flex-col justify-between max-md:gap-8">
        <div className="flex flex-col justify-between md:flex-row gap-6">
          <div className="md:basis-3/4">
            <LogoSvg className="max-md:w-full max-w-[1200px] h-auto block" />
            <p className="mt-4 opacity-90">
              Fast, reliable mobile repairs with a 30-day parts & labor
              warranty.
            </p>
            <div className="mt-4 text-sm opacity-80">
              <p>
                Phone:{" "}
                <a className="underline" href="tel:+18005551234">
                  (800) 555-1234
                </a>
              </p>
              <p>
                Email:{" "}
                <a className="underline" href="mailto:help@phonefixpro.example">
                  help@phonefixpro.example
                </a>
              </p>
              <p className="mt-1">Hours: Mon–Fri 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="md:flex-1 flex flex-col items-end">
            <ServiceLinks
              services={services}
              className="max-md:hidden"
              align="right"
            />
            <span className="mt-3 italic font-semibold md:hidden">
              Trusted. Local. Professional.
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center max-md:contents text-muted-foreground mt-6">
          <SidebarLinks
            className="max-w-[450px] w-full max-md:flex-col"
            size="base"
            invert
          />
          <p className="text-base">
            {new Date().getFullYear()} © ACME — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
