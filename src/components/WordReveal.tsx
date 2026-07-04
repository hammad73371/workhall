import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function WordReveal({ children, delay = 0 }: WordRevealProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "0px 0px -50px 0px",
  });

  return (
    <span className="inline-block overflow-hidden" ref={ref}>
      <motion.span
        className="inline-block"
        initial={{ y: "140%", opacity: 0, filter: "blur(10px)", scale: 0.94 }}
        animate={{
          y: isInView ? "0%" : "140%",
          opacity: isInView ? 1 : 0,
          filter: isInView ? "blur(0px)" : "blur(10px)",
          scale: isInView ? 1 : 0.94,
        }}
        transition={{
          duration: 1.05,
          delay: isInView ? delay : 0,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
