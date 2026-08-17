import { AnimatePresence, motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { navGroups } from '../../data/siteContent'
import type { NavFeature, NavGroup } from '../../types/site'
import { ArrowIcon, NavGlyph } from '../shared/icons'
import workhallOrange from '../../assets/workhall-orange.svg'
import { useLocation } from 'react-router-dom'

type FigmaNavGroup = NavGroup & { visualLabel: string }

const spacesGroup = navGroups.find((group) => group.id === 'spaces')
const locationsGroup = navGroups.find((group) => group.id === 'locations')
const companyGroup = navGroups.find((group) => group.id === 'company')
const contactGroup = navGroups.find((group) => group.id === 'contact')

if (!spacesGroup || !locationsGroup || !companyGroup || !contactGroup) {
  throw new Error('Required nav groups are missing.')
}

const communityItems = companyGroup.items.filter((item) =>
  ['Community', 'Workspace Services', 'Partners', 'Events', 'Support', 'Privacy Policy'].includes(item.title),
)

const whyWorkHallItems = companyGroup.items.filter((item) =>
  ['Why Work Hall', 'Workspace Services', 'Community', 'Events', 'Partners', 'Support'].includes(item.title),
)

const membersItems = contactGroup.items.filter((item) =>
  ["Member's Lounge", 'Help and FAQs', 'Quick call', 'Email the team', 'Contact Us', 'Partner With Us'].includes(item.title),
)

const figmaNavGroups: FigmaNavGroup[] = [
  { ...spacesGroup, visualLabel: 'Plans' },
  { ...locationsGroup, visualLabel: 'Locations' },
  {
    ...companyGroup,
    id: 'community-visual',
    visualLabel: 'Community',
    featured: communityItems[0] ?? companyGroup.featured,
    items: communityItems,
  },
  {
    ...companyGroup,
    id: 'why-visual',
    visualLabel: 'Why WorkHall',
    featured: companyGroup.items.find((item) => item.title === 'Why Work Hall') ?? companyGroup.featured,
    items: whyWorkHallItems,
  },
  { ...contactGroup, id: 'contact-visual', visualLabel: 'Contact Us' },
  {
    ...contactGroup,
    id: 'members-visual',
    visualLabel: "Member's Lounge",
    featured: contactGroup.items.find((item) => item.title === "Member's Lounge") ?? contactGroup.featured,
    items: membersItems,
  },
]

function DownArrowBadge() {
  return (
    <span className="figma-nav__badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 5v14" />
        <path d="m7 14 5 5 5-5" />
      </svg>
    </span>
  )
}

const resolveSiteHref = (href: string, pathname: string) =>
  href.startsWith('#') && pathname !== '/' ? `/${href}` : href

function FigmaFeatureCard({ feature, variant, onClick, pathname }: { feature: NavFeature; variant: 'hero' | 'large' | 'small' | 'rail'; onClick: () => void; pathname: string }) {
  return (
    <a href={resolveSiteHref(feature.href, pathname)} className={`figma-feature-card figma-feature-card--${variant}`} style={{ '--nav-image-position': feature.imagePosition ?? 'center' } as CSSProperties} onClick={onClick}>
      <span className="figma-feature-card__image" aria-hidden="true" />
      <span className="figma-feature-card__content">
        <span className="figma-feature-card__top">
          <NavGlyph name={feature.icon} />
          {feature.meta && <em>{feature.meta}</em>}
        </span>
        <strong>{feature.title}</strong>
        <small>{feature.detail}</small>
      </span>
      {variant !== 'rail' && <span className="figma-feature-card__arrow" aria-hidden="true"><ArrowIcon /></span>}
    </a>
  )
}

export function FigmaFunctionalNav({ isLoaded }: { isLoaded: boolean }) {
  const { pathname } = useLocation()
  const [openGroupId, setOpenGroupId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [dropdownLeft, setDropdownLeft] = useState(0)

  const activeGroup = useMemo(
    () => figmaNavGroups.find((group) => group.id === openGroupId) ?? null,
    [openGroupId],
  )

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroupId(null)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenGroupId(null)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    if (!openGroupId || !navRef.current || !dropdownRef.current) return

    const navBounds = navRef.current.getBoundingClientRect()
    const trigger = triggerRefs.current[openGroupId]
    if (!trigger) return

    const triggerBounds = trigger.getBoundingClientRect()
    const dropdownWidth = dropdownRef.current.offsetWidth
    const idealLeft = triggerBounds.left - navBounds.left
    const maxLeft = Math.max(0, navBounds.width - dropdownWidth)
    setDropdownLeft(Math.min(Math.max(0, idealLeft), maxLeft))
  }, [openGroupId])

  return (
    <header ref={navRef} className={isLoaded ? 'figma-nav-layer is-loaded' : 'figma-nav-layer'} aria-label="Main navigation">
      <div className="figma-nav__mobile-bar">
        <a href={pathname === '/' ? '#top' : '/'} className="figma-nav__mobile-brand" aria-label="WorkHall home">
          <img src={workhallOrange} alt="WorkHall" />
        </a>
        <button
          type="button"
          className={isMobileMenuOpen ? 'figma-nav__mobile-toggle is-open' : 'figma-nav__mobile-toggle'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="figma-mobile-nav"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className="figma-nav navbar" aria-label="Primary">
        {figmaNavGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={openGroupId === group.id ? 'figma-nav__item nav-pill is-open' : 'figma-nav__item nav-pill'}
            aria-expanded={openGroupId === group.id}
            ref={(node) => {
              triggerRefs.current[group.id] = node
            }}
            onClick={() => setOpenGroupId((current) => (current === group.id ? null : group.id))}
          >
            <span>{group.visualLabel}</span>
            <DownArrowBadge />
          </button>
        ))}
      </nav>
      <a href={resolveSiteHref('#virtual-tour', pathname)} className="figma-nav__tour virtual-tour-btn">
        Virtual Tour
      </a>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="figma-mobile-nav"
            className="figma-nav__mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="figma-nav__mobile-list">
              {figmaNavGroups.map((group) => (
                <div key={group.id} className="figma-nav__mobile-group">
                  <button
                    type="button"
                    className={openGroupId === group.id ? 'figma-nav__mobile-item is-open' : 'figma-nav__mobile-item'}
                    aria-expanded={openGroupId === group.id}
                    onClick={() => setOpenGroupId((current) => (current === group.id ? null : group.id))}
                  >
                    <span>{group.visualLabel}</span>
                    <DownArrowBadge />
                  </button>
                  <AnimatePresence initial={false}>
                    {openGroupId === group.id && (
                      <motion.div
                        className="figma-nav__mobile-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        {[group.featured, ...group.items].slice(0, 6).map((item) => (
                          <a
                            key={`${group.id}-${item.title}`}
                            href={resolveSiteHref(item.href, pathname)}
                            className="figma-nav__mobile-link"
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              setOpenGroupId(null)
                            }}
                          >
                            <strong>{item.title}</strong>
                            <small>{item.detail}</small>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <a
              href={resolveSiteHref('#virtual-tour', pathname)}
              className="figma-nav__mobile-tour"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Virtual Tour
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGroup && (
          <motion.div
            ref={dropdownRef}
            key={activeGroup.id}
            className="figma-nav__dropdown"
            style={{ left: dropdownLeft }}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="figma-nav__main-panel">
              <FigmaFeatureCard feature={activeGroup.featured} variant="hero" pathname={pathname} onClick={() => setOpenGroupId(null)} />
              {activeGroup.items.slice(0, 1).map((item) => (
                <FigmaFeatureCard key={item.title} feature={item} variant="large" pathname={pathname} onClick={() => setOpenGroupId(null)} />
              ))}
              <div className="figma-nav__small-row">
                {activeGroup.items.slice(1, 4).map((item) => (
                  <FigmaFeatureCard key={item.title} feature={item} variant="small" pathname={pathname} onClick={() => setOpenGroupId(null)} />
                ))}
              </div>
            </div>
            <aside className="figma-nav__rail" aria-label={`${activeGroup.visualLabel} quick links`}>
              {activeGroup.items.slice(4, 7).map((item) => (
                <FigmaFeatureCard key={item.title} feature={item} variant="rail" pathname={pathname} onClick={() => setOpenGroupId(null)} />
              ))}
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
