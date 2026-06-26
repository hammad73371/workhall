"use client";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FrameAnimation } from "./FrameAnimation";

export function PageTransition({
  children,
  onComplete,
}: {
  children: React.ReactNode;
  onComplete: () => void;
}) {
  const location = useLocation();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {!revealed && (
          <FrameAnimation
            key={location.pathname}
            onRevealNext={() => setRevealed(true)}
            onComplete={() => onComplete()}
          />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
