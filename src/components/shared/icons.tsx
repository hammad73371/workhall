import type { ReactNode } from 'react'
import type { NavIconName } from '../../types/site'

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

export function CoworkingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18h16" />
      <path d="M6 7.5h12A1.5 1.5 0 0 1 19.5 9v6H4.5V9A1.5 1.5 0 0 1 6 7.5Z" />
      <path d="M9 18h6" />
    </svg>
  )
}

export function OfficeSuiteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 19V5.6A1.6 1.6 0 0 1 7.6 4H18v15" />
      <path d="M10 12h.01" />
      <path d="M4 19h16" />
    </svg>
  )
}

export function MeetingRoomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M8 19h8" />
      <path d="M10 17v2" />
      <path d="M14 17v2" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

export function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={open ? 'icon icon--open' : 'icon'}>
      <path d="m7 10 5 5 5-5" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

export function LocateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <circle cx="12" cy="12" r="5" />
    </svg>
  )
}

export function NavMenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function NavGlyph({ name }: { name: NavIconName }) {
  const paths: Record<NavIconName, ReactNode> = {
    grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><path d="M16.5 14v5" /><path d="M14 16.5h5" /></>,
    briefcase: <><path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" /><rect x="4" y="7" width="16" height="12" rx="2" /><path d="M4 12h16" /><path d="M10 12v1.2h4V12" /></>,
    door: <><path d="M6 20V5.5A1.5 1.5 0 0 1 7.5 4H18v16" /><path d="M10 12h.01" /><path d="M4 20h16" /></>,
    users: <><path d="M16 20v-1.8c0-1.8-1.7-3.2-4-3.2s-4 1.4-4 3.2V20" /><circle cx="12" cy="9" r="3" /><path d="M20 19v-1.4c0-1.4-1.1-2.6-2.8-3" /><path d="M17 6.4a2.6 2.6 0 0 1 0 5.2" /></>,
    map: <><path d="m9 18-5 2V6l5-2 6 2 5-2v14l-5 2-6-2Z" /><path d="M9 4v14" /><path d="M15 6v14" /></>,
    pin: <><path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3.5a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h6" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    handshake: <><path d="m8 12 2.2-2.2a2.7 2.7 0 0 1 3.8 0l.5.5" /><path d="m14 10 2 2a2.8 2.8 0 0 1 0 4l-2.2 2.2a2.7 2.7 0 0 1-3.8 0L8 16" /><path d="m4 12 4 4" /><path d="m20 12-4 4" /></>,
    file: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></>,
    shield: <><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.7 2.7 0 0 1 5.1 1.2c0 2-2.6 2.1-2.6 4" /><path d="M12 18h.01" /></>,
    phone: <path d="M22 16.8v2.4a2 2 0 0 1-2.2 2 18.9 18.9 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.9 18.9 0 0 1 3 4.3 2 2 0 0 1 5 2.1h2.4a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1l-1 1a15 15 0 0 0 5.7 5.7l1-1a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />,
    calendar: <><path d="M8 2v4" /><path d="M16 2v4" /><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></>,
    key: <><circle cx="7.5" cy="14.5" r="3.5" /><path d="M10 12 21 1" /><path d="m15 6 3 3" /><path d="m17 4 3 3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-glyph">
      {paths[name]}
    </svg>
  )
}


