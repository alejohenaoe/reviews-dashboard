import { portfolioStats } from './portfolioStats.js'

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
    return {
      propertyId: group.propertyId,
      propertyName: group.propertyName,
      city: group.city,
      totalReviews: stats.totalReviews,
      averageRating: stats.averageRating,
      responseRate: stats.responseRate,
      unanswered: stats.unanswered,
    }
  })
}

export function reviewsForProperty(reviews, propertyId) {
  if (!propertyId) return reviews
  return reviews.filter((r) => r.propertyId === propertyId)
}
