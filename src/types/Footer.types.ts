export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
  showIcons?: boolean;
}

export interface FooterColumn {
  sections: FooterSection[];
}

export interface AskAiIcon {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  icon: "openai" | "gemini" | "perplexity" | "claude" | "grok";
}

export interface FooterBrand {
  name: string;
  tagline: string;
  taglineLinkLabel: string;
  taglineLinkHref: string;
  emailPlaceholder: string;
  signUpLabel: string;
  qrCodeAlt: string;
  qrCodeSrc?: string;
  appStoreHref: string;
  appStoreLabelTop: string;
  appStoreLabelBottom: string;
  ceoVideoLabel: string;
  ceoVideoActionLabel: string;
  ceoVideoHref: string;
  askAiLabel: string;
  askAiCopy: string;
  askAiIcons: AskAiIcon[];
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterCertification {
  label: string;
  iconAlt: string;
  iconSrc?: string;
}

export interface FooterData {
  brand: FooterBrand;
  columns: FooterColumn[];
  copyright: string;
  legalLinks: FooterLegalLink[];
  certification: FooterCertification;
}
