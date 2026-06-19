export type BookingPanel = 'location' | 'seats'

export type PricingPlan = {
  id: string
  name: string
  eyebrow: string
  price: string
  summary: string
  fit: string
  details: string[]
  accent: string
  audience: 'individuals' | 'teams'
  imagePosition: string
}

export type NavIconName =
  | 'grid'
  | 'briefcase'
  | 'door'
  | 'users'
  | 'map'
  | 'pin'
  | 'route'
  | 'star'
  | 'handshake'
  | 'file'
  | 'shield'
  | 'help'
  | 'phone'
  | 'calendar'
  | 'mail'
  | 'key'
  | 'clock'

export type NavFeature = {
  title: string
  href: string
  detail: string
  meta?: string
  icon: NavIconName
  imagePosition?: string
}

export type NavGroup = {
  id: string
  label: string
  icon: NavIconName
  eyebrow: string
  title: string
  description: string
  featured: NavFeature
  items: NavFeature[]
}

export type WorkHallLocation = {
  id: string
  name: string
  area: string
  address: string
  coordinates: [number, number]
  mapsUrl: string
  status: 'live' | 'mock'
  note: string
}

export type UserCoordinates = {
  longitude: number
  latitude: number
}

export type GeolocationStatus = 'idle' | 'loading' | 'located' | 'blocked' | 'unsupported'

export type HeroVariant = 'editorial' | 'classic'
