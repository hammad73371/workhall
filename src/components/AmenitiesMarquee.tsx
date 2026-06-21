import React, { useEffect, useRef, useState } from 'react';
import ScrollVelocity from './ScrollVelocity';
import './AmenitiesMarquee.css';

interface AmenityCardProps {
  index: number;
  name: string;
  kicker: string;
  heading: string;
  body: string;
}

const amenities = [
  {
    name: 'Open 24/7\n365 Days',
    kicker: 'Always open when work spills over',
    heading: 'Open 24/7, 365 Days\nWith Full Access',
    body: 'Early starts, late decks, weekend catch-ups, and off-pattern schedules still land in a room that is already ready.',
  },
  {
    name: 'Free Gated\nParking',
    kicker: 'Arrival, handled',
    heading: 'Free Gated Parking\nAt All Locations',
    body: 'No circling the block before the workday starts. Drive in, lock up, and move straight into the room.',
  },
  {
    name: 'Staff Service\nAt Your Desk',
    kicker: 'Quiet help, without the interruption',
    heading: 'Staff Service\nAt Your Desk',
    body: 'The small operational asks do not have to break concentration. Support can reach you where you are already working.',
  },
  {
    name: 'Custom Office\nLayouts',
    kicker: 'Built around how you work',
    heading: 'Custom Office\nLayouts',
    body: 'Rooms can be shaped around the team, storage, privacy level, and the tempo of the work itself.',
  },
  {
    name: 'Car & Bike\nCleaning',
    kicker: 'One less errand',
    heading: 'Car & Bike Cleaning\nOn Site',
    body: 'One more errand stays off the to-do list while the workday keeps moving.',
  },
];

const cardGradients = [
  [
    'radial-gradient(ellipse at 15% 20%, rgba(210, 108, 70, 0.42) 0%, transparent 60%)',
    'radial-gradient(ellipse at 82% 18%, rgba(236, 198, 108, 0.22) 0%, transparent 54%)',
    'linear-gradient(135deg, rgba(255, 250, 240, 0.94), rgba(244, 234, 220, 0.82))',
  ].join(', '),
  [
    'radial-gradient(ellipse at 84% 16%, rgba(196, 152, 60, 0.38) 0%, transparent 56%)',
    'radial-gradient(ellipse at 18% 76%, rgba(219, 143, 96, 0.18) 0%, transparent 60%)',
    'linear-gradient(145deg, rgba(248, 241, 229, 0.96), rgba(235, 225, 212, 0.84))',
  ].join(', '),
  [
    'radial-gradient(ellipse at 12% 80%, rgba(195, 130, 120, 0.34) 0%, transparent 58%)',
    'radial-gradient(ellipse at 76% 20%, rgba(245, 210, 170, 0.16) 0%, transparent 58%)',
    'linear-gradient(135deg, rgba(247, 238, 228, 0.95), rgba(239, 230, 220, 0.86))',
  ].join(', '),
  [
    'radial-gradient(ellipse at 78% 58%, rgba(120, 155, 110, 0.26) 0%, transparent 60%)',
    'radial-gradient(ellipse at 14% 18%, rgba(232, 167, 124, 0.22) 0%, transparent 56%)',
    'linear-gradient(145deg, rgba(245, 237, 227, 0.96), rgba(232, 226, 214, 0.86))',
  ].join(', '),
  [
    'radial-gradient(ellipse at 50% 10%, rgba(185, 100, 75, 0.40) 0%, transparent 54%)',
    'radial-gradient(ellipse at 82% 78%, rgba(214, 170, 58, 0.18) 0%, transparent 56%)',
    'linear-gradient(135deg, rgba(246, 238, 229, 0.95), rgba(236, 228, 217, 0.86))',
  ].join(', '),
];

const AmenityCard: React.FC<AmenityCardProps & {
  isTouchMode: boolean;
  isFlipped: boolean;
  onToggle: () => void;
}> = ({ name, kicker, heading, body, index, isTouchMode, isFlipped, onToggle }) => {
  return (
    <div
      className={isFlipped ? 'amenity-flip-wrapper is-flipped' : 'amenity-flip-wrapper'}
      onClick={isTouchMode ? onToggle : undefined}
      role={isTouchMode ? 'button' : undefined}
      aria-pressed={isTouchMode ? isFlipped : undefined}
      tabIndex={isTouchMode ? 0 : -1}
      onKeyDown={isTouchMode ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onToggle();
        }
      } : undefined}
    >
      <div className="amenity-flip-inner">
        <div
          className="amenity-card-front"
          style={{ background: cardGradients[index % cardGradients.length] }}
        >
          <span className="amenity-card-name">{name}</span>
        </div>

        <div className="amenity-card-back">
          <span className="amenity-card-back__logo" aria-hidden="true" />
          <span className="amenity-back-kicker">{kicker}</span>
          <span className="amenity-back-heading">{heading}</span>
          <span className="amenity-back-body">{body}</span>
        </div>
      </div>
    </div>
  );
};

const AmenitiesMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05, rootMargin: '120px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateTouchMode = () => {
      setIsTouchMode(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setFlippedCardId(null);
      }
    };

    updateTouchMode();
    mediaQuery.addEventListener('change', updateTouchMode);

    return () => mediaQuery.removeEventListener('change', updateTouchMode);
  }, []);

  useEffect(() => {
    if (!isTouchMode) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.amenity-flip-wrapper')) {
        setFlippedCardId(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isTouchMode]);

  const renderCard = (card: typeof amenities[number], index: number, rowKey: string) => {
    const cardId = `${rowKey}-${index}-${card.heading}`;

    return (
      <AmenityCard
        key={cardId}
        index={index}
        isTouchMode={isTouchMode}
        isFlipped={flippedCardId === cardId}
        onToggle={() => setFlippedCardId((current) => (current === cardId ? null : cardId))}
        {...card}
      />
    );
  };

  const row1 = amenities.map((amenity, index) => renderCard(amenity, index, 'r1'));
  const row2 = [...amenities].reverse().map((amenity, index) =>
    renderCard(amenity, amenities.length - 1 - index, 'r2')
  );

  return (
    <section ref={sectionRef} className="amenities-marquee-section">
      <ScrollVelocity
        texts={[row1, row2]}
        velocity={80}
        paused={!isInView}
        className="amenity-row"
        numCopies={12}
        parallaxClassName="amenity-parallax"
        scrollerClassName="amenity-scroller"
      />
    </section>
  );
};

export default AmenitiesMarquee;
