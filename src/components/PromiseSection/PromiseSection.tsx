import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { promiseSteps } from "./promiseData";
import "./PromiseSection.css";

const DIM_OPACITY = 0.3;
const FULL_OPACITY = 1;

function PromiseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.4, 0.62, 0.85, 1],
    [
      DIM_OPACITY,
      FULL_OPACITY,
      FULL_OPACITY,
      FULL_OPACITY,
      FULL_OPACITY,
      DIM_OPACITY,
    ],
  );

  return (
    <section className="promise-section">
      <motion.div className="promise-section__inner" style={{ opacity }}>
        <h2 className="promise-section__heading">
          and nothing you don&apos;t.
        </h2>

        <div ref={sectionRef} className="promise-steps" role="list">
          {promiseSteps.map((step, index) => (
            <div className="promise-steps__item-wrap" key={step.id}>
              <div className="promise-steps__item" role="listitem">
                <div className="promise-steps__icon">{step.icon}</div>
                <p className="promise-steps__label">{step.label}</p>
              </div>

              {index < promiseSteps.length - 1 && (
                <span className="promise-steps__divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default PromiseSection;
