import type { MembershipCard } from "../types";

/**
 * Single source of truth for every membership card on the page.
 * The <Card> component is purely presentational, so changing copy,
 * imagery, tags, or order only ever requires editing this array.
 */
export const membershipCards: MembershipCard[] = [
  {
    id: "air",
    title: "Air",
    description:
      "Pick a desk, plug in, get to work. No strings, no commitment. Maybe a different spot every once in a while, but just a great place to spend your day.",
    tags: ["Freelancers", "Consultants", "Students", "Remote Employees"],
    learnMoreUrl: "#air",
    panelTheme: "stone",
    images: [
      { src: "https://picsum.photos/seed/air-1/900/700", alt: "Open desks near a sunlit window" },
      { src: "https://picsum.photos/seed/air-2/900/700", alt: "Shared workspace with bench seating" },
      { src: "https://picsum.photos/seed/air-3/900/700", alt: "Coffee bar in the lounge area" },
      { src: "https://picsum.photos/seed/air-4/900/700", alt: "Member working on a laptop" },
      { src: "https://picsum.photos/seed/air-5/900/700", alt: "Quiet corner with plants" },
    ],
  },
  {
    id: "xpand",
    title: "Xpand",
    description:
      "A dedicated desk that grows with you. Keep your setup exactly as you left it, then add seats the moment your team does.",
    tags: ["Small Teams", "Startups", "Agencies", "Project Pods"],
    learnMoreUrl: "#xpand",
    panelTheme: "cream",
    images: [
      { src: "https://picsum.photos/seed/xpand-1/900/700", alt: "Row of dedicated desks" },
      { src: "https://picsum.photos/seed/xpand-2/900/700", alt: "Small team huddled around a desk" },
      { src: "https://picsum.photos/seed/xpand-3/900/700", alt: "Personalised desk setup with monitor" },
      { src: "https://picsum.photos/seed/xpand-4/900/700", alt: "Whiteboard wall with sticky notes" },
      { src: "https://picsum.photos/seed/xpand-5/900/700", alt: "Lockers along a hallway" },
    ],
  },
  {
    id: "studio",
    title: "Studio",
    description:
      "A private room behind a door that actually closes. Calls, focus work, and the occasional nap, all without an audience.",
    tags: ["Founders", "Therapists", "Podcasters", "Designers"],
    learnMoreUrl: "#studio",
    panelTheme: "stone",
    images: [
      { src: "https://picsum.photos/seed/studio-1/900/700", alt: "Small private studio room" },
      { src: "https://picsum.photos/seed/studio-2/900/700", alt: "Soundproofed call booth" },
      { src: "https://picsum.photos/seed/studio-3/900/700", alt: "Designer reviewing prints on a wall" },
      { src: "https://picsum.photos/seed/studio-4/900/700", alt: "Daybed in a private studio" },
      { src: "https://picsum.photos/seed/studio-5/900/700", alt: "Studio door with a frosted glass panel" },
    ],
  },
  {
    id: "suite",
    title: "Suite",
    description:
      "A full floor-plate office with your name on the door. We handle the lease, the furniture, and the Wi-Fi; you handle the company.",
    tags: ["Scaleups", "Regional HQs", "Law Firms", "Finance Teams"],
    learnMoreUrl: "#suite",
    panelTheme: "cream",
    images: [
      { src: "https://picsum.photos/seed/suite-1/900/700", alt: "Branded reception desk" },
      { src: "https://picsum.photos/seed/suite-2/900/700", alt: "Glass walled boardroom" },
      { src: "https://picsum.photos/seed/suite-3/900/700", alt: "Open floor office with skyline view" },
      { src: "https://picsum.photos/seed/suite-4/900/700", alt: "Private kitchen and breakout area" },
      { src: "https://picsum.photos/seed/suite-5/900/700", alt: "Executive office corner" },
    ],
  },
];
