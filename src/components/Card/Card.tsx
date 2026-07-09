import Carousel from "../Carousel/Carousel";
import type { CarouselImage } from "../../types";
import type { CSSProperties } from "react";
import "./Card.css";

type CardGlowStyle = CSSProperties & Record<`--${string}`, string>

interface CardProps {
  planName: string;
  title: string;
  description: string;
  tags: string[];
  learnMoreUrl: string;
  images: CarouselImage[];
  variant?: "plans-glow";
}

function Card({
  title,
  description,
  tags,
  learnMoreUrl,
  images,
  variant,
}: CardProps) {
  const className = variant ? `card card--${variant}` : "card";
  const style =
    variant === "plans-glow"
      ? getPlansGlowStyle(title)
      : undefined;

  return (
    <article className={className} style={style}>
      <div className="card__media">
        <Carousel images={images} label={title} />
      </div>

      <div className="card__header">
        <h2 className="card__title">{title}</h2>
        <span className="card__rule" aria-hidden="true" />
        <a className="card__cta" href={learnMoreUrl}>
          Learn More
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 17 L17 7 M9 7 H17 V15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <p className="card__description">{description}</p>

      <ul className="card__tags">
        {tags.map((tag) => (
          <li key={tag} className="card__tag">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

function getPlansGlowStyle(seed: string): CardGlowStyle {
  const hash = Array.from(seed).reduce(
    (acc, char, index) => acc + char.charCodeAt(0) * (index + 17),
    0,
  );

  const warmX = 68 + (hash % 20);
  const warmY = 70 + ((hash >> 1) % 20);
  const highlightX = 10 + ((hash >> 2) % 18);
  const highlightY = 6 + ((hash >> 3) % 14);
  const accentX = 18 + ((hash >> 4) % 46);
  const accentY = 10 + ((hash >> 5) % 42);
  const glowSize = 22 + ((hash >> 6) % 12);
  const accentSize = 34 + ((hash >> 7) % 14);
  const glowOpacity = (0.34 + ((hash % 7) * 0.03)).toFixed(2);
  const accentOpacity = (0.2 + (((hash >> 1) % 7) * 0.02)).toFixed(3);

  return {
    ["--card-glow-x" as const]: `${warmX}%`,
    ["--card-glow-y" as const]: `${warmY}%`,
    ["--card-highlight-x" as const]: `${highlightX}%`,
    ["--card-highlight-y" as const]: `${highlightY}%`,
    ["--card-accent-x" as const]: `${accentX}%`,
    ["--card-accent-y" as const]: `${accentY}%`,
    ["--card-glow-size" as const]: `${glowSize}%`,
    ["--card-accent-size" as const]: `${accentSize}%`,
    ["--card-glow-opacity" as const]: glowOpacity,
    ["--card-accent-opacity" as const]: accentOpacity,
  }
}

export default Card;
