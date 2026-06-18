import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import './App.css'
import { pricingAudienceMeta } from './data/siteContent'
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll'
import type { HeroVariant, PricingPlan } from './types/site'
import { EditorialHero, ClassicHero, HeroAmenitiesBento, HeroReviewSwitch } from './components/hero/HeroSections'
import { getInitialHeroVariant, shouldShowHeroReviewSwitch } from './lib/heroConfig'
import { WorkHallNav } from './components/layout/WorkHallNav'
import { SiteFooter } from './components/layout/SiteFooter'
import { LocationsMapSection } from './components/locations/LocationsMapSection'
import { PricingPlansCarousel } from './components/pricing/PricingPlansCarousel'
import { MembershipSection } from './components/sections/MembershipSection'
import { WorkspaceServicesSection } from './components/sections/WorkspaceServicesSection'
import { ClickSpark, Waves } from './components/shared/effects'

function getInitialPricingAudience(): PricingPlan['audience'] {
  if (typeof window === 'undefined') return 'individuals'
  return window.location.hash === '#plans-teams' ? 'teams' : 'individuals'
}

function App() {
  const [heroVariant, setHeroVariant] = useState<HeroVariant>(getInitialHeroVariant)
  const [pricingAudience, setPricingAudience] = useState<PricingPlan['audience']>(getInitialPricingAudience)
  const [showHeroReviewSwitch] = useState(shouldShowHeroReviewSwitch)
  const [lowerHalfVisible, setLowerHalfVisible] = useState(false)
  const lowerHalfRef = useRef<HTMLDivElement>(null)
  useLenisSmoothScroll()
  const pricingTheme = pricingAudienceMeta[pricingAudience]

  useEffect(() => {
    const el = lowerHalfRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setLowerHalfVisible(entry.isIntersecting), { rootMargin: '0px 0px -10% 0px', threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const updateHeroVariant = (nextVariant: HeroVariant) => {
    setHeroVariant(nextVariant)
    window.localStorage.setItem('workhall-hero-variant', nextVariant)
    const url = new URL(window.location.href)
    url.searchParams.set('hero', nextVariant)
    if (showHeroReviewSwitch) url.searchParams.set('heroReview', '1')
    window.history.replaceState(null, '', url)
  }

  return (
    <ClickSpark sparkColor="#d96b43" sparkSize={7} sparkRadius={10} sparkCount={9} duration={460}>
      <main id="home" className="site-shell">
        <Waves className="site-waves" lineColor="rgba(217, 107, 67, 0.38)" backgroundColor="rgba(246, 232, 204, 0.55)" waveSpeedX={0.02} waveSpeedY={0.01} waveAmpX={46} waveAmpY={24} friction={0.9} tension={0.01} maxCursorMove={120} xGap={11} yGap={34} paused={lowerHalfVisible} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
        <div className="site-nav-wrap">
          <WorkHallNav />
          {showHeroReviewSwitch && <HeroReviewSwitch variant={heroVariant} onChange={updateHeroVariant} />}
        </div>
        {heroVariant === 'editorial' ? <EditorialHero /> : <ClassicHero />}
        <HeroAmenitiesBento />
        <MembershipSection />
        <div ref={lowerHalfRef} className="lower-half" data-audience={pricingAudience} style={{ '--pricing-accent': pricingTheme.accent, '--pricing-soft': pricingTheme.soft, '--pricing-bg': pricingTheme.background, '--pricing-on-bg': pricingTheme.onBackground } as CSSProperties}>
          <Waves className="lower-half-waves" lineColor={pricingAudience === 'teams' ? 'rgba(217, 107, 67, 0.22)' : 'rgba(0, 0, 0, 0.12)'} backgroundColor="transparent" waveSpeedX={0.015} waveSpeedY={0.008} waveAmpX={38} waveAmpY={20} friction={0.9} tension={0.008} maxCursorMove={100} xGap={12} yGap={36} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
          <section className="pricing-chapter"><PricingPlansCarousel activeAudience={pricingAudience} onAudienceChange={setPricingAudience} /></section>
          <WorkspaceServicesSection />
          <LocationsMapSection />
          <SiteFooter />
        </div>
      </main>
    </ClickSpark>
  )
}

export default App


