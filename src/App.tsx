import { useEffect, useRef, useState } from "react";
import AmenitiesMarquee from "./components/AmenitiesMarquee";
import { BookingConcierge } from "./components/booking/BookingConcierge";
import CommunitySection from "./components/CommunitySection";
import { FigmaFunctionalNav } from "./components/layout/FigmaFunctionalNav";
import { LocationsMapSection } from "./components/locations/LocationsMapSection";
import PageLoader from "./components/PageLoader";
import { PlansScrollSection } from "./components/PlansScrollSection";
import PurposeHallsSection from "./components/PurposeHallsSection";
import Stack from "./components/Stack";
import WhyWorkHallSection from "./components/WhyWorkHallSection";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import { ClickSpark } from "./components/shared/effects";
import {
  ShieldCheck,
  Clock3,
  LayoutTemplate,
  HandHelping,
  Sparkles,
} from "lucide-react";
import workhallOrange from "./assets/workhall-orange.svg";
import "./App.css";
import { PageTransition } from "./components/PageTransition";
import PromiseSection from "./components/PromiseSection/PromiseSection";
import { WorkspaceFitQuizSection } from "./components/WorkspaceFitQuizSection";
import Footer from "./components/Footer/Footer";
import { workHallLocations } from "./data/siteContent";
import type { WorkspaceQuizAnswers } from "./types/site";
const stats = [
  { value: "06", label: "Location", color: "#458E71" },
  { value: "07+", label: "Years", color: "#D26C46" },
  { value: "800+", label: "Seats", color: "#3B59A3" },
  { value: "40k+", label: "Sq.ft area", color: "#8C8464" },
];

function useCountUp(
  target: string,
  duration: number,
  delay: number,
  enabled: boolean,
) {
  const [display, setDisplay] = useState(target.replace(/[0-9]/g, "0"));

  useEffect(() => {
    if (!enabled) {
      setDisplay(target.replace(/[0-9]/g, "0"));
      return;
    }

    const timeout = window.setTimeout(() => {
      const numeric = Number.parseInt(target.replace(/[^0-9]/g, ""), 10);
      const suffix = target.replace(/[0-9]/g, "");
      const start = Date.now();

      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(eased * numeric);
        setDisplay(`${String(current).padStart(2, "0")}${suffix}`);
        if (progress < 1) window.requestAnimationFrame(tick);
      };

      window.requestAnimationFrame(tick);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [delay, duration, enabled, target]);

  return display;
}

function App() {
  const whyWorkHallRef = useRef(null);
  const [selectedLocationId, setSelectedLocationId] = useState(
    workHallLocations[0].id,
  );

  const [loaderDone, setLoaderDone] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroCards = [
    {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern coworking workspace with desks and meeting zones",
      position: "center center",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      alt: "Open office interior with natural light",
      position: "center center",
    },
    {
      src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
      alt: "Collaborative workspace with shared desks",
      position: "center center",
    },
    {
      src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80&sat=-10",
      alt: "Flexible office workspace layout",
      position: "62% center",
    },
    {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      alt: "Premium office lounge and workstation interior",
      position: "center center",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80&sat=8",
      alt: "Bright meeting-friendly coworking office",
      position: "46% center",
    },
    {
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      alt: "Contemporary office workspace with warm interiors",
      position: "center center",
    },
    {
      src: "/cowork.jpg",
      alt: "WorkHall workspace lounge",
      position: "center center",
    },
  ];
  const statDisplays = [
    useCountUp("06", 820, 120, isLoaded),
    useCountUp("07+", 860, 180, isLoaded),
    useCountUp("800+", 980, 240, isLoaded),
    useCountUp("40k+", 980, 300, isLoaded),
  ];

  useEffect(() => {
    if (!loaderDone) return;
    const timeout = window.setTimeout(() => setIsLoaded(true), 0);
    return () => window.clearTimeout(timeout);
  }, [loaderDone]);

  const handleQuizComplete = (answers: WorkspaceQuizAnswers) => {
    if (answers.locationId) {
      setSelectedLocationId(answers.locationId);
    }

    document
      .getElementById("locations")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!loaderDone) {
    // return <PageLoader onComplete={() => setLoaderDone(true)} />;
    // return setLoaderDone(true);
  }

  return (
    <>
      <ClickSpark
        sparkColor="#c97b5a"
        sparkSize={14}
        sparkRadius={22}
        sparkCount={10}
        duration={480}
      >
        <PageTransition onComplete={() => setLoaderDone(true)}>
          <main
            className={
              isLoaded
                ? "figma-page-shell hero-page is-loaded"
                : "figma-page-shell hero-page"
            }
          >
            <a
              className="hero-brand-mark"
              href="#top"
              aria-label="WorkHall home"
            >
              <img src={workhallOrange} alt="WorkHall" />
            </a>
            <FigmaFunctionalNav isLoaded={isLoaded} />
            <section
              className="figma-hero figma-hero--clipped"
              aria-labelledby="hero-title"
            >
              <div className="figma-hero__left-column">
                <article className="figma-hero__copy-card hero-left-card">
                  <div className="figma-hero__headline-block headline-block">
                    <div className="word-row">
                      {["Re-Think", "Your"].map((word, index) => (
                        <div className="word-mask" key={word}>
                          <span
                            className="word-rise"
                            style={{ animationDelay: `${620 + index * 130}ms` }}
                          >
                            {word}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="word-row orange-line">
                      <div className="word-mask">
                        <span
                          className="word-rise"
                          style={{ animationDelay: "880ms" }}
                        >
                          Workspace.
                        </span>
                      </div>
                    </div>
                    <h1 id="hero-title">
                      <span>Re-Think Your</span>
                      <em>Workspace.</em>
                    </h1>
                  </div>

                  <p className="figma-hero__lede hero-subheading">
                    With Pakistan&apos;s most flexible coworking spaces, open
                    24/7, across 6 locations. All built for the way you actually
                    work, not the way an office thinks you should.
                  </p>

                  <div
                    className="figma-search-card booking-widget"
                    aria-label="Workspace search"
                  >
                    <BookingConcierge variant="hero" />
                  </div>
                </article>

                <section
                  className="figma-stats-card stats-bar"
                  aria-label="WorkHall stats"
                >
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="figma-stat">
                      <strong style={{ color: stat.color }}>
                        {statDisplays[index]}
                      </strong>
                      <span style={{ color: stat.color }}>{stat.label}</span>
                    </div>
                  ))}
                </section>
              </div>

              <aside
                className="figma-hero__image-card hero-image-card"
                aria-label="Workspace preview image"
              >
                <div className="hero-stack-shell">
                  <Stack
                    randomRotation={false}
                    sensitivity={280}
                    sendToBackOnClick
                    autoplay
                    autoplayDelay={3600}
                    pauseOnHover
                    mobileClickOnly
                    cards={heroCards.map((card) => (
                      <img
                        key={`${card.src}-${card.position}`}
                        src={card.src}
                        alt={card.alt}
                        className="stack-card-media"
                        style={{ objectPosition: card.position }}
                      />
                    ))}
                  />
                </div>
              </aside>
            </section>
            <AmenitiesMarquee />
            <PlansScrollSection />
            <PurposeHallsSection />
            <CommunitySection targetRef={whyWorkHallRef} />
            <WhyWorkHallSection ref={whyWorkHallRef} />
            <section
              className="amenities-stack-section"
              aria-labelledby="amenities-stack-title"
            >
              <div className="amenities-stack-header">
                <div className="amenities-stack-kicker">
                  <span
                    className="amenities-stack-kicker__square"
                    aria-hidden="true"
                  />
                  <span>Amenities</span>
                </div>
                <h2
                  id="amenities-stack-title"
                  className="amenities-stack-title"
                >
                  <span>Because we give you</span>
                  <span className="amenities-stack-title__accent">
                    everything
                  </span>
                  <span>you need</span>
                </h2>
              </div>

              <ScrollStack
                useWindowScroll
                itemDistance={60}
                itemScale={0.03}
                itemStackDistance={30}
                stackPosition="20%"
                scaleEndPosition="10%"
                baseScale={0.85}
                blurAmount={2}
              >
                <ScrollStackItem>
                  <div className="ss-card__icon-box">
                    <ShieldCheck size={28} color="#FFFFFF" />
                  </div>
                  <div className="ss-card__copy">
                    <span className="ss-card__kicker">
                      Always open when work spills over
                    </span>
                    <span className="ss-card__name">
                      Open 24/7, 365 Days With Full Access
                    </span>
                    <p className="ss-card__body">
                      Early starts, late decks, weekend catch-ups, and
                      off-pattern schedules still land in a room that is already
                      ready.
                    </p>
                  </div>
                  <span className="ss-card__number">01</span>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="ss-card__icon-box">
                    <Clock3 size={28} color="#FFFFFF" />
                  </div>
                  <div className="ss-card__copy">
                    <span className="ss-card__kicker">Arrival, handled</span>
                    <span className="ss-card__name">
                      Free Gated Parking At All Locations
                    </span>
                    <p className="ss-card__body">
                      No circling the block before the workday starts. Drive in,
                      lock up, and move straight into the room.
                    </p>
                  </div>
                  <span className="ss-card__number">02</span>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="ss-card__icon-box">
                    <LayoutTemplate size={28} color="#FFFFFF" />
                  </div>
                  <div className="ss-card__copy">
                    <span className="ss-card__kicker">
                      Quiet help, without the interruption
                    </span>
                    <span className="ss-card__name">
                      Staff Service At Your Desk
                    </span>
                    <p className="ss-card__body">
                      The small operational asks do not have to break
                      concentration. Support can reach you where you are already
                      working.
                    </p>
                  </div>
                  <span className="ss-card__number">03</span>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="ss-card__icon-box">
                    <HandHelping size={28} color="#FFFFFF" />
                  </div>
                  <div className="ss-card__copy">
                    <span className="ss-card__kicker">
                      Built around how you work
                    </span>
                    <span className="ss-card__name">Custom Office Layouts</span>
                    <p className="ss-card__body">
                      Rooms can be shaped around the team, storage, privacy
                      level, and the tempo of the work itself.
                    </p>
                  </div>
                  <span className="ss-card__number">04</span>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="ss-card__icon-box">
                    <Sparkles size={28} color="#FFFFFF" />
                  </div>
                  <div className="ss-card__copy">
                    <span className="ss-card__kicker">One less errand</span>
                    <span className="ss-card__name">
                      Car &amp; Bike Cleaning On Site
                    </span>
                    <p className="ss-card__body">
                      One more errand stays off the to-do list while the workday
                      keeps moving.
                    </p>
                  </div>
                  <span className="ss-card__number">05</span>
                </ScrollStackItem>
              </ScrollStack>
            </section>
            <PromiseSection />
            <WorkspaceFitQuizSection onComplete={handleQuizComplete} />
            <LocationsMapSection
              selectedLocationId={selectedLocationId}
              onSelectedLocationChange={setSelectedLocationId}
            />
            <Footer onSubscribe={(email) => console.log(email)} />
          </main>
        </PageTransition>
      </ClickSpark>
    </>
  );
}

export default App;
