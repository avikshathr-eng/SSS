/**
 * Single source of truth for anything the owner still has to supply.
 * Empty strings are intentional: the UI shows a clearly marked placeholder
 * until a real value is entered here. Nothing below is invented.
 */
export const site = {
  name: "Structure and Sky Studios",
  short: "SSS",
  // TODO(owner): real values. Leave empty until known.
  email: "",
  phone: "",
  bookingUrl: "", // e.g. a Calendly / Cal.com link
  domain: "",
  social: { linkedin: "", instagram: "", youtube: "" },
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "Technology" },
];

export const audiences = [
  { value: "developer", label: "Developer" },
  { value: "architect", label: "Architecture firm" },
  { value: "interior", label: "Interior designer" },
  { value: "broker", label: "Broker or listing team" },
  { value: "builder", label: "Custom home builder" },
  { value: "owner", label: "Homeowner or property seller" },
];

export const deliverables = [
  "Exterior stills",
  "Interior stills",
  "3D walkthrough animation",
  "Drone photo and video",
  "Sales film",
  "Interactive tour",
  "Virtual staging",
  "3D floor plan",
];
