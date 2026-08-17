import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./CoverflowCarousel.css";

export interface CoverflowSlide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  detail: string;
  href: string;
}

interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  initialIndex?: number;
  onSelectedChange?: (index: number) => void;
}

export function CoverflowCarousel({ slides, initialIndex = 0, onSelectedChange }: CoverflowCarouselProps) {
  const count = slides.length;
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const positionRef = useRef(initialIndex);
  const targetRef = useRef(initialIndex);
  const widthRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const dragRef = useRef<{ id: number; x: number; position: number; velocity: number; time: number } | null>(null);
  const [selected, setSelected] = useState(initialIndex);

  const indexAt = useCallback((position: number) => ((Math.round(position) % count) + count) % count, [count]);

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;

    const pitch = width * 1.08;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = index - positionRef.current;
      offset = ((offset % count) + count) % count;
      if (offset > count / 2) offset -= count;

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, 0.58);
      const tilt = Math.min(44 * ramp, 78) * Math.sign(offset);
      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-0.62 * width * ramp}px) rotateY(${-tilt}deg)`;
      card.style.opacity = String(Math.max(0, 1 - 0.1 * distance) * Math.max(0, count / 2 - distance));
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count]);

  const settle = useCallback((target: number) => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    targetRef.current = target;
    const nextIndex = indexAt(target);
    setSelected(nextIndex);
    onSelectedChange?.(nextIndex);

    const step = () => {
      const remaining = target - positionRef.current;
      if (Math.abs(remaining) < 0.0004) {
        positionRef.current = target;
        paint();
        animationRef.current = null;
        return;
      }
      positionRef.current += remaining * 0.16;
      paint();
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  }, [indexAt, onSelectedChange, paint]);

  const goTo = useCallback((index: number) => {
    const target = index + Math.round((targetRef.current - index) / count) * count;
    settle(target);
  }, [count, settle]);

  const nudge = useCallback((amount: number) => settle(Math.round(targetRef.current) + amount), [settle]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      widthRef.current = cardRefs.current[0]?.offsetWidth ?? 0;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => () => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
  }, []);

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    settle(Math.round(positionRef.current + Math.max(-2, Math.min(2, drag.velocity * 0.18))));
  };

  return (
    <div className="coverflow" role="region" aria-roledescription="carousel" aria-label="WorkHall locations">
      <div className="coverflow__stage">
        <div
          ref={frameRef}
          className="coverflow__frame"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); nudge(-1); }
            if (event.key === "ArrowRight") { event.preventDefault(); nudge(1); }
          }}
          onPointerDown={(event) => {
            if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
            event.currentTarget.setPointerCapture(event.pointerId);
            dragRef.current = { id: event.pointerId, x: event.clientX, position: positionRef.current, velocity: 0, time: performance.now() };
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            const pitch = widthRef.current * 1.08;
            if (!drag || drag.id !== event.pointerId || !pitch) return;
            const now = performance.now();
            const previous = positionRef.current;
            positionRef.current = drag.position - (event.clientX - drag.x) / pitch;
            drag.velocity = ((positionRef.current - previous) / Math.max(now - drag.time, 1)) * 1000;
            drag.time = now;
            const index = indexAt(positionRef.current);
            if (index !== selected) { setSelected(index); onSelectedChange?.(index); }
            paint();
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="coverflow__track">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.title}
                ref={(node) => { cardRefs.current[index] = node; }}
                className="coverflow__card"
                aria-label={`Select ${slide.title}`}
                aria-current={index === selected}
                onClick={() => goTo(index)}
              >
                <img src={slide.src} alt={slide.alt} draggable={false} />
                <span className="coverflow__overlay" />
                <span className="coverflow__content">
                  <small>{slide.subtitle}</small>
                  <strong>{slide.title}</strong>
                  <em>{slide.detail}</em>
                </span>
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="coverflow__arrow coverflow__arrow--previous" aria-label="Previous location" onClick={() => nudge(-1)}><ChevronLeft size={22} /></button>
        <button type="button" className="coverflow__arrow coverflow__arrow--next" aria-label="Next location" onClick={() => nudge(1)}><ChevronRight size={22} /></button>
      </div>
      <div className="coverflow__pagination">
        {slides.map((slide, index) => <button key={slide.title} type="button" aria-label={`Go to ${slide.title}`} aria-current={index === selected} className={index === selected ? "is-active" : undefined} onClick={() => goTo(index)} />)}
      </div>
    </div>
  );
}
