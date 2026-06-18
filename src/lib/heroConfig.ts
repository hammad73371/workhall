import type { HeroVariant } from '../types/site'

export function getInitialHeroVariant(): HeroVariant {
  if (typeof window === 'undefined') return 'editorial'
  const params = new URLSearchParams(window.location.search)
  const requestedVariant = params.get('hero')
  if (requestedVariant === 'classic' || requestedVariant === 'editorial') return requestedVariant
  const storedVariant = window.localStorage.getItem('workhall-hero-variant')
  if (storedVariant === 'classic' || storedVariant === 'editorial') return storedVariant
  return 'editorial'
}

export function shouldShowHeroReviewSwitch() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return import.meta.env.DEV || params.get('heroReview') === '1' || params.has('hero')
}

