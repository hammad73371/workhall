import { motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { heroAmenities, heroWords } from '../../data/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getEnterMotionProps, getRevealMotionProps } from '../../lib/siteMotion'
import type { HeroVariant } from '../../types/site'
import { BookingConcierge } from '../booking/BookingConcierge'
import { RotatingText } from '../shared/effects'
import { ArrowIcon } from '../shared/icons'

function HandDrawnTitle() {
  return (
    <div className="hand-title" aria-label="Re-think Your Workspace">
      <svg viewBox="0 0 1200 600" className="hand-title__ring" aria-hidden="true">
        <path className="hand-title__stroke" d="M 950 90 C 1250 300, 1050 480, 600 520 C 250 520, 150 480, 150 300 C 150 120, 350 80, 600 80 C 850 80, 950 180, 950 180" />
      </svg>
      <h1 id="hero-title"><span>Re-think</span><em>Your Workspace</em></h1>
    </div>
  )
}

function AnimatedMetric({ value, label, suffix = '', delay, color, formatter }: { value: number; label: string; suffix?: string; delay: number; color: string; formatter?: (value: number) => string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    if (reducedMotion) return
    let animationFrame = 0
    let startTime = 0
    const duration = 1600
    const timer = window.setTimeout(() => {
      const tick = (time: number) => {
        if (!startTime) startTime = time
        const progress = Math.min((time - startTime) / duration, 1)
        const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
        setCount(Math.round(value * eased))
        if (progress < 1) animationFrame = window.requestAnimationFrame(tick)
      }
      animationFrame = window.requestAnimationFrame(tick)
    }, delay)
    return () => { window.clearTimeout(timer); window.cancelAnimationFrame(animationFrame) }
  }, [delay, isVisible, reducedMotion, value])

  const visibleCount = reducedMotion && isVisible ? value : count
  const displayValue = formatter ? formatter(visibleCount) : String(visibleCount)

  return <div ref={ref} className="metric" style={{ '--metric-color': color } as CSSProperties}><strong>{displayValue}{suffix}</strong><span>{label}</span></div>
}

export function MetricsStrip() {
  return (
    <div className="metrics-strip" aria-label="Work Hall impact numbers">
      <AnimatedMetric value={6} label="Locations" delay={100} color="#2f8d71" formatter={(value) => value.toString().padStart(2, '0')} />
      <AnimatedMetric value={7} label="Years" suffix="+" delay={240} color="#d26d45" formatter={(value) => value.toString().padStart(2, '0')} />
      <AnimatedMetric value={800} label="Seats" suffix="+" delay={380} color="#315aa8" />
      <AnimatedMetric value={40000} label="Sq. ft. area" suffix="+" delay={520} color="#8c8867" formatter={(value) => `${Math.round(value / 1000)}k`} />
    </div>
  )
}


export function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null)
  const handleVisualMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = visualRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12
    node.style.setProperty('--tilt-x', `${y * -1}deg`)
    node.style.setProperty('--tilt-y', `${x}deg`)
    node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }
  const resetVisualMove = () => {
    const node = visualRef.current
    if (!node) return
    node.style.setProperty('--tilt-x', '0deg')
    node.style.setProperty('--tilt-y', '0deg')
  }
  return <div ref={visualRef} className="hero-visual" onMouseMove={handleVisualMove} onMouseLeave={resetVisualMove} aria-label="Work Hall coworking lounge preview"><img src="/cowork.jpg" alt="Work Hall coworking space interior" /></div>
}

export function ClassicHero() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-panel hero-panel--copy"><div className="hero-copy"><HandDrawnTitle /><MetricsStrip /><p className="hero-lede">With Pakistan&apos;s most flexible coworking spaces, open 24/7 across 6 locations. Built for the way you actually work, not the way an office thinks you should.</p><div className="hero-cta-row"><a href="#book-tour" className="primary-cta">Book My Tour<ArrowIcon /></a><a href="#locations" className="secondary-cta">Explore Locations</a></div></div></div>
      <div className="hero-panel hero-panel--visual"><HeroVisual /></div>
    </section>
  )
}

export function EditorialHero() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="hero" className="editorial-hero" aria-labelledby="hero-title">
      <motion.div className="editorial-hero__copy" {...getEnterMotionProps(reducedMotion, { x: -28, y: 20, duration: 0.9 })}>
        <motion.div className="section-kicker" {...getEnterMotionProps(reducedMotion, { y: 14, duration: 0.62, delay: 0.06 })}>Karachi coworking spaces</motion.div>
        <motion.h1 id="hero-title" {...getEnterMotionProps(reducedMotion, { y: 22, duration: 0.86, delay: 0.12 })}>Your workday deserves a room for <RotatingText texts={heroWords} mainClassName="editorial-hero__rotating-word" splitLevelClassName="editorial-hero__rotating-group" elementLevelClassName="editorial-hero__rotating-letter" staggerFrom="last" staggerDuration={0.018} rotationInterval={2400} transition={{ type: 'spring', damping: 30, stiffness: 420 }} /></motion.h1>
        <motion.p {...getEnterMotionProps(reducedMotion, { y: 18, duration: 0.78, delay: 0.18 })}>With Pakistan&apos;s most flexible coworking spaces, open 24/7, across 6 locations. All built for the way you actually work, not the way an office thinks you should.</motion.p>
        <motion.div className="editorial-hero__concierge" id="book-tour" aria-label="Workspace concierge" {...getEnterMotionProps(reducedMotion, { y: 22, duration: 0.8, delay: 0.24 })}><BookingConcierge variant="hero" /></motion.div>
      </motion.div>
      <motion.div className="editorial-hero__visual" aria-label="Work Hall interior preview" {...getEnterMotionProps(reducedMotion, { x: 34, y: 24, duration: 0.96, delay: 0.1, scale: 0.97 })}>
        <motion.div className="editorial-hero__photo-card" {...getEnterMotionProps(reducedMotion, { y: 18, duration: 0.86, delay: 0.14, scale: 0.985 })}><HeroVisual /></motion.div>
        <motion.div className="editorial-hero__proof-card" {...getEnterMotionProps(reducedMotion, { y: 18, duration: 0.76, delay: 0.28 })}><span>Proof of scale</span><MetricsStrip /></motion.div>
        <motion.div className="editorial-hero__note" {...getEnterMotionProps(reducedMotion, { y: 16, duration: 0.74, delay: 0.34 })}><span>Open 24/7</span><strong>Walk in with your laptop. Leave the office ops to us.</strong></motion.div>
      </motion.div>
    </section>
  )
}

export function HeroAmenitiesBento() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="hero-amenities" aria-labelledby="amenities-title">
      <div className="hero-amenities__intro">
        <motion.div {...getRevealMotionProps(reducedMotion, { y: 24, duration: 0.82 })}>
          <motion.div className="section-kicker" {...getRevealMotionProps(reducedMotion, { y: 12, duration: 0.62, delay: 0.04 })}>Quiet operational extras</motion.div>
          <motion.h2 id="amenities-title" {...getRevealMotionProps(reducedMotion, { y: 18, duration: 0.82, delay: 0.1 })}>The things you stop noticing because they simply work.</motion.h2>
          <motion.p className="hero-amenities__lead" {...getRevealMotionProps(reducedMotion, { y: 16, duration: 0.74, delay: 0.16 })}>Work Hall removes friction from the day: parking, access, layout, errands, and support are already handled before they turn into noise.</motion.p>
        </motion.div>
        <motion.aside className="hero-amenities__note" aria-label="Amenities note" {...getRevealMotionProps(reducedMotion, { x: 22, y: 14, duration: 0.76, delay: 0.18 })}><span>Work Hall basics, handled</span><p>The room, rhythm, access, and quiet operational extras are already in place when you arrive.</p></motion.aside>
      </div>
      <div className="hero-amenities__grid">
        {heroAmenities.map((amenity, index) => (
          <motion.article key={amenity.title.join(' ')} className={`hero-amenity-card hero-amenity-card--${amenity.variant}`} style={{ '--amenity-accent': amenity.accent } as CSSProperties} {...getRevealMotionProps(reducedMotion, { y: 26, duration: 0.78, delay: 0.08 + index * 0.06, amount: 0.1 })}>
            <span className="hero-amenity-card__number">{String(index + 1).padStart(2, '0')}</span>
            <span className="hero-amenity-card__eyebrow">{amenity.eyebrow}</span>
            <h3><span>{amenity.title[0]}</span><span>{amenity.title[1]}</span></h3>
            <p>{amenity.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function HeroReviewSwitch({ variant, onChange }: { variant: HeroVariant; onChange: (variant: HeroVariant) => void }) {
  return <div className="hero-review-switch" role="group" aria-label="Hero version review switch"><button type="button" className={variant === 'editorial' ? 'is-active' : ''} onClick={() => onChange('editorial')}>Editorial</button><button type="button" className={variant === 'classic' ? 'is-active' : ''} onClick={() => onChange('classic')}>Classic</button></div>
}


