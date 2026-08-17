import type { LocationPageContent } from "../types/site";
import { workHallLocations } from "./siteContent";

const branchById = Object.fromEntries(
  workHallLocations.map((location) => [location.id, location]),
);

const sharedWorkspaces = [
  {
    title: "Flexible desks",
    description:
      "A ready-to-work seat with the shared infrastructure already handled.",
    bestFor: "Independent professionals and hybrid workdays",
  },
  {
    title: "Private offices",
    description:
      "A focused room for teams that want privacy without running an office.",
    bestFor: "Growing teams and client-facing businesses",
  },
  {
    title: "Meeting rooms",
    description:
      "Professional rooms for reviews, interviews, workshops, and presentations.",
    bestFor: "Pitches, planning sessions, and private calls",
  },
];

const sharedAmenities = [
  "High-speed internet",
  "Power backup",
  "Meeting room access",
  "Community spaces",
  "Tea and coffee",
  "On-site support",
  "Printing facilities",
  "Business address options",
];

const imageSet = {
  desks: "/cowork.jpg",
  lounge: "/whyworkhall.png",
  meeting: "/cowork.jpg",
  studio: "/whyworkhall.png",
  team: "/cowork.jpg",
};

const gallery = (hero: string, second: string, third: string) => [
  { src: hero, alt: "Bright shared workspace at WorkHall", position: "44% center" },
  { src: second, alt: "Comfortable WorkHall meeting and lounge area", position: "72% center" },
  { src: third, alt: "Modern desks prepared for a productive workday", position: "18% center" },
];

const tipuGallery = (hero: string, second: string, third: string) => [
  ...gallery(hero, second, third),
  { src: hero, alt: "Shared workspace details at WorkHall", position: "78% center" },
  { src: second, alt: "A productive corner at WorkHall", position: "28% center" },
  { src: third, alt: "WorkHall workspace interior", position: "84% center" },
  { src: hero, alt: "Flexible work areas at WorkHall", position: "22% center" },
  { src: second, alt: "WorkHall space designed for teams", position: "54% center" },
];

export const locationPages: LocationPageContent[] = [
  {
    ...branchById["shahrah-e-faisal"],
    eyebrow: "Central business corridor",
    headline: "A serious work address, without the corporate drag.",
    introduction:
      "Set along Karachi's best-known commercial artery, this WorkHall is built for teams that need a connected base, a polished client experience, and room to keep moving.",
    businessFocus:
      "A practical fit for consultancies, technology teams, regional operations, and businesses whose week includes frequent client meetings.",
    branchNote: "Central, connected, and designed for business momentum.",
    accent: "#d26d45",
    secondaryAccent: "#dab154",
    heroImage: imageSet.team,
    heroImagePosition: "center 48%",
    gallery: gallery(imageSet.team, imageSet.meeting, imageSet.desks),
    highlights: [
      { value: "Central", label: "Karachi business access" },
      { value: "Flexible", label: "Desk-to-office options" },
      { value: "Ready", label: "Managed daily operations" },
    ],
    workspaces: sharedWorkspaces,
    amenities: sharedAmenities,
    accessNotes: [
      "Positioned on the Shahrah-e-Faisal business corridor.",
      "A convenient meeting point for teams moving across central Karachi.",
      "Use the live Google Maps link for the most accurate arrival route.",
    ],
  },
  {
    ...branchById.zamzama,
    eyebrow: "DHA's neighbourhood work club",
    headline: "Do your best work, closer to the life around it.",
    introduction:
      "WorkHall Zamzama brings a calmer, more personal rhythm to the workday—professional enough for clients, comfortable enough to become your everyday base.",
    businessFocus:
      "Well suited to founders, creative teams, independent consultants, and businesses that want a premium DHA presence without a conventional office lease.",
    branchNote: "Neighbourhood energy with a polished business edge.",
    accent: "#458e71",
    secondaryAccent: "#d26d45",
    heroImage: imageSet.lounge,
    heroImagePosition: "center 52%",
    gallery: gallery(imageSet.lounge, imageSet.studio, imageSet.meeting),
    highlights: [
      { value: "DHA", label: "Zamzama setting" },
      { value: "Social", label: "Easy team-day rhythm" },
      { value: "Polished", label: "Client-ready spaces" },
    ],
    workspaces: sharedWorkspaces,
    amenities: sharedAmenities,
    accessNotes: [
      "Located in Zamzama, DHA Phase 5.",
      "A natural base for members working across DHA and Clifton.",
      "Open the map before travelling for the latest route guidance.",
    ],
  },
  {
    ...branchById["tipu-sultan"],
    eyebrow: "A connected east-central base",
    headline: "A focused workspace in the middle of your week.",
    introduction:
      "The Tipu Sultan branch is designed for productive days with fewer detours: easy to settle into, simple to meet at, and flexible as teams change shape.",
    businessFocus:
      "Work Hall Tipu Sultan is located on the main Tipu Sultan Road, right after the traffic light adjacent to Springs Super Market. It is a 2-minute commute to and from Shahrah-e-Faisal. Work Hall Tipu Sultan is also accessible off Shaheed-e-Millat Road, turning towards Bangalore Town.",
    branchDetail:
      "Work Hall Tipu Sultan is built on a gorgeous ground-plus-one structure with several private offices and common areas for your office.",
    branchNote: "A balanced base for focus, meetings, and team days.",
    accent: "#DA7B49",
    secondaryAccent: "#DA7B49",
    heroImage: imageSet.desks,
    heroImagePosition: "center 46%",
    gallery: tipuGallery(imageSet.desks, imageSet.team, imageSet.lounge),
    highlights: [
      { value: "Connected", label: "Cross-city convenience" },
      { value: "Focused", label: "Productive work zones" },
      { value: "Adaptable", label: "Space as teams evolve" },
    ],
    workspaces: sharedWorkspaces,
    amenities: sharedAmenities,
    accessNotes: [
      "Set along the Tipu Sultan Road area.",
      "Useful for teams balancing central and eastern Karachi schedules.",
      "Follow the branch's Google Maps link for live directions.",
    ],
  },
  {
    ...branchById.pechs,
    eyebrow: "A neighbourhood built for business",
    headline: "Close to the city. Clear of the usual office friction.",
    introduction:
      "WorkHall PECHS gives small teams and independent businesses a professional home in one of Karachi's most established and accessible neighbourhoods.",
    businessFocus:
      "Designed for professional services, startups, remote teams, and growing businesses that value a central address and a straightforward commute.",
    branchNote: "An accessible professional base with neighbourhood ease.",
    accent: "#8c8464",
    secondaryAccent: "#d26d45",
    heroImage: imageSet.meeting,
    heroImagePosition: "center 50%",
    gallery: gallery(imageSet.meeting, imageSet.desks, imageSet.studio),
    highlights: [
      { value: "Central", label: "Established neighbourhood" },
      { value: "Practical", label: "Simple daily setup" },
      { value: "Professional", label: "Confident client meetings" },
    ],
    workspaces: sharedWorkspaces,
    amenities: sharedAmenities,
    accessNotes: [
      "Based in the PECHS area of Karachi.",
      "A practical hub for central-city meetings and everyday work.",
      "Check Google Maps for the latest approach and travel time.",
    ],
  },
  {
    ...branchById.gulshan,
    eyebrow: "East Karachi's flexible work base",
    headline: "More room for east-side teams to grow well.",
    introduction:
      "WorkHall Gulshan makes flexible work easier for businesses based in the east of Karachi, with managed spaces for individual focus, team momentum, and professional meetings.",
    businessFocus:
      "A natural fit for education, technology, commerce, and service teams that want to work closer to Gulshan-e-Iqbal and the city's eastern districts.",
    branchNote: "Local convenience, complete workspace support.",
    accent: "#5d7355",
    secondaryAccent: "#dab154",
    heroImage: imageSet.studio,
    heroImagePosition: "center 48%",
    gallery: gallery(imageSet.studio, imageSet.lounge, imageSet.team),
    highlights: [
      { value: "East-side", label: "Closer to your team" },
      { value: "Complete", label: "Managed work essentials" },
      { value: "Scalable", label: "From solo to team" },
    ],
    workspaces: sharedWorkspaces,
    amenities: sharedAmenities,
    accessNotes: [
      "Located in the Gulshan-e-Iqbal area.",
      "A closer flexible-work option for east Karachi teams.",
      "Use Google Maps to plan the most current route to the branch.",
    ],
  },
];

export const getLocationPage = (slug: string) =>
  locationPages.find((location) => location.id === slug);
