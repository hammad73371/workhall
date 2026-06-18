import { AnimatePresence, motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { navGroups } from '../../data/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getEnterMotionProps } from '../../lib/siteMotion'
import type { NavFeature } from '../../types/site'
import { ArrowIcon, ChevronIcon, CloseIcon, NavGlyph, NavMenuIcon } from '../shared/icons'

function NavFeatureCard({ feature, variant, onClick }: { feature: NavFeature; variant: 'hero' | 'large' | 'small' | 'rail'; onClick: () => void }) {
  return (
    <a href={feature.href} className={`nav-feature-card nav-feature-card--${variant}`} style={{ '--nav-image-position': feature.imagePosition ?? 'center' } as CSSProperties} onClick={onClick}>
      <span className="nav-feature-card__image" aria-hidden="true" />
      <span className="nav-feature-card__content">
        <span className="nav-feature-card__top">
          <NavGlyph name={feature.icon} />
          {feature.meta && <em>{feature.meta}</em>}
        </span>
        <strong>{feature.title}</strong>
        <small>{feature.detail}</small>
      </span>
      {variant !== 'rail' && <span className="nav-feature-card__arrow" aria-hidden="true"><ArrowIcon /></span>}
    </a>
  )
}

export function WorkHallNav() {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(navGroups[0]?.id ?? null)
  const navRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const activeGroup = navGroups.find((group) => group.id === openGroup)

  useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null)
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenGroup(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointer)
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header ref={navRef} className="site-nav" aria-label="Main navigation" {...getEnterMotionProps(reducedMotion, { y: -22, duration: 0.84, delay: 0.08 })}>
      <div className="site-nav__desktop">
        <div className="site-nav__menu">
          {navGroups.map((group) => (
            <div key={group.id} className={`site-nav__item ${openGroup === group.id ? 'is-open' : ''}`}>
              <button type="button" className="site-nav__trigger" aria-expanded={openGroup === group.id} onClick={() => setOpenGroup((currentGroup) => (currentGroup === group.id ? null : group.id))}>
                <NavGlyph name={group.icon} />
                {group.label}
                <ChevronIcon open={openGroup === group.id} />
              </button>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activeGroup && (
            <motion.div key={activeGroup.id} className={`site-nav__dropdown site-nav__dropdown--${activeGroup.id}`} initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.98 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
              <div className="site-nav__main-panel">
                <NavFeatureCard feature={activeGroup.featured} variant="hero" onClick={() => setOpenGroup(null)} />
                {activeGroup.items.slice(0, 1).map((item) => <NavFeatureCard key={item.title} feature={item} variant="large" onClick={() => setOpenGroup(null)} />)}
                <div className="site-nav__small-row">
                  {activeGroup.items.slice(1, 4).map((item) => <NavFeatureCard key={item.title} feature={item} variant="small" onClick={() => setOpenGroup(null)} />)}
                </div>
              </div>
              <aside className="site-nav__rail" aria-label={`${activeGroup.label} quick links`}>
                {activeGroup.items.slice(4, 7).map((item) => <NavFeatureCard key={item.title} feature={item} variant="rail" onClick={() => setOpenGroup(null)} />)}
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="site-nav__actions">
        <a href="#virtual-tour" className="nav-tour">Virtual Tour<ArrowIcon /></a>
        <button type="button" className="site-nav__mobile-toggle" aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen((currentState) => !currentState)}>
          {mobileOpen ? <CloseIcon /> : <NavMenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="mobile-nav__backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
            <motion.div className="mobile-nav__panel" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', damping: 28, stiffness: 320 }}>
              <div className="mobile-nav__header">
                <span className="mobile-nav__label">Menu</span>
                <button type="button" className="mobile-nav__close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><CloseIcon /></button>
              </div>
              <div className="mobile-nav__body">
                {navGroups.map((group) => (
                  <div key={group.id} className={`mobile-nav__group ${openMobileGroup === group.id ? 'is-open' : ''}`}>
                    <button type="button" className="mobile-nav__group-trigger" onClick={() => setOpenMobileGroup((currentGroup) => (currentGroup === group.id ? null : group.id))}>
                      <span><NavGlyph name={group.icon} />{group.label}</span>
                      <ChevronIcon open={openMobileGroup === group.id} />
                    </button>
                    {openMobileGroup === group.id && <div className="mobile-nav__group-panel"><NavFeatureCard feature={group.featured} variant="rail" onClick={() => setMobileOpen(false)} />{group.items.map((item) => <NavFeatureCard key={item.title} feature={item} variant="rail" onClick={() => setMobileOpen(false)} />)}</div>}
                  </div>
                ))}
              </div>
              <div className="mobile-nav__footer"><a href="#virtual-tour" className="nav-tour" onClick={() => setMobileOpen(false)}>Virtual Tour<ArrowIcon /></a></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

