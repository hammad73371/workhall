import { AnimatePresence, motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { pricingAudienceMeta, pricingPlans } from '../../data/siteContent'
import { cn, getRevealMotionProps } from '../../lib/siteMotion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { PricingPlan } from '../../types/site'
import { ArrowIcon, CheckIcon } from '../shared/icons'

function getInitialPricingAudience(): PricingPlan['audience'] {
  if (typeof window === 'undefined') return 'individuals'
  return window.location.hash === '#plans-teams' ? 'teams' : 'individuals'
}

function getDefaultPricingPlanId(audience: PricingPlan['audience']) {
  return pricingPlans.find((plan) => plan.audience === audience)?.id ?? pricingPlans[0].id
}

export function PricingPlansCarousel({
  activeAudience,
  onAudienceChange,
}: {
  activeAudience: PricingPlan['audience']
  onAudienceChange: (audience: PricingPlan['audience']) => void
}) {
  const [activePlanId, setActivePlanId] = useState(() => getDefaultPricingPlanId(getInitialPricingAudience()))
  const [expandedPlan, setExpandedPlan] = useState<PricingPlan | null>(null)
  const reducedMotion = useReducedMotion()

  const planSignals: Record<string, Array<{ label: string; value: number }>> = {
    'air-plan': [
      { label: 'Flex', value: 92 },
      { label: 'Privacy', value: 34 },
      { label: 'Commitment', value: 28 },
    ],
    'x-plan': [
      { label: 'Routine', value: 78 },
      { label: 'Community', value: 82 },
      { label: 'Commitment', value: 46 },
    ],
    'virtual-office': [
      { label: 'Presence', value: 86 },
      { label: 'Remote fit', value: 88 },
      { label: 'Room use', value: 42 },
    ],
    'after-hours': [
      { label: 'Access', value: 94 },
      { label: 'Routine', value: 36 },
      { label: 'Night work', value: 84 },
    ],
    'box-plan': [
      { label: 'Privacy', value: 86 },
      { label: 'Focus', value: 78 },
      { label: 'Scale', value: 58 },
    ],
    'enterprise-plan': [
      { label: 'Control', value: 92 },
      { label: 'Scale', value: 88 },
      { label: 'Support', value: 76 },
    ],
    'custom-fit-outs': [
      { label: 'Tailoring', value: 96 },
      { label: 'Brand fit', value: 88 },
      { label: 'Scale', value: 82 },
    ],
  }

  const audiencePlans = pricingPlans.filter((plan) => plan.audience === activeAudience)
  const featuredPlan = audiencePlans.find((plan) => plan.id === activePlanId) ?? audiencePlans[0] ?? pricingPlans[0]
  const activeMeta = pricingAudienceMeta[activeAudience]

  const handleAudienceChange = useCallback(
    (audience: PricingPlan['audience']) => {
      onAudienceChange(audience)
      setActivePlanId(getDefaultPricingPlanId(audience))

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', audience === 'teams' ? '#plans-teams' : '#plans')
      }
    },
    [onAudienceChange],
  )

  useEffect(() => {
    const syncAudienceToHash = () => {
      if (window.location.hash === '#plans-teams') {
        onAudienceChange('teams')
        setActivePlanId(getDefaultPricingPlanId('teams'))
      }

      if (window.location.hash === '#plans' || window.location.hash === '#plans-individuals') {
        onAudienceChange('individuals')
        setActivePlanId(getDefaultPricingPlanId('individuals'))
      }
    }

    syncAudienceToHash()
    window.addEventListener('hashchange', syncAudienceToHash)

    return () => window.removeEventListener('hashchange', syncAudienceToHash)
  }, [onAudienceChange])

  useEffect(() => {
    if (!expandedPlan) return

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedPlan(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [expandedPlan])

  const renderSignalBars = (plan: PricingPlan) => (
    <div className="pricing-lab__signals" aria-label={`${plan.name} fit signals`}>
      {(planSignals[plan.id] ?? []).map((signal) => (
        <span key={signal.label}>
          <small>{signal.label}</small>
          <i>
            <b style={{ width: `${signal.value}%` }} />
          </i>
        </span>
      ))}
    </div>
  )

  const renderPlanCard = (plan: PricingPlan, index: number) => (
    <motion.button
      type="button"
      className={cn('pricing-lab-card', activePlanId === plan.id && 'is-active')}
      key={plan.id}
      onClick={() => setExpandedPlan(plan)}
      onFocus={() => setActivePlanId(plan.id)}
      onMouseEnter={() => setActivePlanId(plan.id)}
      style={{ '--plan-accent': plan.accent, '--plan-image-position': plan.imagePosition } as CSSProperties}
      initial={{ opacity: 0, y: 18, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.25 : 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.045, ease: 'easeOut' }}
      whileHover={{ y: -6, rotate: 0, transition: { duration: 0.22, ease: 'easeOut' } }}
    >
      <span className="pricing-lab-card__number">{String(index + 1).padStart(2, '0')}</span>
      <span className="pricing-lab-card__eyebrow">{plan.eyebrow}</span>
      <strong>{plan.name}</strong>
      <em>{plan.price}</em>
      <span className="pricing-lab-card__summary">{plan.summary}</span>
      <span className="pricing-lab-card__chips">
        {plan.details.slice(0, 3).map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
      </span>
      <span className="pricing-lab-card__cta">
        Inspect fit
        <ArrowIcon />
      </span>
    </motion.button>
  )

  return (
    <section
      className="pricing-lab"
      data-audience={activeAudience}
      id="plans"
      aria-labelledby="pricing-title"
      style={
        {
          '--pricing-accent': activeMeta.accent,
          '--pricing-soft': activeMeta.soft,
          '--pricing-bg': activeMeta.background,
          '--pricing-on-bg': activeMeta.onBackground,
        } as CSSProperties
      }
    >
      <span id="plans-individuals" className="pricing-lab__anchor" aria-hidden="true" />
      <span id="plans-teams" className="pricing-lab__anchor" aria-hidden="true" />

      <div className="pricing-lab__shell">
        <div className="pricing-lab__intro">
          <motion.div className="pricing-lab__headline" {...getRevealMotionProps(reducedMotion, { x: -26, y: 18, duration: 0.86 })}>
            <motion.div
              className="section-kicker"
              {...getRevealMotionProps(reducedMotion, { y: 12, duration: 0.6, delay: 0.04 })}
            >
              Plans and pricing
            </motion.div>
            <h2 id="pricing-title">Choose the amount of room your workday needs.</h2>
            <p>
              No pricing maze, no office jargon. Start with the way you work, then let the plan show how much privacy, rhythm, and support you actually need.
            </p>
          </motion.div>

          <div className="pricing-lab__switcher" role="tablist" aria-label="Pricing audience">
            {(['individuals', 'teams'] as const).map((audience) => (
              <button
                key={audience}
                type="button"
                role="tab"
                aria-selected={activeAudience === audience}
                className={cn(activeAudience === audience && 'is-active')}
                onClick={() => handleAudienceChange(audience)}
              >
                <span>{pricingAudienceMeta[audience].eyebrow}</span>
                <strong>{pricingAudienceMeta[audience].title}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="pricing-lab__stage">
          <AnimatePresence mode="wait">
            <motion.aside
              key={featuredPlan.id}
              className="pricing-lab__feature"
              style={{ '--plan-accent': featuredPlan.accent } as CSSProperties}
              initial={{ opacity: 0, y: 18, rotate: -0.6 }}
              animate={{ opacity: 1, y: 0, rotate: -0.25 }}
              exit={{ opacity: 0, y: -12, rotate: 0.4 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
            >
              <div className="pricing-lab__feature-glow" aria-hidden="true" />
              <div className="pricing-lab__feature-meta">
                <span>{activeMeta.title} path</span>
                <small>{featuredPlan.price}</small>
              </div>

              <div className="pricing-lab__feature-copy">
                <span>{featuredPlan.eyebrow}</span>
                <h3>{featuredPlan.name}</h3>
                <p>{featuredPlan.fit}</p>
              </div>

              {renderSignalBars(featuredPlan)}

              <div className="pricing-lab__feature-actions">
                <button type="button" className="primary-cta" onClick={() => setExpandedPlan(featuredPlan)}>
                  View plan
                  <ArrowIcon />
                </button>
                <a href="#book-tour">
                  Book a tour
                  <ArrowIcon />
                </a>
              </div>
            </motion.aside>
          </AnimatePresence>

          <div className="pricing-lab__board">
            <div className="pricing-lab__board-note">
              <span>{activeMeta.eyebrow}</span>
              <p>{activeMeta.lead}</p>
              <strong>{activeMeta.note}</strong>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeAudience}
                className="pricing-lab__cards"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <svg className="pricing-lab__sketch" viewBox="0 0 900 180" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M-20 112 C108 40 204 154 330 96 C472 30 594 128 734 74 C806 46 858 54 930 86" />
                </svg>
                {audiencePlans.map((plan, index) => renderPlanCard(plan, index))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="pricing-lab__footer">
          <span>Pricing here is a starting guide. Branch-specific adjustments may apply.</span>
          <a href="#book-tour">
            Let Work Hall recommend a setup
            <ArrowIcon />
          </a>
        </div>
      </div>

      {expandedPlan && (
        <div className="pricing-modal" role="dialog" aria-modal="true" aria-labelledby="pricing-modal-title">
          <button
            type="button"
            className="pricing-modal__backdrop"
            aria-label="Close pricing details"
            onClick={() => setExpandedPlan(null)}
          />
          <article
            className="pricing-modal__card"
            style={{ '--plan-accent': expandedPlan.accent } as CSSProperties}
          >
            <button
              type="button"
              className="pricing-modal__close"
              aria-label="Close pricing details"
              onClick={() => setExpandedPlan(null)}
            >
              x
            </button>
            <span className="pricing-card__eyebrow">{expandedPlan.eyebrow}</span>
            <h3 id="pricing-modal-title">{expandedPlan.name}</h3>
            <strong>{expandedPlan.price}</strong>
            <p>{expandedPlan.summary}</p>
            <p>{expandedPlan.fit}</p>
            <div className="pricing-modal__details">
              {expandedPlan.details.map((detail) => (
                <span key={detail}>
                  <CheckIcon />
                  {detail}
                </span>
              ))}
            </div>
            <a href="#book-tour" className="primary-cta" onClick={() => setExpandedPlan(null)}>
              Start with this plan
              <ArrowIcon />
            </a>
          </article>
        </div>
      )}
    </section>
  )
}
