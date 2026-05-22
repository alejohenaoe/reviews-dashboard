const KNOWN_CHANNELS = new Set(['airbnb', 'booking', 'vrbo', 'direct'])
const CHANNEL_ALIASES = { 'booking.com': 'booking' }
const KNOWN_LANGUAGES = new Set(['en', 'es', 'pt'])

export function parseRating(value) {
  if (value === null || value === undefined) return null
  const trimmed = String(value).trim()
  if (trimmed === '') return null
  const n = Number(trimmed)
  if (!Number.isFinite(n)) return null
  return n
}

export function parseDate(value) {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d
}

export function normalizeChannel(raw) {
  if (!raw) return null
  const lower = String(raw).trim().toLowerCase()
  if (CHANNEL_ALIASES[lower]) return CHANNEL_ALIASES[lower]
  if (KNOWN_CHANNELS.has(lower)) return lower
  return null
}

export function normalizeLanguage(raw) {
  if (!raw) return null
  const lower = String(raw).trim().toLowerCase()
  if (KNOWN_LANGUAGES.has(lower)) return lower
  return null
}

export function normalizeReview(row) {
  const hostResponse = String(row.host_response ?? '').trim()
  return {
    id: String(row.review_id ?? '').trim(),
    propertyId: String(row.property_id ?? '').trim(),
    propertyName: String(row.property_name ?? '').trim(),
    city: String(row.city ?? '').trim(),
    channel: normalizeChannel(row.channel),
    date: parseDate(row.review_date),
    language: normalizeLanguage(row.language),
    rating: parseRating(row.rating_overall),
    subRatings: {
      cleanliness: parseRating(row.rating_cleanliness),
      location: parseRating(row.rating_location),
      checkin: parseRating(row.rating_checkin),
      communication: parseRating(row.rating_communication),
      value: parseRating(row.rating_value),
    },
    reviewText: String(row.review_text ?? '').trim(),
    hasResponse: hostResponse !== '',
  }
}
