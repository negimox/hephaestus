import { ServiceLinks } from "../service-links";

interface RepairSidebarProps {
  services: Array<{ title: string; slug: string }>;
}

export function RepairSidebar({ services }: RepairSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        <p className="italic tracking-tighter text-base text-primary">
          Expert. Reliable. Fast repairs.
        </p>
        <div className="mt-5 text-base leading-tight">
          <p>Professional phone repair services you can trust.</p>
          <p>Quick turnaround, quality guaranteed.</p>
          <p>Get your device back to perfect condition.</p>
        </div>
      </div>
      <ServiceLinks services={services} />
    </aside>
  );
}
