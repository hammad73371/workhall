import "./WhyWorkHallSection.css";
import { forwardRef } from "react";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Bubble from "./Bubble";
import WordReveal from "./WordReveal";

const bubbles = [
  {
    width: "120px",
    height: "120px",
    duration: 0.98,
    delay: 0,
    xPath: [0, -26, -104, -286],
    yPath: [0, -440, -900, -1520],
    scalePath: [1.02, 0.98, 0.88, 0.72],
    rotatePath: [-16, -5, 13, 24],
  },
  {
    width: "91px",
    height: "91px",
    duration: 1.09,
    delay: 0.03,
    xPath: [0, -8, -44, -142],
    yPath: [0, -390, -820, -1380],
    scalePath: [0.96, 1.03, 0.9, 0.76],
    rotatePath: [-9, -2, 5, 12],
  },
  {
    width: "125px",
    height: "125px",
    duration: 0.86,
    delay: 0.01,
    xPath: [0, 16, -12, 42],
    yPath: [0, -500, -990, -1620],
    scalePath: [1.06, 1, 0.92, 0.78],
    rotatePath: [-4, 3, -8, 6],
  },
  {
    width: "96px",
    height: "96px",
    duration: 1.05,
    delay: 0.05,
    xPath: [0, 14, 62, 176],
    yPath: [0, -410, -850, -1430],
    scalePath: [0.97, 1.02, 0.88, 0.74],
    rotatePath: [10, 3, -6, -18],
  },
  {
    width: "117px",
    height: "117px",
    duration: 0.94,
    delay: 0.02,
    xPath: [0, 34, 132, 318],
    yPath: [0, -435, -910, -1550],
    scalePath: [1.01, 0.99, 0.87, 0.7],
    rotatePath: [14, 6, -10, -24],
  },
  {
    width: "81px",
    height: "81px",
    duration: 1.15,
    delay: 0.04,
    xPath: [0, -18, -82, -196],
    yPath: [0, -365, -760, -1290],
    scalePath: [0.92, 0.98, 0.86, 0.72],
    rotatePath: [-20, -8, 3, 16],
  },
  {
    width: "83px",
    height: "83px",
    duration: 1.02,
    delay: 0.06,
    xPath: [0, 10, 88, 212],
    yPath: [0, -382, -790, -1340],
    scalePath: [0.94, 1, 0.88, 0.74],
    rotatePath: [18, 7, -2, -15],
  },
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
      }, 980);
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
            <span className="wh-title__line">
              <WordReveal delay={0}>Still, why should you choose</WordReveal>
            </span>
            <span className="wh-title__line">
              <WordReveal delay={0.1}>Work Hall over any other</WordReveal>
            </span>
            <span className="wh-title__line">
              <WordReveal delay={0.2}>coworking space</WordReveal>
            </span>
          </h2>
        </div>

        <div className="wh-overlay" ref={overlayRef}>
          {bubbles.map((b, i) => (
            <Bubble
              key={i}
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
