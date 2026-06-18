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
  const [fromLng, fromLat] = from
  const [toLng, toLat] = to
  const midLng = (fromLng + toLng) / 2
  const midLat = (fromLat + toLat) / 2
  const arcLat = midLat + (Math.abs(toLng - fromLng) * 0.18 + 0.03)

  return [
    from,
    [midLng - 0.05, arcLat],
    [midLng + 0.03, arcLat - 0.02],
    to,
  ]
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

