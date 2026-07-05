import { useEffect, useId, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { testimonialSlides } from "./testimonialData";
import { ShuffleText } from "./shared/ShuffleText";
import "./TestimonialsSection.css";

function TrendGraph({
  trendPoints,
  trendStart,
  trendEnd,
  trendValue,
  trendLabel,
}: {
  trendPoints: Array<[number, number]>;
  trendStart: string;
  trendEnd: string;
  trendValue: string;
  trendLabel: string;
}) {
  const polylinePoints = useMemo(
    () => trendPoints.map(([x, y]) => `${x},${y}`).join(" "),
    [trendPoints],
  );
  const [lastX, lastY] = trendPoints[trendPoints.length - 1];

  return (
    <div className="testimonials-showcase__graph-card">
      <div className="testimonials-showcase__graph-shell" aria-hidden="true">
        <svg
          className="testimonials-showcase__graph"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="8" y1="82" x2="92" y2="82" />
          <line x1="8" y1="54" x2="92" y2="54" />
          <line x1="8" y1="28" x2="92" y2="28" />
          <polyline points={polylinePoints} />
          <circle cx={lastX} cy={lastY} r="2.2" />
        </svg>
        <span
          className="testimonials-showcase__graph-bubble"
          style={{ left: `${lastX}%`, top: `${lastY}%` }}
        >
          {trendValue}
        </span>
      </div>

      <div className="testimonials-showcase__graph-meta">
        <span>{trendStart}</span>
        <span>{trendEnd}</span>
      </div>
      <p className="testimonials-showcase__graph-label">{trendLabel}</p>
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const headingId = useId();
  const slide = testimonialSlides[activeIndex];

  useEffect(() => {
    if (!playingVideoId) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPlayingVideoId(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [playingVideoId]);

  const goTo = (nextIndex: number) => {
    const lastIndex = testimonialSlides.length - 1;
    if (nextIndex < 0) {
      setActiveIndex(lastIndex);
      return;
    }
    if (nextIndex > lastIndex) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(nextIndex);
  };

  return (
    <>
      <section
        className="testimonials-showcase"
        aria-labelledby={headingId}
      >
        <div className="testimonials-showcase__inner">
          <div className="testimonials-showcase__header">
            <div className="testimonials-showcase__title-block">
              <span className="testimonials-showcase__kicker">
                <span
                  className="testimonials-showcase__kicker-square"
                  aria-hidden="true"
                />
                {slide.kicker}
              </span>
              <h2 id={headingId} className="testimonials-showcase__title">
                <ShuffleText
                  text={slide.heading}
                  finalColor="currentColor"
                  rootMargin="0px 0px -12% 0px"
                />
              </h2>
            </div>

            <div className="testimonials-showcase__controls">
              <button
                type="button"
                className="testimonials-showcase__control"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="testimonials-showcase__control"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next testimonial"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="testimonials-showcase__viewport"
            role="region"
            aria-roledescription="carousel"
            aria-label="Member testimonials"
          >
            <div
              className="testimonials-showcase__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonialSlides.map((item) => (
                <article
                  key={item.id}
                  className="testimonials-showcase__slide"
                  aria-label={`${item.authorName} testimonial`}
                >
                  <div className="testimonials-showcase__grid">
                    <aside className="testimonials-showcase__quote-card">
                      <div className="testimonials-showcase__quote-panel">
                        <div className="testimonials-showcase__stat-value">
                          {item.statValue}
                        </div>
                        <p className="testimonials-showcase__stat-caption">
                          {item.statCaption}
                        </p>
                        <blockquote className="testimonials-showcase__quote">
                          {item.quote}
                        </blockquote>
                      </div>

                      <div className="testimonials-showcase__quote-footer">
                        <div className="testimonials-showcase__tags">
                          {item.resultTags.map((tag) => (
                            <span
                              key={`${item.id}-${tag}`}
                              className="testimonials-showcase__tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="testimonials-showcase__person">
                          <strong>{item.authorName}</strong>
                          <span>
                            {item.authorRole}
                            <br />
                            {item.authorCompany}
                          </span>
                        </div>
                      </div>
                    </aside>

                    <button
                      type="button"
                      className="testimonials-showcase__hero-card"
                      onClick={() => setPlayingVideoId(item.id)}
                      aria-label={`Play ${item.authorName} testimonial video`}
                    >
                      <img
                        src={item.heroPoster}
                        alt={item.heroAlt}
                        className="testimonials-showcase__hero-image"
                      />
                      <span
                        className="testimonials-showcase__play-button"
                        aria-hidden="true"
                      >
                        <Play />
                      </span>
                    </button>

                    <figure className="testimonials-showcase__secondary-card">
                      <img
                        src={item.secondaryImage}
                        alt={item.secondaryAlt}
                        className="testimonials-showcase__secondary-image"
                      />
                    </figure>

                    <TrendGraph
                      trendPoints={item.trendPoints}
                      trendStart={item.trendStart}
                      trendEnd={item.trendEnd}
                      trendValue={item.trendValue}
                      trendLabel={item.trendLabel}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {playingVideoId && (
        <div
          className="testimonials-showcase__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Testimonial video"
          onClick={() => setPlayingVideoId(null)}
        >
          <div
            className="testimonials-showcase__modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="testimonials-showcase__modal-close"
              onClick={() => setPlayingVideoId(null)}
              aria-label="Close testimonial video"
            >
              <X aria-hidden="true" />
            </button>
            <video
              className="testimonials-showcase__video"
              src={
                testimonialSlides.find((item) => item.id === playingVideoId)
                  ?.heroVideoSrc
              }
              controls
              autoPlay
              playsInline
              poster={
                testimonialSlides.find((item) => item.id === playingVideoId)
                  ?.heroPoster
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
