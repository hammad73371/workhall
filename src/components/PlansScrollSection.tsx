import { useEffect, useRef, useState } from 'react'

const SCROLL_BUDGET = 1400

interface PlanCardProps {
  categoryPath: string
  price: string
  overline: string
  planName: string
  tagline: string
  attributes: { label: string; fill: number }[]
  primaryCTA: string
  secondaryCTA: string
  locked?: boolean
}

const individualCards: PlanCardProps[] = [
  {
    categoryPath: 'INDIVIDUALS PATH',
    price: 'From Rs 20,000/mo',
    overline: 'FLEXIBLE COWORKING',
    planName: 'AIR PLAN',
    tagline: 'Best for freelancers, founders, and small teams who need a reliable everyday work base.',
    attributes: [
      { label: 'Flex', fill: 90 },
      { label: 'Privacy', fill: 20 },
      { label: 'Commitment', fill: 30 },
    ],
    primaryCTA: 'View plan',
    secondaryCTA: 'Book a tour',
  },
  {
    categoryPath: 'INDIVIDUALS PATH',
    price: 'From Rs 30,000/mo',
    overline: 'ASSIGNED DESK',
    planName: 'X PLAN',
    tagline: 'Same seat, same rhythm, fewer daily decisions. Consistency with the energy of a community.',
    attributes: [
      { label: 'Flex', fill: 60 },
      { label: 'Privacy', fill: 40 },
      { label: 'Commitment', fill: 70 },
    ],
    primaryCTA: 'View plan',
    secondaryCTA: 'Book a tour',
  },
  {
    categoryPath: 'INDIVIDUALS PATH',
    price: 'From Rs 10,000/mo',
    overline: 'BUSINESS ADDRESS',
    planName: 'VIRTUAL',
    tagline: 'A credible Karachi presence for remote-friendly businesses. Physical address, meeting room access.',
    attributes: [
      { label: 'Flex', fill: 80 },
      { label: 'Privacy', fill: 50 },
      { label: 'Commitment', fill: 20 },
    ],
    primaryCTA: 'View plan',
    secondaryCTA: 'Book a tour',
  },
] as const

const teamCards: PlanCardProps[] = [
  {
    categoryPath: 'TEAMS PATH',
    price: 'From Rs 50,000/mo',
    overline: 'PRIVATE OFFICE',
    planName: 'BOX PLAN',
    tagline: 'A private office for growing teams who need their own room without managing one alone.',
    attributes: [
      { label: 'Flex', fill: 40 },
      { label: 'Privacy', fill: 85 },
      { label: 'Commitment', fill: 80 },
    ],
    primaryCTA: 'View plan',
    secondaryCTA: 'Book a tour',
  },
  {
    categoryPath: 'TEAMS PATH',
    price: 'Custom pricing',
    overline: 'AUTONOMOUS SUITES',
    planName: 'ENTERPRISE',
    tagline: 'Fully autonomous private suites shaped around company size, access needs, and team operations.',
    attributes: [
      { label: 'Flex', fill: 30 },
      { label: 'Privacy', fill: 95 },
      { label: 'Commitment', fill: 90 },
    ],
    primaryCTA: 'View plan',
    secondaryCTA: 'Book a tour',
  },
  {
    categoryPath: 'TEAMS PATH',
    price: 'Custom pricing',
    overline: 'TAILORED OFFICES',
    planName: 'CUSTOM',
    tagline: 'Built around your workflow. Layout, storage, branding, and tempo configured for your team.',
    attributes: [
      { label: 'Flex', fill: 70 },
      { label: 'Privacy', fill: 90 },
      { label: 'Commitment', fill: 60 },
    ],
    primaryCTA: 'View plan',
    secondaryCTA: 'Book a tour',
    locked: true,
  },
] as const

function ArrowLaunchIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 10 10 2" />
      <path d="M4 2h6v6" />
    </svg>
  )
}

function PlanCard({
  categoryPath,
  price,
  overline,
  planName,
  tagline,
  attributes,
  primaryCTA,
  secondaryCTA,
  locked = false,
}: PlanCardProps) {
  return (
    <article className={locked ? 'plan-card plan-card--locked' : 'plan-card'}>
      <img src="/cowork.jpg" alt="workspace" />
      <span className="plan-card-overlay" aria-hidden="true" />

      <div className="plan-card-content">
        <div className="card-top-row">
          <span className="category-path">{categoryPath}</span>
          <span className="price-pill">{price}</span>
        </div>

        <div className="card-middle">
          <span className="card-overline">{overline}</span>
          <h4>{planName}</h4>
          <p>{tagline}</p>
        </div>

        <div className="card-bottom-stack">
          <div className="attribute-bars" aria-label={`${planName} attributes`}>
            {attributes.map((attribute) => (
              <div key={attribute.label} className="attribute-row">
                <span className="attribute-label">{attribute.label}</span>
                <span className="attribute-track">
                  <span className="attribute-fill" style={{ width: `${attribute.fill}%` }} />
                </span>
              </div>
            ))}
          </div>

          <div className="card-cta-row">
            <a href="#plans" className="card-cta-primary">
              <span>{primaryCTA}</span>
              <ArrowLaunchIcon />
            </a>
            <a href="#book-tour" className="card-cta-secondary">
              <span>{secondaryCTA}</span>
              <ArrowLaunchIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

function PlansGroup({
  title,
  cards,
  description,
}: {
  title: string
  cards: ReadonlyArray<PlanCardProps>
  description: string
}) {
  return (
    <section className="plans-group">
      <h3>{title}</h3>

      <div className="cards-row">
        {cards.map((card) => (
          <div key={card.planName} className="card-slot">
            <PlanCard {...card} />
          </div>
        ))}
      </div>

      <div className="plans-group__footer">
        <p>{description}</p>
        <a href="#book-tour" className="plans-group__link">
          <span>Book now</span>
          <span aria-hidden="true">&gt;</span>
        </a>
      </div>
    </section>
  )
}

export function PlansScrollSection() {
  const outerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track) return

      const outerRect = outer.getBoundingClientRect()
      const scrolledIntoSection = -outerRect.top
      const clampedScroll = Math.max(0, Math.min(SCROLL_BUDGET, scrolledIntoSection))
      const nextProgress = clampedScroll / SCROLL_BUDGET
      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 160)

      track.style.transform = `translateX(-${nextProgress * maxTranslate}px)`
      setProgress(nextProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      ref={outerRef}
      className="plans-scroll-section"
      style={{ height: `calc(100vh + ${SCROLL_BUDGET}px)` }}
      aria-labelledby="plans-title"
    >
      <div className="plans-scroll-section__sticky">
        <div className="plans-header">
          <div className="plans-header__kicker">
            <span className="plans-header__square" aria-hidden="true" />
            <span>Plans</span>
          </div>

          <div className="plans-header__heading" id="plans-title">
            <span>Because We&apos;ve Got A Space</span>
            <span className="is-accent">Every Way You Work</span>
          </div>

          <p>
            Whether you&apos;re a freelancer who needs a desk or an enterprise that needs the whole floor
            - there&apos;s a plan that fits exactly how you build.
          </p>
        </div>

        <div className="plans-track-zone">
          <div ref={trackRef} className="plans-track">
            <PlansGroup
              title="FOR INDIVIDUALS"
              cards={individualCards}
              description="Flexible coworking, assigned desks, and virtual setup for people who need a reliable everyday base without committing to more room than the day needs."
            />

            <div className="group-divider" aria-hidden="true" />

            <PlansGroup
              title="FOR TEAM"
              cards={teamCards}
              description="Private offices, enterprise setups, and tailored room to grow for teams that need more privacy, more structure, and a base that can scale with them."
            />
          </div>
        </div>

        <span className="plans-scroll-section__progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
      </div>
    </section>
  )
}
