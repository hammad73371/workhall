"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

interface IntroCinematicProps {
  onRevealNext: () => void;
  onComplete: () => void;
}

export function FrameAnimation({
  onRevealNext,
  onComplete,
}: IntroCinematicProps) {
  const [scope, animate] = useAnimate();
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function playSequence() {
      await new Promise((r) => setTimeout(r, 2600));
      if (cancelled || !frameRef.current || !scope.current) return;

      const blackout = scope.current.querySelector(
        ".frame-blackout",
      ) as HTMLElement | null;
      if (!blackout) return;

      const rect = frameRef.current.getBoundingClientRect();

      blackout.style.top = `${rect.top}px`;
      blackout.style.left = `${rect.left}px`;
      blackout.style.width = `${rect.width}px`;
      blackout.style.height = `${rect.height}px`;
      blackout.style.borderRadius = "24px";
      blackout.style.transform = "scale(1)";

      await animate(
        blackout,
        { opacity: 1 },
        { duration: 0.25, ease: "easeOut" },
      );
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 100));

      if (cancelled) return;

      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      const coverScale = Math.max(scaleX, scaleY) * 1.25;

      await animate(
        blackout,
        { scale: coverScale, borderRadius: 0 },
        { duration: 0.85, ease: [0.7, 0, 0.84, 0] },
      );
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 320));
      if (cancelled) return;

      onRevealNext();
      onComplete();
    }

    playSequence();
    return () => {
      cancelled = true;
    };
  }, [animate, scope, onRevealNext]);

  return (
    <div ref={scope} className="frame-container">
      <motion.div
        ref={frameRef}
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="frame"
      >
        <div className="frame__media" />
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="cam-status"
        >
          <span className="cam-text">CAM ON</span>
          <span className="blink-dot"></span>
        </motion.div>
      </motion.div>

      <div className="frame-blackout" />
    </div>
  );
}
