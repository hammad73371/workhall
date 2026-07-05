export interface TestimonialSlide {
  id: string;
  kicker: string;
  heading: string;
  statValue: string;
  statCaption: string;
  quote: string;
  resultTags: [string, string];
  authorName: string;
  authorRole: string;
  authorCompany: string;
  heroPoster: string;
  heroAlt: string;
  heroVideoSrc: string;
  secondaryImage: string;
  secondaryAlt: string;
  trendLabel: string;
  trendValue: string;
  trendStart: string;
  trendEnd: string;
  trendPoints: Array<[number, number]>;
}

export const testimonialSlides: TestimonialSlide[] = [
  {
    id: "founder-focus",
    kicker: "TESTIMONIALS",
    heading: "Their words, not ours",
    statValue: "145%",
    statCaption: "increase in weekly team output",
    quote:
      "\"The whole journey has been a complete shift for our team. We feel sharper, calmer, and much more consistent in how we show up every day.\"",
    resultTags: ["Fewer distractions", "Always open"],
    authorName: "Stephen Khan",
    authorRole: "Founder",
    authorCompany: "Monday Theory",
    heroPoster:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Founder walking through a bright workspace hallway",
    heroVideoSrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    secondaryImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Founder speaking in front of a workspace waterfront backdrop",
    trendLabel: "focused work hours recovered",
    trendValue: "21.3 hrs/wk",
    trendStart: "MONTH 1",
    trendEnd: "MONTH 5",
    trendPoints: [
      [8, 82],
      [28, 64],
      [54, 46],
      [78, 42],
      [92, 36],
    ],
  },
  {
    id: "agency-ops",
    kicker: "TESTIMONIALS",
    heading: "Their words, not ours",
    statValue: "42%",
    statCaption: "less time lost to office logistics",
    quote:
      "\"We stopped burning energy on setup, lockups, and coordination. The space just works, and that gave us room to focus on actual client work again.\"",
    resultTags: ["Reliable parking", "Dedicated desks"],
    authorName: "Ayesha Tariq",
    authorRole: "Operations Lead",
    authorCompany: "Northstar Studio",
    heroPoster:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Agency team collaborating across a long meeting table",
    heroVideoSrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    secondaryImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Team lead in a glass meeting room",
    trendLabel: "operations time given back",
    trendValue: "12.4 hrs/mo",
    trendStart: "MONTH 1",
    trendEnd: "MONTH 5",
    trendPoints: [
      [8, 76],
      [28, 70],
      [54, 55],
      [78, 38],
      [92, 31],
    ],
  },
  {
    id: "startup-crew",
    kicker: "TESTIMONIALS",
    heading: "Their words, not ours",
    statValue: "91%",
    statCaption: "of our week now happens in one reliable workspace",
    quote:
      "\"The biggest win is consistency. Everybody knows where to meet, where to work, and how to keep moving even when schedules get weird.\"",
    resultTags: ["Custom layout", "Shared spaces"],
    authorName: "Hamza Ali",
    authorRole: "Co-founder",
    authorCompany: "Signal Loop",
    heroPoster:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Startup team using a bright open workspace",
    heroVideoSrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    secondaryImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    secondaryAlt: "Founder portrait seated inside a warm office lounge",
    trendLabel: "team consistency across the week",
    trendValue: "91%",
    trendStart: "WEEK 1",
    trendEnd: "WEEK 8",
    trendPoints: [
      [8, 84],
      [28, 72],
      [54, 58],
      [78, 28],
      [92, 24],
    ],
  },
];
