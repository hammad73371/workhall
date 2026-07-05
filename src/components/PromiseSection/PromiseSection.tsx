import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { RotatingText, type RotatingTextRef } from "../shared/effects";
import { ShuffleText } from "../shared/ShuffleText";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  amenityItems,
  amenitiesHeading,
  promiseHeading,
  promiseItems,
} from "./promiseData";
import "./PromiseSection.css";

function PromiseSection() {
  const amenityRowCount = Math.ceil(amenityItems.length / 2);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rotatingTextRef = useRef<RotatingTextRef | null>(null);
  const reducedMotion = useReducedMotion();
  const introWordCount = useMemo(
    () => amenitiesHeading.trim().split(/\s+/).length,
    [],
  );
  const introHeadlineRuntime = useMemo(
    () => 720 + Math.max(0, introWordCount - 1) * 120 + 140,
    [introWordCount],
  );
  const introVisible = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -140px 0px",
  });
  const [showAmenitiesLayer, setShowAmenitiesLayer] = useState(true);
  const [showPromiseLayer, setShowPromiseLayer] = useState(false);
  const [showKicker, setShowKicker] = useState(true);
  const [showIntroHeadline, setShowIntroHeadline] = useState(true);
  const [showRotatingHeadline, setShowRotatingHeadline] = useState(false);
  const [visibleAmenityRows, setVisibleAmenityRows] = useState(amenityRowCount);
  const [visiblePromiseItems, setVisiblePromiseItems] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.38, 0.62, 1],
    ["#f8f0e3", "#f8f0e3", "#d26d45", "#d26d45"],
  );

  const promiseOpacity = useTransform(
    scrollYProgress,
    [0.44, 0.54, 0.68, 1],
    [0, 0.08, 1, 1],
  );
  const promiseScale = useTransform(
    scrollYProgress,
    [0.46, 0.7],
    [0.93, 1],
  );
  const promiseY = useTransform(scrollYProgress, [0.46, 0.7], [32, 0]);

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.38, 0.62, 1],
    ["#15110d", "#15110d", "#f8e9df", "#f8e9df"],
  );
  const kickerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.34, 0.4],
    [1, 1, 0.02, 0],
  );
  const kickerY = useTransform(scrollYProgress, [0, 0.4], [0, -20]);
  const promiseShadow = useTransform(
    scrollYProgress,
    [0.46, 0.72],
    [0.1, 0.22],
  );
  const promiseBoxShadow = useMotionTemplate`0 18px 38px rgba(95, 41, 16, ${promiseShadow})`;
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!rotatingTextRef.current || reducedMotion) return;
    rotatingTextRef.current.jumpTo(value >= 0.5 ? 1 : 0);
    setShowAmenitiesLayer(value < 0.5);
    setShowPromiseLayer(value >= 0.44);
    setShowKicker(value < 0.4);
    if (value >= 0.36) {
      setShowIntroHeadline(false);
      setShowRotatingHeadline(true);
    }

    const amenityExitStart = 0.34;
    const amenityExitEnd = 0.5;
    const promiseEnterStart = 0.52;
    const promiseEnterEnd = 0.76;

    const amenityProgress =
      value <= amenityExitStart
        ? 0
        : value >= amenityExitEnd
          ? 1
          : (value - amenityExitStart) / (amenityExitEnd - amenityExitStart);

    const hiddenAmenityRows = Math.min(
      amenityRowCount,
      Math.floor(amenityProgress * amenityRowCount),
    );
    setVisibleAmenityRows(amenityRowCount - hiddenAmenityRows);

    const promiseProgress =
      value <= promiseEnterStart
        ? 0
        : value >= promiseEnterEnd
          ? 1
          : (value - promiseEnterStart) / (promiseEnterEnd - promiseEnterStart);

    const shownPromiseItems = Math.min(
      promiseItems.length,
      Math.floor(promiseProgress * promiseItems.length),
    );
    setVisiblePromiseItems(shownPromiseItems);
  });

  useEffect(() => {
    if (!rotatingTextRef.current) return;
    rotatingTextRef.current.jumpTo(0);
    if (reducedMotion) {
      rotatingTextRef.current.jumpTo(0);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!introVisible) return;

    setShowIntroHeadline(true);
    setShowRotatingHeadline(false);

    const timeoutId = window.setTimeout(() => {
      setShowIntroHeadline(false);
      setShowRotatingHeadline(true);
    }, introHeadlineRuntime);

    return () => window.clearTimeout(timeoutId);
  }, [introHeadlineRuntime, introVisible, reducedMotion]);

  useEffect(() => {
    if (!reducedMotion) return;
    setShowAmenitiesLayer(true);
    setShowPromiseLayer(true);
    setShowKicker(true);
    setShowIntroHeadline(false);
    setShowRotatingHeadline(true);
    setVisibleAmenityRows(amenityRowCount);
    setVisiblePromiseItems(promiseItems.length);
  }, [amenityRowCount, reducedMotion]);

  return (
    <motion.section
      ref={sectionRef}
      className={`promise-section${reducedMotion ? " is-reduced-motion" : ""}`}
      style={reducedMotion ? undefined : { backgroundColor }}
      aria-labelledby="promise-heading"
    >
      <div className="promise-section__track">
        <div className="promise-section__sticky">
          <div className="promise-section__inner">
            <div className="promise-section__grid">
              <div className="promise-section__left-stage">
                <motion.div
                  className={`promise-section__amenities-layer${
                    showAmenitiesLayer || reducedMotion ? "" : " is-cutoff"
                  }${introVisible || reducedMotion ? " is-intro-visible" : ""}`}
                  aria-hidden="true"
                >
                  <div className="promise-section__amenities-list" role="list">
                    {amenityItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`promise-section__amenity${
                          Math.floor(index / 2) < visibleAmenityRows || reducedMotion
                            ? ""
                            : " is-row-exit"
                        }`}
                        role="listitem"
                      >
                        <span
                          className={`promise-section__amenity-square${
                            Math.floor(index / 2) < visibleAmenityRows || reducedMotion
                              ? ""
                              : " is-row-exit"
                          }`}
                          aria-hidden="true"
                        />
                        <p className="promise-section__amenity-text">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className={`promise-section__promise-layer${
                    showPromiseLayer || reducedMotion ? "" : " is-cutoff"
                  }`}
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: promiseOpacity,
                          scale: promiseScale,
                          y: promiseY,
                        }
                  }
                  role="list"
                >
                  {promiseItems.map((item, index) => (
                    <article
                      key={item.id}
                      className={`promise-item${
                        index < visiblePromiseItems || reducedMotion
                          ? " is-scroll-visible"
                          : ""
                      }`}
                      role="listitem"
                    >
                      <motion.span
                      className="promise-item__square"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: promiseBoxShadow,
                        }}
                        aria-hidden="true"
                      />
                      <p className="promise-item__label">{item.label}</p>
                    </article>
                  ))}
                </motion.div>
              </div>

              <div className="promise-section__copy">
                <motion.div
                  className={`promise-section__kicker${
                    showKicker || reducedMotion ? "" : " is-cutoff"
                  }`}
                  style={
                    reducedMotion
                      ? undefined
                      : { opacity: kickerOpacity, y: kickerY, color: textColor }
                  }
                >
                  <span
                    className="promise-section__kicker-square"
                    aria-hidden="true"
                  />
                  <span>Amenities</span>
                </motion.div>

                <motion.h2
                  id="promise-heading"
                  className="promise-section__headline-stage"
                  style={reducedMotion ? undefined : { color: textColor }}
                >
                  <motion.span
                    className={`promise-section__headline-intro${
                      showIntroHeadline || reducedMotion ? "" : " is-cutoff"
                    }`}
                  >
                    <ShuffleText
                      text={amenitiesHeading}
                      finalColor="currentColor"
                      startDelay={0}
                      stagger={120}
                      duration={720}
                      rootMargin="0px 0px -12% 0px"
                    />
                  </motion.span>

                  <motion.span
                    className={`promise-section__headline-rotating${
                      showRotatingHeadline || reducedMotion ? "" : " is-cutoff"
                    }`}
                  >
                    <RotatingText
                      ref={rotatingTextRef}
                      texts={[amenitiesHeading, promiseHeading]}
                      auto={false}
                      loop={false}
                      splitBy="words"
                      staggerFrom="last"
                      staggerDuration={0.012}
                      animatePresenceMode="wait"
                      transition={{ type: "spring", damping: 28, stiffness: 280 }}
                      mainClassName="promise-section__rotating"
                      splitLevelClassName="promise-section__rotating-word"
                      elementLevelClassName="promise-section__rotating-text"
                    />
                  </motion.span>
                </motion.h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default PromiseSection;
