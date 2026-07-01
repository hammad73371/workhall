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
        initial={{ y: "110%", opacity: 0 }}
        animate={{
          y: isInView ? "0%" : "110%",
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          duration: 0.75,
          delay: isInView ? delay : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
