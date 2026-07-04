import { motion } from "framer-motion";

interface BubbleProps {
  width: string;
  height: string;
  duration: number;
  delay: number;
  isInView: boolean;
  xPath: number[];
  yPath: number[];
  scalePath?: number[];
  rotatePath?: number[];
}

export default function Bubble({
  width,
  height,
  duration,
  delay,
  isInView,
  xPath,
  yPath,
  scalePath = [0.72, 1.06, 0.98, 0.9],
  rotatePath = [0, 0, 0],
}: BubbleProps) {
  return (
    <motion.div
      className="wh-overlay__svg"
      style={{ width, height }}
      animate={
        isInView
          ? {
              x: xPath,
              y: yPath,
              opacity: 1,
              scale: scalePath,
              rotate: rotatePath,
            }
          : {
              x: xPath[0] ?? 0,
              y: yPath[0] ?? 0,
              opacity: 1,
              scale: scalePath[0],
              rotate: rotatePath[0] ?? 0,
            }
      }
      transition={
        isInView
          ? {
              duration,
              delay,
              ease: "linear",
              repeatDelay: 0.26,
            }
          : { duration: 0 }
      }
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="wh-overlay__icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
        <path
          d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
          stroke="#F26B47"
          strokeWidth="2.6"
        />
        <path d="M12 17h.01" stroke="#F26B47" strokeWidth="3.2" />
      </svg>
    </motion.div>
  );
}
