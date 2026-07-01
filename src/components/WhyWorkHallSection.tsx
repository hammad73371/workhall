import "./WhyWorkHallSection.css";
import { forwardRef } from "react";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Bubble from "./Bubble";
import WordReveal from "./WordReveal";

const bubbles = [
  { left: "0%", width: "80px", height: "80px", duration: 2.5, delay: 0 },
  { left: "3%", width: "80px", height: "80px", duration: 3, delay: 0.4 },
  { left: "4%", width: "80px", height: "80px", duration: 2.2, delay: 0.2 },
  { left: "5%", width: "80px", height: "80px", duration: 2.8, delay: 1.0 },
  { left: "6%", width: "80px", height: "80px", duration: 2.5, delay: 0.6 },
  // { left: "12%", width: "80px", height: "80px", duration: 5.2, delay: 0.9 },
  // { left: "68%", width: "80px", height: "80px", duration: 4.2, delay: 1.5 },
  // { left: "78%", width: "80px", height: "80px", duration: 5.8, delay: 0.4 },
  // { left: "88%", width: "80px", height: "55px", duration: 4.6, delay: 1.1 },
];

const WhyWorkHallSection = forwardRef<HTMLElement>((props, ref) => {
  const overlayRef = useRef(null);
  const isInView = useInView(overlayRef, {
    margin: "0px 0px -100px 0px",
  });

  const [delayedInView, setDelayedInView] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isInView) {
      timer = setTimeout(() => {
        setDelayedInView(true);
      }, 1000);
    } else {
      setDelayedInView(false);
    }

    return () => clearTimeout(timer);
  }, [isInView]);
  return (
    <section
      ref={ref}
      className="wh-outer"
      aria-labelledby="why-workhall-title"
    >
      <div className="wh-card">
        <img className="wh-bg" src="/whyworkhall.png" alt="" />

        {/* <div className="wh-content">
          <div className="wh-kicker">
            <span className="wh-kicker__square" aria-hidden="true" />
            <span>Why Work Hall</span>
          </div>

          <h2 id="why-workhall-title" className="wh-title">
            <span>Work Hall over any other</span>
            <span>Still, why should you choose</span>
            <span>co-working space?</span>
          </h2>
        </div> */}
        <div className="wh-content">
          <h2 id="why-workhall-title" className="wh-title">
            <WordReveal delay={0}>why </WordReveal>
            <WordReveal delay={0.1}>work</WordReveal>
            <WordReveal delay={0.2}>hall</WordReveal>
          </h2>
        </div>

        <div className="wh-overlay" ref={overlayRef}>
          {bubbles.map((b, i) => (
            <Bubble
              key={i}
              src="/src/assets/workhall-white.svg"
              isInView={delayedInView}
              {...b}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyWorkHallSection;
