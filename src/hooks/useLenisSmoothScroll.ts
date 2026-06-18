import { useEffect } from 'react'
import Lenis from 'lenis'

const lenisPreventSelector = [
  '[data-lenis-prevent]',
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '.site-nav__dropdown',
  '.booking-popover__panel',
  '.branch-menu__panel',
  '.enquiry-modal',
  '.pricing-modal',
  '.workhall-map',
  '.maplibregl-map',
  '.maplibregl-canvas',
].join(', ')

export function useLenisSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.15 : 1.05,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      anchors: true,
      prevent: (node) => Boolean(node.closest(lenisPreventSelector)),
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}

