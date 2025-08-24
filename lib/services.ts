export const ALL_SERVICES = [
  {
    id: "1",
    title: "Screen Replacement",
    description:
      "Professional screen repair for all smartphone models with genuine parts and warranty.",
    price: "From $89",
    duration: "30-60 mins",
    image: "/smartphone-screen-repair-technician-working.png",
    slug: "screen-replacement",
    category: "Hardware Repair",
    features: [
      "Genuine parts",
      "90-day warranty",
      "Same-day service",
      "All brands supported",
    ],
  },
  {
    id: "2",
    title: "Battery Replacement",
    description:
      "Restore your phone's battery life with high-quality replacement batteries.",
    price: "From $59",
    duration: "20-30 mins",
    image: "/phone-battery-replacement-service.png",
    slug: "battery-replacement",
    category: "Hardware Repair",
    features: [
      "High-capacity batteries",
      "Quick service",
      "Performance guarantee",
      "Eco-friendly disposal",
    ],
  },
  {
    id: "3",
    title: "Water Damage Repair",
    description:
      "Emergency water damage recovery with specialized drying and component repair.",
    price: "From $129",
    duration: "2-4 hours",
    image: "/water-damaged-phone-repair.png",
    slug: "water-damage",
    category: "Emergency Repair",
    features: [
      "24/7 emergency service",
      "Advanced drying techniques",
      "Component-level repair",
      "Data recovery included",
    ],
  },
  {
    id: "4",
    title: "Software Troubleshooting",
    description:
      "Fix software issues, remove viruses, and optimize your device performance.",
    price: "From $39",
    duration: "15-45 mins",
    image: "/phone-software-repair-diagnostic.png",
    slug: "software-repair",
    category: "Software Service",
    features: [
      "Virus removal",
      "Performance optimization",
      "OS updates",
      "Data backup",
    ],
  },
  {
    id: "5",
    title: "Camera Repair",
    description:
      "Professional camera lens and sensor repair for crystal clear photos.",
    price: "From $79",
    duration: "45-90 mins",
    image: "/smartphone-camera-lens-repair.png",
    slug: "camera-repair",
    category: "Hardware Repair",
    features: [
      "Lens replacement",
      "Sensor calibration",
      "Focus adjustment",
      "Quality testing",
    ],
  },
  {
    id: "6",
    title: "Charging Port Fix",
    description:
      "Repair loose or damaged charging ports to restore proper charging.",
    price: "From $69",
    duration: "30-45 mins",
    image: "/phone-charging-port-repair.png",
    slug: "charging-port",
    category: "Hardware Repair",
    features: [
      "Port replacement",
      "Cable testing",
      "Fast charging support",
      "Waterproof sealing",
    ],
  },
];

export const SERVICE_CATEGORIES = [
  { title: "All Services", slug: "all", count: ALL_SERVICES.length },
  {
    title: "Hardware Repair",
    slug: "hardware",
    count: ALL_SERVICES.filter((s) => s.category === "Hardware Repair").length,
  },
  {
    title: "Software Service",
    slug: "software",
    count: ALL_SERVICES.filter((s) => s.category === "Software Service").length,
  },
  {
    title: "Emergency Repair",
    slug: "emergency",
    count: ALL_SERVICES.filter((s) => s.category === "Emergency Repair").length,
  },
];

export const FOOTER_SERVICES = ALL_SERVICES.slice(0, 6).map((s) => ({
  title: s.title,
  slug: s.slug,
}));

export default ALL_SERVICES;

// Quick selection used by booking modal and other quick actions
export const QUICK_SERVICES = ALL_SERVICES.filter((s) =>
  ["screen-replacement", "battery-replacement", "water-damage"].includes(s.slug)
).map((s) => ({
  title: s.title,
  price: s.price,
  duration: s.duration,
  slug: s.slug,
  // mark popular/urgent based on slug
  popular: ["screen-replacement", "battery-replacement"].includes(s.slug),
  urgent: s.slug === "water-damage",
}));

// Helper maps and lookup functions
const SERVICE_MAP_BY_SLUG: Record<string, (typeof ALL_SERVICES)[0]> =
  ALL_SERVICES.reduce(
    (acc, s) => {
      acc[s.slug] = s;
      return acc;
    },
    {} as Record<string, (typeof ALL_SERVICES)[0]>
  );

export function getServiceBySlug(slug: string) {
  return SERVICE_MAP_BY_SLUG[slug];
}

export function getServiceByTitle(title: string) {
  return ALL_SERVICES.find((s) => s.title === title);
}
