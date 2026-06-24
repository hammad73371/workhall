import React, { useEffect, useRef, useState } from "react";
import ScrollVelocity from "./ScrollVelocity";
import "./AmenitiesMarquee.css";
import {
  ShieldCheck,
  HandHelping,
  LayoutTemplate,
  Sparkles,
  Clock3,
} from "lucide-react";

interface AmenityCardProps {
  index: number;
  name: string;
  kicker: string;
  heading1: string;
  heading: string;
  bg: string;
  iconBg: string;
  icon: React.ReactNode;
  body: string;
}

const amenities = [
  {
    name: "Open 24/7\n365 Days",
    kicker: "Always open when work spills over",
    heading1: "Open 24/7, 365 Days\nWith Full Access",
    heading: "Free Gated Parking At All Locations",
    bg: "#D26C46",

    iconBg: "#893A1E",
    body: "Early starts, late decks, weekend catch-ups, and off-pattern schedules still land in a room that is already ready.",
    icon: <ShieldCheck size={25} color="#FFFFFF" />,
  },

  {
    name: "Free Gated\nParking",
    kicker: "Arrival, handled",
    heading1: "Free Gated Parking\nAt All Locations",
    heading: "Open 24/7, 365 Days With Full Access",
    bg: "#E0A5CF",

    iconBg: "#7D3561",
    body: "No circling the block before the workday starts. Drive in, lock up, and move straight into the room.",
    icon: <Clock3 size={25} color="#FFFFFF" />,
  },
  {
    name: "Staff Service\nAt Your Desk",
    kicker: "Quiet help, without the interruption",
    heading1: "Staff Service\nAt Your Desk",
    heading: "Custom Office Layouts",
    bg: "#458E71",

    iconBg: "#1D4733",
    body: "The small operational asks do not have to break concentration. Support can reach you where you are already working.",
    icon: <LayoutTemplate size={25} color="#FFFFFF" />,
  },
  {
    name: "Custom Office\nLayouts",
    kicker: "Built around how you work",
    heading1: "Custom Office\nLayouts",
    heading: "Staff Service At Your Desk",
    bg: "#516AA9",

    iconBg: "#2C4277",
    body: "Rooms can be shaped around the team, storage, privacy level, and the tempo of the work itself.",
    icon: <HandHelping size={25} color="#FFFFFF" />,
  },
  {
    name: "Car & Bike\nCleaning",
    kicker: "One less errand",
    heading1: "Car & Bike Cleaning\nOn Site",
    heading: "Car & Bike Cleaning On Site",
    bg: "#DBB154",

    iconBg: "#8C6A1D",
    body: "One more errand stays off the to-do list while the workday keeps moving.",
    icon: <Sparkles size={25} color="#FFFFFF" />,
  },

  {
    name: "Car & Bike\nCleaning",
    kicker: "One less errand",
    heading1: "Car & Bike Cleaning\nOn Site",
    heading: "Free Gated Parking At All Locations",
    bg: "#DBB154",

    iconBg: "#8C6A1D",
    body: "One more errand stays off the to-do list while the workday keeps moving.",
    icon: <ShieldCheck size={25} color="#FFFFFF" />,
  },

  {
    name: "Car & Bike\nCleaning",
    kicker: "One less errand",
    heading1: "Car & Bike Cleaning\nOn Site",
    heading: "Open 24/7, 365 Days With Full Access",
    bg: "#458E71",

    iconBg: "#1D4733",
    body: "One more errand stays off the to-do list while the workday keeps moving.",
    icon: <Clock3 size={25} color="#FFFFFF" />,
  },

  {
    name: "Car & Bike\nCleaning",
    kicker: "One less errand",
    heading1: "Car & Bike Cleaning\nOn Site",
    heading: "Custom Office Layouts",
    bg: "#516AA9",

    iconBg: "#2C4277",
    body: "One more errand stays off the to-do list while the workday keeps moving.",
    icon: <LayoutTemplate size={25} color="#FFFFFF" />,
  },

  {
    name: "Car & Bike\nCleaning",
    kicker: "One less errand",
    heading1: "Car & Bike Cleaning\nOn Site",
    heading: "Staff Service At Your Desk",
    bg: "#E0A5CF",

    iconBg: "#7D3561",
    body: "One more errand stays off the to-do list while the workday keeps moving.",
    icon: <HandHelping size={25} color="#FFFFFF" />,
  },

  {
    name: "Car & Bike\nCleaning",
    kicker: "One less errand",
    heading1: "Car & Bike Cleaning\nOn Site",
    heading: "Car & Bike Cleaning On Site",
    bg: "#D26C46",

    iconBg: "#893A1E",
    body: "One more errand stays off the to-do list while the workday keeps moving.",
    icon: <Sparkles size={25} color="#FFFFFF" />,
  },
];

// const backgrounds: Record<string, string> = {
//   "#D26C46": "#B85A38",
//   "#E0A5CF": "#C984B5",
//   "#458E71": "#38775E",
//   "#516AA9": "#415A94",
//   "#DBB154": "#C89A2E",
// };

const backgrounds: Record<string, string> = {
  "#D26C46": "#C4532B",
  "#E0A5CF": "#B24C8B",
  "#458E71": "#296549",
  "#516AA9": "#3F5FAA",
  "#DBB154": "#C8972A",
};

const AmenityCard: React.FC<
  AmenityCardProps & {
    isTouchMode: boolean;
    isFlipped: boolean;
    onToggle: () => void;
  }
> = ({
  kicker,
  heading1,
  heading,
  bg,
  iconBg,
  body,
  icon,
  isTouchMode,
  isFlipped,
  onToggle,
}) => {
  return (
    <div
      className={
        isFlipped ? "amenity-flip-wrapper is-flipped" : "amenity-flip-wrapper"
      }
      onClick={isTouchMode ? onToggle : undefined}
      role={isTouchMode ? "button" : undefined}
      aria-pressed={isTouchMode ? isFlipped : undefined}
      tabIndex={isTouchMode ? 0 : -1}
      onKeyDown={
        isTouchMode
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle();
              }
            }
          : undefined
      }
    >
      <div className="amenity-flip-inner">
        <div
          className="amenity-card-front"
          style={
            {
              // background: cardGradients[index % cardGradients.length],
              background: backgrounds[bg],
              border: `1px solid ${backgrounds[bg]}66`,
              boxShadow: `inset 0 1px 0 ${backgrounds[bg]}99`,

              "--amenity-accent": bg,
              "--amenity-glow-a": `${bg}40`,
              "--amenity-glow-b": `${bg}25`,
              "--amenity-glow-c": `${bg}cc`,
            } as React.CSSProperties
          }
        >
          {/* <span className="amenity-card-name">{name}</span> */}

          <div
            className="amenity-empty-box"
            style={{
              background: iconBg,
            }}
          >
            {icon}
          </div>
          <span className="amenity-back-heading">{heading}</span>
        </div>

        <div
          className="amenity-card-back"
          style={
            {
              // background: bg,
              // border: `1px solid ${bg}66`,
              // boxShadow: `inset 0 1px 0 ${bg}99`,

              // background: backgrounds[bg][index % backgrounds[bg].length],
              background: backgrounds[bg],
            } as React.CSSProperties
          }
        >
          <span className="amenity-card-back__logo" aria-hidden="true" />
          <span className="amenity-back-kicker">{kicker}</span>
          {/* <div className="amenity-empty-box"></div> */}
          {/* <span className="amenity-back-heading">{heading}</span> */}

          <span className="amenity-back-heading">{heading1}</span>
          <span className="amenity-back-body">{body}</span>
        </div>
      </div>
    </div>
  );
};

const AmenitiesMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchMode = () => {
      setIsTouchMode(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setFlippedCardId(null);
      }
    };

    updateTouchMode();
    mediaQuery.addEventListener("change", updateTouchMode);

    return () => mediaQuery.removeEventListener("change", updateTouchMode);
  }, []);

  useEffect(() => {
    if (!isTouchMode) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".amenity-flip-wrapper")) {
        setFlippedCardId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isTouchMode]);

  const renderCard = (
    card: (typeof amenities)[number],
    index: number,
    rowKey: string,
  ) => {
    const cardId = `${rowKey}-${index}-${card.heading}`;

    return (
      <AmenityCard
        key={cardId}
        index={index}
        isTouchMode={isTouchMode}
        isFlipped={flippedCardId === cardId}
        onToggle={() =>
          setFlippedCardId((current) => (current === cardId ? null : cardId))
        }
        {...card}
      />
    );
  };

  const row1 = amenities.map((amenity, index) =>
    renderCard(amenity, index, "r1"),
  );
  const row2 = [...amenities]
    .reverse()
    .map((amenity, index) =>
      renderCard(amenity, amenities.length - 1 - index, "r2"),
    );

  return (
    <section ref={sectionRef} className="amenities-marquee-section">
      <ScrollVelocity
        texts={[row1, row2]}
        velocity={80}
        paused={!isInView}
        className="amenity-row"
        numCopies={12}
        parallaxClassName="amenity-parallax"
        scrollerClassName="amenity-scroller"
      />
    </section>
  );
};

export default AmenitiesMarquee;
