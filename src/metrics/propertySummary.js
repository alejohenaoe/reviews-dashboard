import { portfolioStats } from './portfolioStats.js'

function avgSubRating(reviews, key) {
  const vals = reviews
    .map((r) => r.subRatings[key])
    .filter((v) => v !== null && Number.isFinite(v))
  if (vals.length === 0) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

export function propertySummaries(reviews) {
  const byId = new Map()
  for (const review of reviews) {
    if (!review.propertyId) continue
    if (!byId.has(review.propertyId)) {
      byId.set(review.propertyId, {
        propertyId: review.propertyId,
        propertyName: review.propertyName,
        city: review.city,
        reviews: [],
      })
    }
    byId.get(review.propertyId).reviews.push(review)
  }
  return Array.from(byId.values()).map((group) => {
    const stats = portfolioStats(group.reviews)
    const dates = group.reviews.map((r) => r.date).filter((d) => d instanceof Date)
    const lastReviewDate =
      dates.length > 0 ? new Date(Math.max(...dates.map((d) => d.getTime()))) : null
    return {
      propertyId: group.propertyId,
      propertyName: group.propertyName,
      city: group.city,
      totalReviews: stats.totalReviews,
      averageRating: stats.averageRating,
      responseRate: stats.responseRate,
      unanswered: stats.unanswered,
      lastReviewDate,
      subRatingAverages: {
        cleanliness: avgSubRating(group.reviews, 'cleanliness'),
        location: avgSubRating(group.reviews, 'location'),
        checkin: avgSubRating(group.reviews, 'checkin'),
        communication: avgSubRating(group.reviews, 'communication'),
        value: avgSubRating(group.reviews, 'value'),
      },
    }
  })
}

export function reviewsForProperty(reviews, propertyId) {
  if (!propertyId) return reviews
  return reviews.filter((r) => r.propertyId === propertyId)
}
