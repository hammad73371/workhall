import { useEffect, useRef, useState } from "react";
import Card from "./Card/Card";
import type { CarouselImage } from "../types";

const SCROLL_BUDGET = 2400;
const DESKTOP_MEDIA_QUERY = "(min-width: 1025px)";
const MIN_SCROLL_BUDGET = 920;

interface PlanCardProps {
  planName: string;
  title: string;
  description: string;
  tags: string[];
  learnMoreUrl: string;
  images: CarouselImage[];
}

const PLANS_MIN_OPACITY = 0.18;
const PLANS_MAX_OPACITY = 1;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getGroupOpacity(progress: number, focusPoint: number) {
  const distance = Math.abs(progress - focusPoint);
  const fadeSpan = 0.5;
  const normalized = clamp(1 - distance / fadeSpan, 0, 1);
  const eased = normalized * normalized * (3 - 2 * normalized);

  return PLANS_MIN_OPACITY + (PLANS_MAX_OPACITY - PLANS_MIN_OPACITY) * eased;
}

// const individualCards: PlanCardProps[] = [
//   {
//     categoryPath: "INDIVIDUALS PATH",
//     price: "From Rs 20,000/mo",
//     overline: "FLEXIBLE COWORKING",
//     planName: "AIR PLAN",
//     tagline:
//       "Best for freelancers, founders, and small teams who need a reliable everyday work base.",
//     attributes: [
//       { label: "Flex", fill: 90 },
//       { label: "Privacy", fill: 20 },
//       { label: "Commitment", fill: 30 },
//     ],
//     primaryCTA: "View plan",
//     secondaryCTA: "Book a tour",
//   },
//   {
//     categoryPath: "INDIVIDUALS PATH",
//     price: "From Rs 30,000/mo",
//     overline: "ASSIGNED DESK",
//     planName: "X PLAN",
//     tagline:
//       "Same seat, same rhythm, fewer daily decisions. Consistency with the energy of a community.",
//     attributes: [
//       { label: "Flex", fill: 60 },
//       { label: "Privacy", fill: 40 },
//       { label: "Commitment", fill: 70 },
//     ],
//     primaryCTA: "View plan",
//     secondaryCTA: "Book a tour",
//   },
//   {
//     categoryPath: "INDIVIDUALS PATH",
//     price: "From Rs 10,000/mo",
//     overline: "BUSINESS ADDRESS",
//     planName: "VIRTUAL",
//     tagline:
//       "A credible Karachi presence for remote-friendly businesses. Physical address, meeting room access.",
//     attributes: [
//       { label: "Flex", fill: 80 },
//       { label: "Privacy", fill: 50 },
//       { label: "Commitment", fill: 20 },
//     ],
//     primaryCTA: "View plan",
//     secondaryCTA: "Book a tour",
//   },
// ] as const;

// const teamCards: PlanCardProps[] = [
//   {
//     categoryPath: "TEAMS PATH",
//     price: "From Rs 50,000/mo",
//     overline: "PRIVATE OFFICE",
//     planName: "BOX PLAN",
//     tagline:
//       "A private office for growing teams who need their own room without managing one alone.",
//     attributes: [
//       { label: "Flex", fill: 40 },
//       { label: "Privacy", fill: 85 },
//       { label: "Commitment", fill: 80 },
//     ],
//     primaryCTA: "View plan",
//     secondaryCTA: "Book a tour",
//   },
//   {
//     categoryPath: "TEAMS PATH",
//     price: "Custom pricing",
//     overline: "AUTONOMOUS SUITES",
//     planName: "ENTERPRISE",
//     tagline:
//       "Fully autonomous private suites shaped around company size, access needs, and team operations.",
//     attributes: [
//       { label: "Flex", fill: 30 },
//       { label: "Privacy", fill: 95 },
//       { label: "Commitment", fill: 90 },
//     ],
//     primaryCTA: "View plan",
//     secondaryCTA: "Book a tour",
//   },
//   {
//     categoryPath: "TEAMS PATH",
//     price: "Custom pricing",
//     overline: "TAILORED OFFICES",
//     planName: "CUSTOM",
//     tagline:
//       "Built around your workflow. Layout, storage, branding, and tempo configured for your team.",
//     attributes: [
//       { label: "Flex", fill: 70 },
//       { label: "Privacy", fill: 90 },
//       { label: "Commitment", fill: 60 },
//     ],
//     primaryCTA: "View plan",
//     secondaryCTA: "Book a tour",
//     locked: true,
//   },
// ] as const;

const individualCards: PlanCardProps[] = [
  {
    planName: "Air",
    title: "Air",
    description:
      "Pick a desk, plug in, get to work. No strings, no commitment.maybe a different spot every once in a while, but just a greatplace to spend your day.",
    tags: ["Freelancers", "Founders", "Small Teams", "Remote Workers"],
    learnMoreUrl: "#air",
    images: [
      {
        src: "https://picsum.photos/seed/air-1/900/700",
        alt: "Open desks near a sunlit window",
      },
      {
        src: "https://picsum.photos/seed/air-2/900/700",
        alt: "Shared workspace with bench seating",
      },
      {
        src: "https://picsum.photos/seed/air-3/900/700",
        alt: "Coffee bar in the lounge area",
      },
    ],
  },
  {
    planName: "X",
    title: "X",
    description:
      "Your own dedicated desk, waiting for you every morning.Leave your monitors, leave your things, it's all yoursand only yours.",
    tags: ["Founders", "Students", " Creatives/Creators", "Remote Employees"],
    learnMoreUrl: "#x-plan",
    images: [
      {
        src: "https://picsum.photos/seed/xplan-1/900/700",
        alt: "Assigned desk with personal storage",
      },
      {
        src: "https://picsum.photos/seed/xplan-2/900/700",
        alt: "Member at their regular desk",
      },
      {
        src: "https://picsum.photos/seed/xplan-3/900/700",
        alt: "Community lounge",
      },
    ],
  },
  {
    planName: "Nox",
    title: "Nox",
    description:
      "Shared or fixed desk at a reduced rate. Same space,same amenities, same great community, just during thequieter hours of the night.",
    tags: [
      "Budget-conscious freelancers",
      "Part time workers",
      " People serving overseas clients",
      "Night owls",
    ],
    learnMoreUrl: "#virtual",
    images: [
      {
        src: "https://picsum.photos/seed/virtual-1/900/700",
        alt: "Reception desk used for mail handling",
      },
      {
        src: "https://picsum.photos/seed/virtual-2/900/700",
        alt: "Meeting room available on demand",
      },
      {
        src: "https://picsum.photos/seed/virtual-3/900/700",
        alt: "Building exterior signage",
      },
    ],
  },
];

const teamCards: PlanCardProps[] = [
  {
    planName: "Base",
    title: "Base",
    description:
      "Dedicated desks for your whole team in our shared space.Sit together, collaborate freely, and still be around the energyof a full community.",
    tags: [
      "Startups",
      "Smaller Teams/Groups",
      " Growing Businesses",
      "Agencies",
    ],
    learnMoreUrl: "#box",
    images: [
      {
        src: "https://picsum.photos/seed/box-1/900/700",
        alt: "Private office with a closed door",
      },
      {
        src: "https://picsum.photos/seed/box-2/900/700",
        alt: "Small team meeting inside their office",
      },
      {
        src: "https://picsum.photos/seed/box-3/900/700",
        alt: "Whiteboard wall in private office",
      },
    ],
  },
  {
    planName: "Box",
    title: "Box",
    description:
      "A private, lockable office that's entirely yours. Confidential,personal, privacy focused, and layout set up exactly the way you want it.",
    tags: ["Founders", "Students", "Creatives/Creators", "Employees"],
    learnMoreUrl: "#enterprise",
    images: [
      {
        src: "https://picsum.photos/seed/enterprise-1/900/700",
        alt: "Branded reception for a private suite",
      },
      {
        src: "https://picsum.photos/seed/enterprise-2/900/700",
        alt: "Glass walled boardroom",
      },
      {
        src: "https://picsum.photos/seed/enterprise-3/900/700",
        alt: "Open floor office with skyline view",
      },
    ],
  },
  {
    planName: "Suite",
    title: "Suite",
    description:
      "A fully private office space designed around how your team works. Custom layout, your branding, your environment,your rules.",
    tags: [
      "Custom Builds",
      "Branded Offices",
      "Long-term Leases",
      "Specialized Teams",
    ],
    learnMoreUrl: "#custom",
    images: [
      {
        src: "https://picsum.photos/seed/custom-1/900/700",
        alt: "Custom branded office interior",
      },
      {
        src: "https://picsum.photos/seed/custom-2/900/700",
        alt: "Configured storage and layout",
      },
      {
        src: "https://picsum.photos/seed/custom-3/900/700",
        alt: "Team working in a tailored space",
      },
    ],
  },
];

const enterpriseCards: PlanCardProps[] = [
  {
    planName: "Core",
    title: "Core",
    description:
      "Placeholder enterprise offer for larger organizations that need a managed private footprint, cleaner access control, and room to scale across teams.",
    tags: ["Multi-floor Teams", "HQ Ops", "Security Needs", "Admin Support"],
    learnMoreUrl: "#enterprise-core",
    images: [
      {
        src: "https://picsum.photos/seed/enterprise-core-1/900/700",
        alt: "Enterprise workspace placeholder one",
      },
      {
        src: "https://picsum.photos/seed/enterprise-core-2/900/700",
        alt: "Enterprise workspace placeholder two",
      },
      {
        src: "https://picsum.photos/seed/enterprise-core-3/900/700",
        alt: "Enterprise workspace placeholder three",
      },
    ],
  },
  {
    planName: "Campus",
    title: "Campus",
    description:
      "Placeholder enterprise suite designed for distributed departments that need connected rooms, breakout zones, and an operations-first setup.",
    tags: ["Departments", "Breakout Rooms", "Managed Access", "Custom Fit"],
    learnMoreUrl: "#enterprise-campus",
    images: [
      {
        src: "https://picsum.photos/seed/enterprise-campus-1/900/700",
        alt: "Enterprise campus placeholder one",
      },
      {
        src: "https://picsum.photos/seed/enterprise-campus-2/900/700",
        alt: "Enterprise campus placeholder two",
      },
      {
        src: "https://picsum.photos/seed/enterprise-campus-3/900/700",
        alt: "Enterprise campus placeholder three",
      },
    ],
  },
  {
    planName: "Custom",
    title: "Custom",
    description:
      "Placeholder enterprise build for brands that need tailored layouts, long-term planning, and a fully bespoke workplace environment.",
    tags: ["Bespoke Layouts", "Branding", "Long-term Scale", "Executive Teams"],
    learnMoreUrl: "#enterprise-custom",
    images: [
      {
        src: "https://picsum.photos/seed/enterprise-custom-1/900/700",
        alt: "Enterprise custom placeholder one",
      },
      {
        src: "https://picsum.photos/seed/enterprise-custom-2/900/700",
        alt: "Enterprise custom placeholder two",
      },
      {
        src: "https://picsum.photos/seed/enterprise-custom-3/900/700",
        alt: "Enterprise custom placeholder three",
      },
    ],
  },
];

// function PlanCard({
//   categoryPath,
//   price,
//   overline,
//   planName,
//   tagline,
//   attributes,
//   primaryCTA,
//   secondaryCTA,
//   locked = false,
// }: PlanCardProps) {
//   return (
//     // <article className={locked ? 'plan-card plan-card--locked' : 'plan-card'}>
//     //   <img src="/cowork.jpg" alt="workspace" />
//     //   <span className="plan-card-overlay" aria-hidden="true" />

//     //   <div className="plan-card-content">
//     //     <div className="card-top-row">
//     //       <span className="category-path">{categoryPath}</span>
//     //       <span className="price-pill">{price}</span>
//     //     </div>

//     //     <div className="card-middle">
//     //       <span className="card-overline">{overline}</span>
//     //       <h4>{planName}</h4>
//     //       <p>{tagline}</p>
//     //     </div>

//     //     <div className="card-bottom-stack">
//     //       <div className="attribute-bars" aria-label={`${planName} attributes`}>
//     //         {attributes.map((attribute) => (
//     //           <div key={attribute.label} className="attribute-row">
//     //             <span className="attribute-label">{attribute.label}</span>
//     //             <span className="attribute-track">
//     //               <span className="attribute-fill" style={{ width: `${attribute.fill}%` }} />
//     //             </span>
//     //           </div>
//     //         ))}
//     //       </div>

//     //       <div className="card-cta-row">
//     //         <a href="#plans" className="card-cta-primary">
//     //           <span>{primaryCTA}</span>
//     //           <ArrowLaunchIcon />
//     //         </a>
//     //         <a href="#book-tour" className="card-cta-secondary">
//     //           <span>{secondaryCTA}</span>
//     //           <ArrowLaunchIcon />
//     //         </a>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </article>

//     <>
//     </>
//   );
// }

function PlansGroup({
  title,
  cards,
  description: _description,
  mobile = false,
  opacity,
}: {
  title: string;
  cards: ReadonlyArray<PlanCardProps>;
  description: string;
  mobile?: boolean;
  opacity?: number;
}) {
  return (
    <section
      className={mobile ? "plans-group plans-group--mobile" : "plans-group"}
      style={opacity !== undefined ? { opacity, transition: "opacity 0.3s ease" } : undefined}
    >
      <h3>{title}</h3>

      <div className={mobile ? "cards-row cards-row--mobile" : "cards-row"}>
        {cards.map((card) => (
          <div
            key={card.planName}
            className={mobile ? "card-slot card-slot--mobile" : "card-slot"}
          >
            <Card {...card} />
          </div>
        ))}
      </div>

      {/* <div className="plans-group__footer">
        <p>{description}</p>
        <a href="#book-tour" className="plans-group__link">
          <span>Book now</span>
          <span aria-hidden="true">&gt;</span>
        </a>
      </div> */}
    </section>
  );
}

export function PlansScrollSection() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [scrollBudget, setScrollBudget] = useState(SCROLL_BUDGET);
  const scrollBudgetRef = useRef(SCROLL_BUDGET);
  const maxTranslateRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia(DESKTOP_MEDIA_QUERY).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);

    updateDesktop();
    mediaQuery.addEventListener("change", updateDesktop);

    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setProgress(0);
      setScrollBudget(SCROLL_BUDGET);
      scrollBudgetRef.current = SCROLL_BUDGET;
      maxTranslateRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = "translateX(0)";
      }
      return;
    }

    const calculateTrackMetrics = () => {
      const track = trackRef.current;
      if (!track) return;

      const viewportWidth = window.innerWidth;
      const nextMaxTranslate = Math.max(
        0,
        track.scrollWidth - viewportWidth + 300,
      );
      maxTranslateRef.current = nextMaxTranslate;

      const nextBudget =
        nextMaxTranslate > 0
          ? Math.max(MIN_SCROLL_BUDGET, Math.round(nextMaxTranslate * 1.15))
          : 0;

      if (scrollBudgetRef.current !== nextBudget) {
        scrollBudgetRef.current = nextBudget;
        setScrollBudget(nextBudget);
      }
    };

    const handleScroll = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      if (scrollBudgetRef.current <= 0) {
        track.style.transform = "translateX(0)";
        setProgress(0);
        return;
      }

      const outerRect = outer.getBoundingClientRect();
      const scrolledIntoSection = -outerRect.top;
      const clampedScroll = Math.max(
        0,
        Math.min(scrollBudgetRef.current, scrolledIntoSection),
      );
      const nextProgress = clampedScroll / scrollBudgetRef.current;

      track.style.transform = `translateX(-${nextProgress * maxTranslateRef.current}px)`;
      setProgress(nextProgress);
    };

    calculateTrackMetrics();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateTrackMetrics);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateTrackMetrics);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return (
      <section
        className="plans-scroll-section plans-scroll-section--mobile"
        aria-labelledby="plans-title"
      >
        <div className="plans-header plans-header--mobile">
          <div className="plans-header__kicker">
            <span className="plans-header__square" aria-hidden="true" />
            <span>Plans</span>
          </div>

          <div className="plans-header__heading" id="plans-title">
            <span>Because We&apos;ve Got A Space</span>
            <span className="is-accent">Every Way You Work</span>
          </div>

          <p>
            Whether you&apos;re a freelancer who needs a desk or an enterprise
            that needs the whole floor - there&apos;s a plan that fits exactly
            how you build.
          </p>
        </div>

        <div className="plans-mobile-groups">
          <PlansGroup
            title="Individuals"
            cards={individualCards}
            description="Flexible coworking, assigned desks, and virtual setup for people who need a reliable everyday base without committing to more room than the day needs."
            mobile
          />
          <PlansGroup
            title="Teams"
            cards={teamCards}
            description="Private offices, enterprise setups, and tailored room to grow for teams that need more privacy, more structure, and a base that can scale with them."
            mobile
          />
          <PlansGroup
            title="Enterprises"
            cards={enterpriseCards}
            description="Placeholder enterprise offers for larger organizations that need scale, private infrastructure, and bespoke operational setups."
            mobile
          />
        </div>
      </section>
    );
  }

  const individualsOpacity = getGroupOpacity(progress, 0);
  const teamsOpacity = getGroupOpacity(progress, 0.5);
  const enterprisesOpacity = getGroupOpacity(progress, 1);

  return (
    <section
      ref={outerRef}
      className="plans-scroll-section"
      style={{ height: `calc(100vh + ${scrollBudget}px)` }}
      aria-labelledby="plans-title"
    >
      <div className="plans-scroll-section__sticky">
        <div className="plans-header">
          <div className="plans-header__kicker">
            <span className="plans-header__square" aria-hidden="true" />
            <span>Plans</span>
          </div>

          <div className="plans-header__heading" id="plans-title">
            <span>Because We&apos;ve Got A Space</span>
            <span className="is-accent">Every Way You Work</span>
          </div>

          <p>
            Whether you&apos;re a freelancer who needs a desk or an enterprise
            that needs the whole floor - there&apos;s a plan that fits exactly
            how you build.
          </p>
        </div>

        <div className="plans-track-zone">
          <div ref={trackRef} className="plans-track">
            <PlansGroup
              title="Individuals"
              cards={individualCards}
              description="Flexible coworking, assigned desks, and virtual setup for people who need a reliable everyday base without committing to more room than the day needs."
              opacity={individualsOpacity}
            />

            <div className="group-divider" aria-hidden="true" />

            <PlansGroup
              title="Teams"
              cards={teamCards}
              description="Private offices, enterprise setups, and tailored room to grow for teams that need more privacy, more structure, and a base that can scale with them."
              opacity={teamsOpacity}
            />

            <div className="group-divider" aria-hidden="true" />

            <PlansGroup
              title="Enterprises"
              cards={enterpriseCards}
              description="Placeholder enterprise offers for larger organizations that need scale, private infrastructure, and bespoke operational setups."
              opacity={enterprisesOpacity}
            />
          </div>
        </div>

        <span
          className="plans-scroll-section__progress"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

