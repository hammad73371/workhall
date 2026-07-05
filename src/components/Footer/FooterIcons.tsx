import React from "react";

type IconProps = { className?: string };

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z"
      fill="currentColor"
    />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="2.5"
      y="2.5"
      width="19"
      height="19"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="2.5"
      y="2.5"
      width="19"
      height="19"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M7.5 10v7M7.5 7.2v.01M11.5 17v-4c0-1.5 1-2.5 2.3-2.5 1.3 0 2.2 1 2.2 2.5v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const AppleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M16.4 12.9c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.3-.9-2.3-3.1z"
      fill="currentColor"
    />
    <path
      d="M14.1 6.4c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.5 2.4-1.2z"
      fill="currentColor"
    />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10.2 8.6l5.6 3.4-5.6 3.4z" fill="currentColor" />
  </svg>
);

export const AiGlyph: React.FC<
  IconProps & {
    variant: "openai" | "gemini" | "perplexity" | "claude" | "grok";
  }
> = ({ className, variant }) => {
  switch (variant) {
    case "openai":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4.6c1.6-1 3.8-.6 4.9 1 1.1 1.6.9 3.7-.5 5.1 1.8.2 3.3 1.7 3.4 3.6.1 1.9-1.1 3.6-2.9 4.1-.2 1.8-1.8 3.2-3.7 3.2-1.9 0-3.5-1.4-3.7-3.2-1.8-.5-3-2.2-2.9-4.1.1-1.9 1.6-3.4 3.4-3.6-1.4-1.4-1.6-3.5-.5-5.1 1.1-1.6 3.3-2 4.9-1z"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          <path
            d="M12 4.6v4.1m3.9 2.2-3.5 2m-4.3 2.4-3.5 2m0-8.8 3.5 2m4.3 2.4 3.5 2"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinecap="round"
          />
        </svg>
      );
    case "gemini":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 2.8c1 4.7 1.9 5.6 6.2 6.4-4.3.8-5.2 1.7-6.2 6.4-1-4.7-1.9-5.6-6.2-6.4 4.3-.8 5.2-1.7 6.2-6.4z"
            fill="currentColor"
          />
        </svg>
      );
    case "perplexity":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 5.5h8M8 18.5h8M5.5 8v8M18.5 8v8M8 8l8 8M16 8l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "claude":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7.6 18 11.8 6h1.9L18 18h-2.5l-.9-2.6h-3.8L10 18zm3.8-4.6h2.5L12.6 9z"
            fill="currentColor"
          />
        </svg>
      );
    case "grok":
    default:
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 6.5h10L7 17.5h10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};
