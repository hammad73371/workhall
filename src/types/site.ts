export type BookingPanel = 'location' | 'seats'
export type WorkspaceQuizAnswerKey = 'workspaceType' | 'teamSize' | 'locationId' | 'timeline'
export type WorkspaceTypeValue =
  | 'coworking-desk'
  | 'dedicated-desk'
  | 'private-office'
  | 'meeting-room'
  | 'virtual-office'
export type TeamSizeValue = 'solo' | '2-people' | '3-5-people' | '6-12-people' | '12-plus-people'
export type MoveInTimelineValue = 'this-week' | 'this-month' | 'next-2-3-months' | 'just-exploring'
export type QuizGlyphName =
  | 'coworking'
  | 'dedicated-desk'
  | 'private-office'
  | 'meeting-room'
  | 'virtual-office'
  | 'solo'
  | 'pair'
  | 'team-small'
  | 'team-medium'
  | 'team-large'
  | 'location'
  | 'week'
  | 'month'
  | 'later'
  | 'explore'

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
}

export type LocationWorkspace = {
  title: string
  description: string
  bestFor: string
}

export type LocationPageContent = WorkHallLocation & {
  eyebrow: string
  headline: string
  introduction: string
  businessFocus: string
  branchDetail?: string
  branchNote: string
  accent: string
  secondaryAccent: string
  heroImage: string
  heroImagePosition?: string
  gallery: Array<{ src: string; alt: string; position?: string }>
  highlights: Array<{ value: string; label: string }>
  workspaces: LocationWorkspace[]
  amenities: string[]
  accessNotes: string[]
}

export type WorkspaceQuizOption<TValue extends string = string> = {
  value: TValue
  label: string
  icon: QuizGlyphName
}

export type WorkspaceQuizStep = {
  key: WorkspaceQuizAnswerKey
  prompt: string
  options: WorkspaceQuizOption[]
}

export type WorkspaceQuizAnswers = {
  workspaceType: WorkspaceTypeValue | null
  teamSize: TeamSizeValue | null
  locationId: WorkHallLocation['id'] | null
  timeline: MoveInTimelineValue | null
}

export type UserCoordinates = {
  longitude: number
  latitude: number
}

export type GeolocationStatus = 'idle' | 'loading' | 'located' | 'blocked' | 'unsupported'

export type HeroVariant = 'editorial' | 'classic'
