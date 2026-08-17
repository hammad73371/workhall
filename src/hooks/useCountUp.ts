import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
  duration?: number;
  delay?: number;
  enabled?: boolean;
  format?: (value: number) => string;
}

export function useCountUp(target: number, {
  duration = 1600,
  delay = 0,
  enabled = true,
  format = String,
}: CountUpOptions = {}) {
  const [display, setDisplay] = useState(() => format(0));
  const formatRef = useRef(format);
  formatRef.current = format;

  useEffect(() => {
    if (!enabled) {
      setDisplay(formatRef.current(0));
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(formatRef.current(target));
      return;
    }

    let frame = 0;
    let startTime: number | undefined;
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        startTime ??= now;
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = progress < 0.5
          ? 4 * Math.pow(progress, 3)
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const nextDisplay = formatRef.current(Math.round(target * easedProgress));

        setDisplay((currentDisplay) => currentDisplay === nextDisplay ? currentDisplay : nextDisplay);
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, duration, enabled, target]);

  return display;
}
