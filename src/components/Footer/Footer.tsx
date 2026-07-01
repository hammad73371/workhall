import React, { useState, type FormEvent } from "react";
import type { FooterData } from "../../types/Footer.types";
import { defaultFooterData } from "./footerData";
import {
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  AppleIcon,
  PlayIcon,
  AiGlyph,
} from "./FooterIcons";
import "./Footer.css";

export interface FooterProps {
  data?: FooterData;
  onSubscribe?: (email: string) => void;
}

const socialIconFor = (label: string): React.ReactNode => {
  const key = label.toLowerCase();
  if (key.includes("twitter") || key.includes("x"))
    return <TwitterIcon className="footer-social-icon" />;
  if (key.includes("instagram"))
    return <InstagramIcon className="footer-social-icon" />;
  if (key.includes("linkedin"))
    return <LinkedInIcon className="footer-social-icon" />;
  return null;
};

export const Footer: React.FC<FooterProps> = ({
  data = defaultFooterData,
  onSubscribe,
}) => {
  const { brand, columns, copyright, legalLinks, certification } = data;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe?.(email.trim());
    setEmail("");
  };

  return (
    <footer className="sp-footer">
      <div className="sp-footer-top">
        <div className="sp-footer-brand">
          <p className="sp-footer-logo">{brand.name}</p>

          <p className="sp-footer-tagline">
            <span className="sp-footer-tagline-question">
              Not sure where to start?
            </span>{" "}
            <a href={brand.taglineLinkHref} className="sp-footer-tagline-link">
              {brand.taglineLinkLabel}
            </a>{" "}
            to receive the Superpower Code: a free guide to understanding your
            health and the systems that matter most.
          </p>

          <form className="sp-footer-form" onSubmit={handleSubmit}>
            <label className="sp-visually-hidden" htmlFor="sp-footer-email">
              {brand.emailPlaceholder}
            </label>
            <input
              id="sp-footer-email"
              type="email"
              className="sp-footer-input"
              placeholder={brand.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="sp-footer-signup-btn">
              {brand.signUpLabel}
            </button>
          </form>

          <div className="sp-footer-app-row">
            <div
              className="sp-footer-qr"
              role="img"
              aria-label={brand.qrCodeAlt}
            >
              {brand.qrCodeSrc ? (
                <img src={brand.qrCodeSrc} alt={brand.qrCodeAlt} />
              ) : (
                <QrPlaceholder />
              )}
              <a href={brand.appStoreHref} className="sp-footer-appstore">
                <AppleIcon className="sp-footer-appstore-icon" />
                <span>
                  <span className="sp-footer-appstore-top">
                    {brand.appStoreLabelTop}
                  </span>
                  <span className="sp-footer-appstore-bottom">
                    {brand.appStoreLabelBottom}
                  </span>
                </span>
              </a>
            </div>

            <a href={brand.ceoVideoHref} className="sp-footer-ceo">
              <span className="sp-footer-ceo-label">{brand.ceoVideoLabel}</span>
              <span className="sp-footer-ceo-action">
                <PlayIcon className="sp-footer-ceo-play" />
                {brand.ceoVideoActionLabel}
              </span>
            </a>
          </div>

          <div className="sp-footer-ai">
            <p className="sp-footer-ai-label">{brand.askAiLabel}</p>
            <div className="sp-footer-ai-icons">
              {brand.askAiIcons.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  className="sp-footer-ai-icon"
                  aria-label={icon.label}
                >
                  <AiGlyph variant={icon.icon} className="sp-footer-ai-glyph" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <nav className="sp-footer-columns" aria-label="Footer navigation">
          {columns.map((column, colIdx) => (
            <div className="sp-footer-column" key={colIdx}>
              {column.sections.map((section) => (
                <div className="sp-footer-section" key={section.title}>
                  <p className="sp-footer-section-title">{section.title}</p>
                  <ul className="sp-footer-links">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="sp-footer-link"
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                        >
                          {section.showIcons && socialIconFor(link.label)}
                          <span>{link.label}</span>
                          {link.badge && (
                            <span className="sp-footer-badge">
                              {link.badge}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="sp-footer-bottom">
        <p className="sp-footer-copyright">{copyright}</p>
        <ul className="sp-footer-legal">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="sp-footer-certification">
          <span>{certification.label}</span>
          {certification.iconSrc ? (
            <img
              src={certification.iconSrc}
              alt={certification.iconAlt}
              className="sp-footer-cert-badge"
            />
          ) : (
            <CertBadgePlaceholder label={certification.iconAlt} />
          )}
        </div>
      </div>
    </footer>
  );
};

const QrPlaceholder: React.FC = () => (
  <svg viewBox="0 0 29 29" className="sp-footer-qr-svg" aria-hidden="true">
    <rect width="29" height="29" fill="var(--sp-white)" />
    {Array.from({ length: 29 * 29 }).map((_, i) => {
      const x = i % 29;
      const y = Math.floor(i / 29);
      const inFinder =
        (x < 7 && y < 7) || (x > 21 && y < 7) || (x < 7 && y > 21);
      const on = inFinder
        ? (x === 0 ||
            x === 6 ||
            y === 0 ||
            y === 6 ||
            (x > 1 && x < 5 && y > 1 && y < 5)) &&
          !(x < 21 && x > 7 && false)
        : (x * 7 + y * 13 + x * y) % 5 === 0;
      return on ? (
        <rect key={i} x={x} y={y} width="1" height="1" fill="var(--sp-black)" />
      ) : null;
    })}
  </svg>
);

const CertBadgePlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <svg
    viewBox="0 0 40 40"
    className="sp-footer-cert-badge"
    role="img"
    aria-label={label}
  >
    <path
      d="M20 2l16 8v10c0 10-7 16-16 18C11 36 4 30 4 20V10z"
      fill="var(--sp-gray-100)"
      stroke="var(--sp-gray-300)"
      strokeWidth="1"
    />
    <path
      d="M13 20l5 5 9-10"
      stroke="var(--sp-gray-500)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Footer;
