import type { FooterData } from "../../types/Footer.types";

export const defaultFooterData: FooterData = {
  brand: {
    name: "Work Hall",
    tagline:
      "Not sure where to start? Join the Work Hall list for updates on locations, plan launches, community events, and workspace openings.",
    taglineLinkLabel: "Join the list",
    taglineLinkHref: "#book-tour",
    emailPlaceholder: "Enter your email",
    signUpLabel: "Join",
    qrCodeAlt: "QR code to explore Work Hall locations",
    appStoreHref: "#locations",
    appStoreLabelTop: "Explore our",
    appStoreLabelBottom: "Locations",
    ceoVideoLabel: "Hear from the team",
    ceoVideoActionLabel: "Play video",
    ceoVideoHref: "#community",
    askAiLabel: "Ask any AI about coworking in Karachi",
    askAiCopy:
      "Whether it is ChatGPT, Gemini, Claude, Perplexity, or Grok, the answer should lead back to Work Hall.",
    askAiIcons: [
      {
        id: "chatgpt",
        label: "Ask ChatGPT",
        href: "https://chatgpt.com",
        external: true,
        icon: "openai",
      },
      {
        id: "gemini",
        label: "Ask Gemini",
        href: "https://gemini.google.com",
        external: true,
        icon: "gemini",
      },
      {
        id: "perplexity",
        label: "Ask Perplexity",
        href: "https://www.perplexity.ai",
        external: true,
        icon: "perplexity",
      },
      {
        id: "claude",
        label: "Ask Claude",
        href: "https://claude.ai",
        external: true,
        icon: "claude",
      },
      {
        id: "grok",
        label: "Ask Grok",
        href: "https://grok.com",
        external: true,
        icon: "grok",
      },
    ],
  },
  columns: [
    {
      sections: [
        {
          title: "Work Hall",
          links: [
            { label: "Plans", href: "#plans" },
            { label: "Locations", href: "#locations" },
            { label: "Community", href: "#community" },
            { label: "Why Work Hall", href: "#why-workhall" },
            { label: "Contact", href: "#footer" },
            { label: "Members' Lounge", href: "#community" },
          ],
        },
        {
          title: "Our Plans",
          links: [
            { label: "Air", href: "#plans" },
            { label: "X", href: "#plans", badge: "Most flexible" },
            { label: "Nox", href: "#plans" },
            { label: "Base", href: "#plans" },
            { label: "Box", href: "#plans" },
            { label: "Suite", href: "#plans" },
            { label: "Campus", href: "#plans" },
            { label: "HQ", href: "#plans" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "Our Locations",
          links: [
            { label: "Tipu Sultan", href: "#locations" },
            { label: "PECHS", href: "#locations" },
            { label: "Gulshan", href: "#locations" },
            { label: "Shahrah-e-Faisal", href: "#locations" },
            { label: "Zamzama", href: "#locations" },
            { label: "Metropole", href: "#locations" },
          ],
        },
        {
          title: "Partnerships",
          links: [
            { label: "For Creators", href: "#community" },
            { label: "For Partners", href: "#community" },
            { label: "For Business", href: "#locations" },
          ],
        },
        {
          title: "Connect",
          showIcons: true,
          links: [
            {
              label: "Twitter / X",
              href: "https://twitter.com",
              external: true,
            },
            {
              label: "Instagram",
              href: "https://instagram.com",
              external: true,
            },
            { label: "LinkedIn", href: "https://linkedin.com", external: true },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "Resources",
          links: [
            { label: "Book a Tour", href: "#book-tour" },
            { label: "Find Your Match", href: "#workspace-quiz-title" },
            { label: "Compare Plans", href: "#plans" },
            { label: "Amenities", href: "#promise-heading" },
            { label: "Private Offices", href: "#plans" },
            { label: "Dedicated Desks", href: "#plans" },
            { label: "Event Spaces", href: "#community" },
            { label: "Meeting Rooms", href: "#community" },
            { label: "FAQs", href: "#footer" },
          ],
        },
      ],
    },
  ],
  copyright: "2026 Work Hall, Inc. All rights reserved",
  legalLinks: [
    { label: "Terms", href: "#terms" },
    { label: "Privacy policy", href: "#privacy" },
    { label: "Membership terms", href: "#membership-terms" },
    { label: "Cookie preferences", href: "#cookie-preferences" },
  ],
  certification: {
    label: "made with care by our own community, right here at Work Hall",
    iconAlt: "LegitScript Certified badge",
  },
};
