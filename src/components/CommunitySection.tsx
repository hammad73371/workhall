import { useRef } from "react";
import adobeLogo from "../assets/community/adobe.svg";
import anthropicLogo from "../assets/community/anthropic.svg";
import dropboxLogo from "../assets/community/dropbox.svg";
import emberLogo from "../assets/community/ember.svg";
import figmaLogo from "../assets/community/figma.svg";
import githubLogo from "../assets/community/github.svg";
import metaLogo from "../assets/community/meta.svg";
import microsoftLogo from "../assets/community/microsoft.svg";
import notionLogo from "../assets/community/notion.svg";
import slackLogo from "../assets/community/slack.svg";
import spotifyLogo from "../assets/community/spotify.svg";
import RotatingText from "./RotatingText";
import "./RotatingText.css";
import "./CommunitySection.css";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

type CommunityTile =
  | {
      kind: "logo";
      badge: string;
      label: string;
      background: string;
      asset: string;
      logoScale?: string;
    }
  | {
      kind: "media";
      badge: string;
      label: string;
      image: string;
      objectPosition?: string;
    };

const tiles: CommunityTile[] = [
  {
    kind: "logo",
    badge: "Agencies",
    label: "GitHub",
    background: "#111111",
    asset: githubLogo,
    logoScale: "0.52",
  },
  {
    kind: "media",
    badge: "Founder Circle",
    label: "Founder conversation around a table",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Creative Ops",
    label: "Adobe",
    background: "#eb1000",
    asset: adobeLogo,
    logoScale: "0.56",
  },
  {
    kind: "media",
    badge: "After Hours",
    label: "Glass hallway and private office interiors",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Startup Tools",
    label: "Figma",
    background: "#111111",
    asset: figmaLogo,
    logoScale: "0.42",
  },
  {
    kind: "media",
    badge: "Client Meeting",
    label: "Operator presenting at a sticky-note wall",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "media",
    badge: "Team Review",
    label: "Shared table with laptops and conversation",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Music Teams",
    label: "Spotify",
    background: "#1ed760",
    asset: spotifyLogo,
    logoScale: "0.48",
  },
  {
    kind: "media",
    badge: "Presentations",
    label: "Evening event and conversation",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Workspace Stack",
    label: "Slack",
    background: "#f3eee5",
    asset: slackLogo,
    logoScale: "0.38",
  },
  {
    kind: "media",
    badge: "Operations",
    label: "Workspace desk flat-lay with laptops",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Knowledge Base",
    label: "Notion",
    background: "#f3eee5",
    asset: notionLogo,
    logoScale: "0.5",
  },
  {
    kind: "logo",
    badge: "Corporate Teams",
    label: "Microsoft",
    background: "#1270d9",
    asset: microsoftLogo,
    logoScale: "0.5",
  },
  {
    kind: "media",
    badge: "Boardroom",
    label: "Long hallway and polished office shell",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Shared Drives",
    label: "Dropbox",
    background: "#0d54ff",
    asset: dropboxLogo,
    logoScale: "0.46",
  },
  {
    kind: "media",
    badge: "Quiet Focus",
    label: "Lounge seating and soft daylight",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
  {
    kind: "logo",
    badge: "Product Teams",
    label: "Anthropic",
    background: "#111111",
    asset: anthropicLogo,
    logoScale: "0.58",
  },
  {
    kind: "media",
    badge: "Private Office",
    label: "Team around a desk in a studio-like office",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    objectPosition: "center center",
  },
] as const;

// const TOTAL_PAIRS = Math.ceil(tiles.length / 2);

const teaserTiles = [
  {
    label: "Ember",
    background: "#151515",
    asset: emberLogo,
    logoScale: "0.42",
  },
  { label: "Meta", background: "#f4f1ea", asset: metaLogo, logoScale: "0.52" },
  {
    label: "Dropbox",
    background: "#0d54ff",
    asset: dropboxLogo,
    logoScale: "0.44",
  },
  {
    label: "Spotify",
    background: "#1ed760",
    asset: spotifyLogo,
    logoScale: "0.44",
  },
  { label: "Figma", background: "#101010", asset: figmaLogo, logoScale: "0.4" },
  {
    label: "Anthropic",
    background: "#111111",
    asset: anthropicLogo,
    logoScale: "0.52",
  },
] as const;

function ArrowLaunchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

interface CommunityProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export default function CommunitySection({ targetRef }: CommunityProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Array<HTMLElement | null>>([]);
  const teaserRefs = useRef<Array<HTMLDivElement | null>>([]);

  // useEffect(() => {
  //   const grid = gridRef.current
  //   if (!grid) return

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       tileRefs.current.forEach((tile, index) => {
  //         if (!tile) return

  //         const pairIndex = Math.floor(index / 2)
  //         const reversePairIndex = TOTAL_PAIRS - 1 - pairIndex
  //         tile.style.transitionDelay = `${(entry.isIntersecting ? pairIndex : reversePairIndex) * 180}ms`
  //         tile.classList.toggle('is-visible', entry.isIntersecting)
  //       })

  //       teaserRefs.current.forEach((tile, index) => {
  //         if (!tile) return

  //         const pairIndex = TOTAL_PAIRS + Math.floor(index / 2)
  //         const reversePairIndex = teaserRefs.current.length / 2 - 1 - Math.floor(index / 2)
  //         tile.style.transitionDelay = `${(entry.isIntersecting ? pairIndex : reversePairIndex) * 180}ms`
  //         tile.classList.toggle('is-visible', entry.isIntersecting)
  //       })
  //     },
  //     { threshold: 0.14, rootMargin: '-4% 0px -8% 0px' },
  //   )

  //   observer.observe(grid)

  //   return () => observer.disconnect()
  // }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  const revealOrder = [
    18, 15, 17, 16, 13, 12, 7, 13, 1, 10, 16, 4, 2, 11, 8, 14, 17, 5,
  ];

  const total = revealOrder.length;

  return (
    <section className="community-wrapper" aria-labelledby="community-title">
      <div className="community-inner">
        <div className="community-kicker">
          <span className="community-kicker__square" aria-hidden="true" />
          <span>Our Community</span>
        </div>

        <header className="community-heading" id="community-title">
          <span>that&apos;s why Work Hall is where</span>
          <span className="community-heading__line">
            <em>Pakistan&apos;s Top</em>
            <RotatingText
              texts={["Startups", "Agencies", "Creators", "Founders"]}
              rotationInterval={2000}
              mainClassName="community-rotating-box"
              staggerFrom="last"
              initial={{ y: "150%" }}
              animate={{ y: 0 }}
              exit={{ y: "-158.4%" }}
              staggerDuration={0.025}
              splitLevelClassName="community-rotating-split"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
            <strong>come</strong>
          </span>
          <span>to work.</span>
        </header>

        <div className="community-grid-wrap">
          <div
            ref={gridRef}
            className="community-grid"
            aria-label="Community wall"
          >
            {tiles.map((tile, index) => {
              const order = revealOrder[index];

              const tileDelay = (order / (total - 1)) * 0.5;
              const fadeDistance = 0.1;
              
              const opacity = useTransform(scrollYProgress, (latest) => {
                const progress = (latest - tileDelay) / fadeDistance;

                return 1 - Math.min(Math.max(progress, 0), 1);
              });

              return (
                <motion.article
                  key={`${tile.kind}-${tile.label}-${index}`}
                  className={`community-tile community-tile--${tile.kind}`}
                  ref={(node) => {
                    tileRefs.current[index] = node;
                  }}
                  style={{
                    opacity,
                  }}
                >
                  <span className="community-tile__badge">{tile.badge}</span>

                  {tile.kind === "logo" ? (
                    <div
                      className="community-tile__logo-surface"
                      style={{ background: tile.background }}
                    >
                      <img
                        className="community-tile__logo"
                        src={tile.asset}
                        alt={tile.label}
                        style={{ transform: `scale(${tile.logoScale ?? "1"})` }}
                      />
                    </div>
                  ) : (
                    <img
                      className="community-tile__photo"
                      src={tile.image}
                      alt={tile.label}
                      style={{
                        objectPosition: tile.objectPosition ?? "center center",
                      }}
                    />
                  )}
                </motion.article>
              );
            })}
          </div>

          <div className="community-handoff-trigger" aria-hidden="true" />

          <div className="community-teaser-row" aria-hidden="true">
            {teaserTiles.map((tile, index) => (
              <div
                key={tile.label}
                className="community-teaser-tile"
                style={{ background: tile.background }}
                ref={(node) => {
                  teaserRefs.current[index] = node;
                }}
              >
                <img
                  className="community-teaser-tile__logo"
                  src={tile.asset}
                  alt=""
                  style={{ transform: `scale(${tile.logoScale})` }}
                />
              </div>
            ))}
          </div>

          <div className="community-cta-row">
            <a href="#book-tour" className="community-cta">
              <span>Become Part Of The Community</span>
              <span className="community-cta__badge" aria-hidden="true">
                <ArrowLaunchIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
