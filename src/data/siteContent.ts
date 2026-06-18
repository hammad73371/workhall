import type { NavGroup, PricingPlan, WorkHallLocation } from '../types/site'

export const karachiCenter: [number, number] = [67.0647, 24.8607]
export const routeSourceId = 'workhall-route-source'
export const routeCasingLayerId = 'workhall-route-casing'
export const routeLayerId = 'workhall-route-line'

export const workHallLocations: WorkHallLocation[] = [
  {
    id: 'shahrah-e-faisal',
    name: 'Work Hall Shahrah-e-Faisal',
    area: 'Shahrah-e-Faisal',
    address: 'Shahrah-e-Faisal business corridor, Karachi',
    coordinates: [67.0637, 24.8611],
    mapsUrl: 'https://maps.app.goo.gl/8ciVzDstY5g133Pq5',
    status: 'live',
    note: 'Live branch from owner source',
  },
  {
    id: 'zamzama',
    name: 'Work Hall Zamzama',
    area: 'Zamzama',
    address: 'Zamzama, DHA Phase 5, Karachi',
    coordinates: [67.0452, 24.8136],
    mapsUrl: 'https://maps.app.goo.gl/biDCMD939KtiKkVp6',
    status: 'live',
    note: 'Live branch from owner source',
  },
  {
    id: 'tipu-sultan',
    name: 'Work Hall Tipu Sultan',
    area: 'Tipu Sultan',
    address: 'Tipu Sultan Road, Karachi',
    coordinates: [67.0796, 24.8687],
    mapsUrl: 'https://maps.app.goo.gl/N16BJZgzH9JMZCHy5',
    status: 'live',
    note: 'Live branch from owner source',
  },
  {
    id: 'pechs',
    name: 'Work Hall PECHS',
    area: 'PECHS',
    address: 'Mock pin around PECHS, Karachi',
    coordinates: [67.0673, 24.8658],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=PECHS%20Karachi',
    status: 'mock',
    note: 'Mock pin, needs agency confirmation',
  },
  {
    id: 'gulshan',
    name: 'Work Hall Gulshan',
    area: 'Gulshan',
    address: 'Mock pin around Gulshan-e-Iqbal, Karachi',
    coordinates: [67.0931, 24.9234],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan-e-Iqbal%20Karachi',
    status: 'mock',
    note: 'Mock pin, needs agency confirmation',
  },
]

export const locations = workHallLocations.map((location) => location.area)

export const workspaceTypes = [
  {
    name: 'Coworking Desk',
    price: 'From Rs 20,000/mo',
    details: ['Flexible seat', 'Fast internet', 'Community access'],
  },
  {
    name: 'Private Office',
    price: 'From Rs 50,000/mo',
    details: ['Move-in ready suite', 'Access control', 'Meeting room credits'],
  },
  {
    name: 'Meeting Room',
    price: 'Hourly booking',
    details: ['Presentation ready', 'Reception support', 'Tea and coffee add-ons'],
  },
]

export const navGroups: NavGroup[] = [
  {
    id: 'spaces',
    label: 'Spaces',
    icon: 'grid',
    eyebrow: 'Workspace menu',
    title: 'Choose the room your workday needs.',
    description: 'Flexible desks, private offices, meeting rooms, and custom suites without running an office yourself.',
    featured: {
      title: 'Start with the workspace guide',
      href: '#plans',
      detail: 'Compare desks, rooms, suites, and virtual office options in one place.',
      meta: 'Plans and fit',
      icon: 'grid',
      imagePosition: 'center 42%',
    },
    items: [
      { title: 'Coworking Desk', href: '#plans', detail: 'Flexible seat for founders and solo operators.', meta: 'From Rs 20,000/mo', icon: 'briefcase', imagePosition: '28% 50%' },
      { title: 'Private Office', href: '#plans', detail: 'Managed room for teams that need privacy.', meta: 'From Rs 50,000/mo', icon: 'door', imagePosition: '58% 48%' },
      { title: 'Meeting Room', href: '#plans', detail: 'Hourly rooms for reviews, pitches, and calls.', meta: 'Book by hour', icon: 'users', imagePosition: '72% 45%' },
      { title: 'Virtual Office', href: '#plans', detail: 'Business address with room access when needed.', meta: 'Remote-friendly', icon: 'mail', imagePosition: '42% 52%' },
      { title: 'Custom Fit-Outs', href: '#plans', detail: 'Tailored offices for agencies and growing teams.', meta: 'Custom pricing', icon: 'star', imagePosition: '62% 42%' },
      { title: 'After-hours Access', href: '#plans', detail: 'Weekend and non-standard work windows.', meta: 'Flexible access', icon: 'clock', imagePosition: '50% 38%' },
      { title: 'Enterprise Suites', href: '#plans', detail: 'Dedicated office paths for larger teams.', meta: 'Custom pricing', icon: 'door', imagePosition: '58% 44%' },
    ],
  },
  {
    id: 'locations',
    label: 'Locations',
    icon: 'map',
    eyebrow: 'Karachi network',
    title: 'Choose the branch that keeps your workday moving.',
    description: 'Live locations across Karachi with route guidance, Google Maps handoff, and room to switch branches as your week shifts.',
    featured: {
      title: 'Find the closest branch',
      href: '#locations',
      detail: 'Use the live map to rank branches by distance and open the best one in Google Maps.',
      meta: 'Live route guide',
      icon: 'route',
      imagePosition: '50% 46%',
    },
    items: [
      ...workHallLocations.map((location) => ({
        title: location.area,
        href: '#locations',
        detail: location.address,
        meta: location.status === 'live' ? 'Live location' : 'Mock pin',
        icon: 'pin' as const,
        imagePosition: location.id === 'zamzama' ? '38% 58%' : location.id === 'tipu-sultan' ? '54% 42%' : '62% 48%',
      })),
      {
        title: 'Network map',
        href: '#locations',
        detail: 'See all Karachi markers and route guidance.',
        meta: 'Interactive map',
        icon: 'map',
        imagePosition: '50% 50%',
      },
      {
        title: 'Location tour',
        href: '#book-tour',
        detail: 'Visit a branch before choosing your setup.',
        meta: 'Book a tour',
        icon: 'calendar',
        imagePosition: '44% 46%',
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    icon: 'users',
    eyebrow: 'Work Hall story',
    title: 'See the side of Work Hall that makes people stay longer.',
    description: 'Story, rhythm, services, and day-to-day atmosphere all live here instead of crowding the main navigation bar.',
    featured: {
      title: 'See how membership works',
      href: '#why-work-hall',
      detail: 'A softer onboarding path from first tour to everyday use.',
      meta: 'Story and culture',
      icon: 'star',
      imagePosition: '48% 42%',
    },
    items: [
      { title: 'Why Work Hall', href: '#why-work-hall', detail: 'How the membership rhythm works from tour to move-in.', meta: 'Story page', icon: 'star', imagePosition: '55% 48%' },
      { title: 'Community', href: '#why-work-hall', detail: 'People, partners, stories, and the Work Hall atmosphere.', meta: 'Coming source', icon: 'users', imagePosition: '64% 44%' },
      { title: 'Workspace Services', href: '#workspace-services', detail: 'Three clear ways to work from the network.', meta: 'What you can book', icon: 'briefcase', imagePosition: '36% 48%' },
      { title: 'Partners', href: '#contact', detail: 'Open collaboration and partner conversations.', meta: 'Partner with us', icon: 'handshake', imagePosition: '50% 54%' },
      { title: 'Privacy Policy', href: '#contact', detail: 'How Work Hall should handle visitor information.', meta: 'Legal', icon: 'shield', imagePosition: '46% 46%' },
      { title: 'Support', href: '#contact', detail: 'Answers for tours, members, and workspace enquiries.', meta: 'Help center', icon: 'help', imagePosition: '60% 48%' },
      { title: 'Events', href: '#why-work-hall', detail: 'Workshops, networking, and community moments.', meta: 'Coming soon', icon: 'calendar', imagePosition: '54% 48%' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'phone',
    eyebrow: 'Concierge desk',
    title: 'Reach the team, book the tour, or open the member side of Work Hall.',
    description: 'A smaller top-level menu should still surface all the practical next steps without cluttering the bar.',
    featured: {
      title: 'Start an enquiry',
      href: '#contact',
      detail: 'Share your team size, preferred branch, and workspace need so the team can respond properly.',
      meta: 'Fastest route',
      icon: 'calendar',
      imagePosition: '48% 50%',
    },
    items: [
      { title: 'Book a Tour', href: '#book-tour', detail: 'Visit a branch before choosing the final setup.', meta: 'Tour request', icon: 'calendar', imagePosition: '52% 44%' },
      { title: 'Contact Us', href: '#contact', detail: 'Phone, email, and direct conversation with the team.', meta: 'Talk to Work Hall', icon: 'phone', imagePosition: '44% 48%' },
      { title: "Member's Lounge", href: '#members-lounge', detail: 'Private side for existing members and internal access.', meta: 'Members only', icon: 'key', imagePosition: '64% 46%' },
      { title: 'Partner With Us', href: '#contact', detail: 'Open partnership or brand collaboration conversations.', meta: 'Partnerships', icon: 'handshake', imagePosition: '38% 54%' },
      { title: 'Email the team', href: '#contact', detail: 'Share a requirement and get the next step back.', meta: 'Email', icon: 'mail', imagePosition: '50% 52%' },
      { title: 'Help and FAQs', href: '#contact', detail: 'Useful answers while full support content is gathered.', meta: 'Support', icon: 'help', imagePosition: '58% 50%' },
      { title: 'Quick call', href: '#contact', detail: 'Talk through timing, team size, and location fit.', meta: 'Phone support', icon: 'phone', imagePosition: '46% 50%' },
    ],
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    id: 'air-plan',
    name: 'Air Plan',
    eyebrow: 'Flexible coworking',
    price: 'From Rs 20,000/mo',
    summary: 'A shared desk plan for people who want a flexible environment without committing to a private room.',
    fit: 'Best for freelancers, founders, and small teams who need a reliable everyday work base.',
    details: ['Shared desk', 'Flexible environment', 'Community access'],
    accent: '#2f8d71',
    audience: 'individuals',
    imagePosition: '28% 48%',
  },
  {
    id: 'x-plan',
    name: 'X Plan',
    eyebrow: 'Assigned desk',
    price: 'From Rs 30,000/mo',
    summary: 'An assigned desk inside a shared workspace for people who want consistency with the energy of a community.',
    fit: 'Best for operators and teams who want the same seat, same rhythm, and fewer daily decisions.',
    details: ['Assigned desk', 'Shared workspace', 'Monthly plan'],
    accent: '#315aa8',
    audience: 'individuals',
    imagePosition: '48% 46%',
  },
  {
    id: 'box-plan',
    name: 'Box Plan',
    eyebrow: 'Private office',
    price: 'From Rs 50,000/mo',
    summary: 'Private offices for small businesses that need their own room while staying inside the Work Hall ecosystem.',
    fit: 'Best for growing teams, agencies, and companies that need privacy without managing an office alone.',
    details: ['Private office', 'Small business ready', 'Managed workspace'],
    accent: '#d96b43',
    audience: 'teams',
    imagePosition: '62% 42%',
  },
  {
    id: 'enterprise-plan',
    name: 'Enterprise Plan',
    eyebrow: 'Autonomous suites',
    price: 'Custom pricing',
    summary: 'Fully autonomous private office suites shaped around company size, access needs, and team operations.',
    fit: 'Best for established teams that need a dedicated footprint and a more controlled work environment.',
    details: ['Private suite', 'Team-scale planning', 'Custom commercial terms'],
    accent: '#15110d',
    audience: 'teams',
    imagePosition: '54% 50%',
  },
  {
    id: 'custom-fit-outs',
    name: 'Custom Fit-Outs',
    eyebrow: 'Tailored offices',
    price: 'Custom pricing',
    summary: 'Tailored office solutions for creative agencies and teams that need a workspace built around their workflow.',
    fit: 'Best for teams that want a branded, configured setup instead of a standard office plan.',
    details: ['Tailored layout', 'Creative agency fit', 'Custom workspace solution'],
    accent: '#d96b43',
    audience: 'teams',
    imagePosition: '72% 46%',
  },
  {
    id: 'virtual-office',
    name: 'Virtual Office',
    eyebrow: 'Business address',
    price: 'From Rs 10,000/mo',
    summary: 'A physical business address with access to meeting rooms when you need to gather in person.',
    fit: 'Best for remote teams, consultants, and founders who need a credible Karachi business presence.',
    details: ['Physical business address', 'Meeting room access', 'Remote-friendly setup'],
    accent: '#d6aa3a',
    audience: 'individuals',
    imagePosition: '38% 55%',
  },
  {
    id: 'after-hours',
    name: 'After-hours & Weekend',
    eyebrow: 'Flexible access',
    price: 'Varies',
    summary: 'Flexible hours for people and teams whose workday does not fit the standard nine-to-five pattern.',
    fit: 'Best for builders, support teams, side projects, and anyone who needs non-standard access windows.',
    details: ['After-hours access', 'Weekend-only options', 'Flexible schedule'],
    accent: '#1d5f4d',
    audience: 'individuals',
    imagePosition: '58% 38%',
  },
]

export const services = [
  {
    eyebrow: 'Open desk energy',
    title: 'Flexible Coworking Spaces',
    body: 'Walk in with your laptop and find the right kind of energy: a desk, fast internet, familiar faces, and zero office overhead.',
    promise: 'Best when the day needs motion, not management.',
    highlights: ['Open seating', 'Community energy', 'Fast start'],
    cta: 'Explore coworking',
    accent: '#d96b43',
    imagePosition: '24% 48%',
    iconName: 'coworking',
  },
  {
    eyebrow: 'Rooms with gravity',
    title: 'Private Office Suites',
    body: 'A managed room for teams that need privacy, access control, and enough calm to do serious work without disappearing from the community.',
    promise: 'Best when the team needs a home base.',
    highlights: ['Managed privacy', 'Team base', 'Scale-ready'],
    cta: 'View private suites',
    accent: '#15110d',
    imagePosition: '52% 46%',
    iconName: 'office',
  },
  {
    eyebrow: 'Meet with presence',
    title: 'Meeting Rooms',
    body: 'Bring clients, interviews, workshops, reviews, and decisions into a room that feels ready before the first person walks in.',
    promise: 'Best when the meeting needs presence.',
    highlights: ['By the hour', 'Presentation-ready', 'Across locations'],
    cta: 'Browse meeting rooms',
    accent: '#2f8d71',
    imagePosition: '70% 46%',
    iconName: 'meeting',
  },
] as const

export const heroAmenities = [
  {
    eyebrow: 'Always open when work spills over',
    title: ['Open 24/7, 365 Days', 'With Full Access'],
    body: 'Early starts, late decks, weekend catch-ups, and off-pattern schedules still land in a room that is already ready.',
    variant: 'access',
    accent: '#d96b43',
  },
  {
    eyebrow: 'Arrival, handled',
    title: ['Free Gated Parking', 'At All Locations'],
    body: 'No circling the block before the workday starts. Drive in, lock up, and move straight into the room.',
    variant: 'parking',
    accent: '#c2982b',
  },
  {
    eyebrow: 'Quiet help, without the interruption',
    title: ['Staff Service At', 'Your Desk'],
    body: 'The small operational asks do not have to break concentration. Support can reach you where you are already working.',
    variant: 'service',
    accent: '#1d7b69',
  },
  {
    eyebrow: 'Built around how your team moves',
    title: ['Custom Office', 'Layouts'],
    body: 'Rooms can be shaped around the team, the storage, the privacy level, and the tempo of the work itself.',
    variant: 'layouts',
    accent: '#15110d',
  },
  {
    eyebrow: 'Care, kept on site',
    title: ['Car & Bike Cleaning', 'On Site'],
    body: 'One more errand stays off the to-do list while the workday keeps moving.',
    variant: 'cleaning',
    accent: '#2c4d91',
  },
] as const

export const pricingAudienceMeta = {
  individuals: {
    eyebrow: 'For flexible workdays',
    title: 'Individuals',
    lead: 'Desks, business addresses, and flexible access for founders, freelancers, consultants, and solo operators who need a reliable Karachi base.',
    note: 'Start light. Keep optionality. Add structure only when your workday asks for it.',
    accent: '#d96b43',
    soft: '#f4d9c8',
    background: '#d96b43',
    onBackground: '#15110d',
  },
  teams: {
    eyebrow: 'For rooms with gravity',
    title: 'Teams',
    lead: 'Private offices, suites, and tailored fit-outs for groups that need privacy, consistency, and room to grow without running the office.',
    note: 'Move from scattered calls to a room your team can actually gather around.',
    accent: '#d96b43',
    soft: '#15110d',
    background: '#15110d',
    onBackground: '#d96b43',
  },
} as const

export const membershipWords = ['belonging.', 'momentum.', 'headspace.', 'deep focus.']
export const heroWords = ['deep focus.', 'client calls.', 'team flow.', 'quiet wins.']

export const membershipSteps = [
  {
    title: 'Choose your rhythm',
    body: 'Tell us where your work naturally happens: close to clients, close to home, or close to the energy your team needs.',
    signal: 'Location, team size, access window',
  },
  {
    title: 'Shape the setup',
    body: 'We match you with a desk, room, suite, or custom office path so your team can arrive without rebuilding the basics.',
    signal: 'Plan, seats, meeting needs',
  },
  {
    title: 'Move in softly',
    body: 'Book the tour, meet the team, get your access, and start using the space like it already belongs to your workday.',
    signal: 'Tour, onboarding, community',
  },
]

export const membershipDayNotes = [
  'Walk in with your laptop.',
  'Find a desk that fits the mood.',
  'Take the client call.',
  'Stay for the people.',
]

