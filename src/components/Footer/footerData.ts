import type { FooterData } from "../../types/Footer.types";

export const defaultFooterData: FooterData = {
  brand: {
    name: "Work Hall",
    tagline:
      "Not sure where to start? Sign up to receive the Superpower Code: a free guide to understanding your health and the systems that matter most.",
    taglineLinkLabel: "Sign up",
    taglineLinkHref: "#signup",
    emailPlaceholder: "Your email",
    signUpLabel: "Sign up",
    qrCodeAlt: "QR code to download the Superpower app",
    appStoreHref: "#app-store",
    appStoreLabelTop: "Download on the",
    appStoreLabelBottom: "App Store",
    ceoVideoLabel: "Hear from our CEO",
    ceoVideoActionLabel: "Play video",
    ceoVideoHref: "#ceo-video",
    askAiLabel: "Ask AI about Superpower",
    askAiIcons: [
      { id: "chatgpt", label: "Ask ChatGPT", icon: "spark" },
      { id: "gemini", label: "Ask Gemini", icon: "diamond" },
      { id: "perplexity", label: "Ask Perplexity", icon: "orbit" },
      { id: "claude", label: "Ask Claude", icon: "anthropic" },
      { id: "grok", label: "Ask Grok", icon: "atom" },
    ],
  },
  columns: [
    {
      sections: [
        {
          title: "Work Hall",
          links: [
            { label: "Plans", href: "#how-it-works" },
            { label: "Locations", href: "#what-we-test" },
            { label: "Community", href: "#login" },
            { label: "Why Work Hall", href: "#gift" },
            { label: "Contact", href: "#reviews" },
            { label: "Member,s Lounge ", href: "#reviews" },
          ],
        },
        {
          title: "Our Plans",
          links: [
            { label: "Air", href: "#our-why" },
            { label: "X", href: "#careers", badge: "We're hiring" },
            { label: "Nox", href: "#labs" },
            { label: "Base", href: "#contact" },
            { label: "Box", href: "#blog" },
            { label: "Suite", href: "#faqs" },
            { label: "Campus", href: "#faqs" },
            { label: "Hq", href: "#faqs" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "Our Locations",
          links: [
            { label: "Tipu Sultan", href: "#compare-function-health" },
            { label: "Pechs", href: "#compare-mito-health" },
            { label: "Gulshan", href: "#compare-insidetracker" },
            { label: "Shahrah-e-Faisal", href: "#compare-insidetracker" },
            { label: "ZamZarna", href: "#compare-insidetracker" },
            { label: "MetraPole", href: "#compare-insidetracker" },
          ],
        },
        {
          title: "Partnerships",
          links: [
            { label: "For Creators", href: "#for-creators" },
            { label: "For Partners", href: "#for-partners" },
            { label: "For Business", href: "#for-business" },
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
          title: "Clinical & Research",
          links: [
            { label: "The Complete Guide to...", href: "#complete-guide" },
            { label: "Immune System Biomarker", href: "#immune-biomarker" },
            { label: "Energy Biomarkers", href: "#energy-biomarkers" },
            { label: "Liver Health Biomarkers", href: "#liver-biomarkers" },
            {
              label: "Body Composition Biomarkers",
              href: "#body-comp-biomarkers",
            },
            { label: "DNA Biomarkers", href: "#dna-biomarkers" },
            { label: "Thyroid Biomarkers", href: "#thyroid-biomarkers" },
            {
              label: "Metabolic Biomarker Testing",
              href: "#metabolic-biomarkers",
            },
            { label: "5 Biomarkers Everyone Should...", href: "#5-biomarkers" },
          ],
        },
      ],
    },
  ],
  copyright: "2026 Work Hall, Inc. All rights reserved",
  legalLinks: [
    { label: "Terms", href: "#terms" },
    { label: "Privacy policy", href: "#privacy" },
    { label: "Medical consent", href: "#medical-consent" },
    { label: "Cookie preferences", href: "#cookie-preferences" },
  ],
  certification: {
    label: "made with care by out own community-right here at Work Hall",
    iconAlt: "LegitScript Certified badge",
  },
};
