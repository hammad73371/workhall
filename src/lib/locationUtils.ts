import type { UserCoordinates, WorkHallLocation } from '../types/site'

export function toRadians(value: number) {
  return (value * Math.PI) / 180
}

export function getDistanceKm(userCoordinates: UserCoordinates, location: WorkHallLocation) {
  const earthRadiusKm = 6371
  const dLat = toRadians(location.coordinates[1] - userCoordinates.latitude)
  const dLon = toRadians(location.coordinates[0] - userCoordinates.longitude)
  const lat1 = toRadians(userCoordinates.latitude)
  const lat2 = toRadians(location.coordinates[1])

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(distance: number | null) {
  if (distance === null) return 'Distance unavailable'
  return `${distance.toFixed(distance < 10 ? 1 : 0)} km away`
}

export function buildGuideRoute(from: [number, number], to: [number, number]) {
  const [fromLongitude, fromLatitude] = from
  const [toLongitude, toLatitude] = to
  const longitudeDelta = toLongitude - fromLongitude
  const latitudeDelta = toLatitude - fromLatitude
  const midpoint: [number, number] = [
    fromLongitude + longitudeDelta * 0.52 - latitudeDelta * 0.08,
    fromLatitude + latitudeDelta * 0.52 + longitudeDelta * 0.08,
  ]
  const route: [number, number][] = []

  for (let index = 0; index <= 36; index += 1) {
    const progress = index / 36
    const inverse = 1 - progress

    route.push([
      inverse * inverse * fromLongitude +
        2 * inverse * progress * midpoint[0] +
        progress * progress * toLongitude,
      inverse * inverse * fromLatitude +
        2 * inverse * progress * midpoint[1] +
        progress * progress * toLatitude,
    ])
  }

  return route
}

export function createRouteData(userCoordinates: UserCoordinates, location: WorkHallLocation) {
  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: buildGuideRoute([userCoordinates.longitude, userCoordinates.latitude], location.coordinates),
        },
      },
    ],
  }
}

