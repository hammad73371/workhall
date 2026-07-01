import { motion } from "framer-motion";

interface BubbleProps {
  src: string;
  left: string;
  width: string;
  height: string;
  duration: number;
  delay: number;
  isInView: boolean;
}

export default function Bubble({
  src,
  left,
  width,
  height,
  duration,
  delay,
  isInView,
}: BubbleProps) {
  return (
    <motion.div
      className="absolute pointer-events-none wh-overlay__svg"
      style={{ left, bottom: 0, width, height }}
      animate={
        isInView
          ? {
              y: ["0px", "-100vh"],
              opacity: [0, 1, 1, 0],
            }
          : { y: "0px", opacity: 0 }
      }
      transition={
        isInView
          ? {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
              repeatDelay: 0.5,
            }
          : { duration: 0 }
      }
    >
      <img src={src} alt="" className="w-full h-full object-contain" />
    </motion.div>
  );
}
