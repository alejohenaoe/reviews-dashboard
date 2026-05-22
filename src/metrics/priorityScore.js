const SEVERITY_WEIGHTS = { 1: 10, 2: 6, 3: 3, 4: 1, 5: 0 }
const DAY_MS = 1000 * 60 * 60 * 24

export function severityWeight(rating) {
  if (rating === null || rating === undefined) return 3
  const rounded = Math.round(rating)
  return SEVERITY_WEIGHTS[rounded] ?? 0
}

export function recencyMultiplier(daysSince) {
  if (daysSince <= 7) return 2.0
  if (daysSince <= 30) return 1.5
  if (daysSince <= 90) return 1.0
  return 0.5
}

export function priorityScore(review, now = new Date()) {
  const severity = severityWeight(review.rating)
  if (!(review.date instanceof Date)) return severity * 0.5
  const days = Math.max(0, (now.getTime() - review.date.getTime()) / DAY_MS)
  return severity * recencyMultiplier(days)
}

export function unansweredByPriority(reviews, now = new Date()) {
  return reviews
    .filter((r) => !r.hasResponse)
    .map((r) => ({ review: r, score: priorityScore(r, now) }))
    .sort((a, b) => b.score - a.score)
}
