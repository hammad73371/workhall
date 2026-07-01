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
  IconProps & { variant: "spark" | "diamond" | "orbit" | "anthropic" | "atom" }
> = ({ className, variant }) => {
  switch (variant) {
    case "spark":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3l1.6 5.9L19.5 12l-5.9 1.6L12 21l-1.6-7.4L4.5 12l5.9-3.1z"
            fill="currentColor"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4l4 4-4 12-4-12z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 8h8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "orbit":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="9"
            stroke="currentColor"
            strokeWidth="1.4"
            transform="rotate(30 12 12)"
          />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
    case "anthropic":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8.2 6h2.4l5.2 12h-2.4l-1.1-2.7H9.2L8.1 18H5.7zm.9 7.3h2.7L10.4 9z"
            fill="currentColor"
          />
        </svg>
      );
    case "atom":
    default:
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.4"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.4"
            stroke="currentColor"
            strokeWidth="1.3"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.4"
            stroke="currentColor"
            strokeWidth="1.3"
            transform="rotate(120 12 12)"
          />
        </svg>
      );
  }
};
