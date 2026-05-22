function monthKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function monthlyTrend(reviews) {
  const buckets = new Map()
  for (const review of reviews) {
    if (!(review.date instanceof Date)) continue
    const key = monthKey(review.date)
    if (!buckets.has(key)) {
      buckets.set(key, { month: key, count: 0, ratingSum: 0, ratingCount: 0 })
    }
    const bucket = buckets.get(key)
    bucket.count += 1
    if (review.rating !== null) {
      bucket.ratingSum += review.rating
      bucket.ratingCount += 1
    }
  }
  return Array.from(buckets.values())
    .map((b) => ({
      month: b.month,
      count: b.count,
      averageRating: b.ratingCount > 0 ? b.ratingSum / b.ratingCount : null,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}
