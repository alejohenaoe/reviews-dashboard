function average(values) {
  const nums = values.filter((v) => v !== null && Number.isFinite(v))
  if (nums.length === 0) return null
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

export function portfolioStats(reviews) {
  const total = reviews.length
  const averageRating = average(reviews.map((r) => r.rating))
  const responded = reviews.filter((r) => r.hasResponse).length
  const propertyIds = new Set(reviews.map((r) => r.propertyId).filter(Boolean))
  return {
    totalReviews: total,
    averageRating,
    responseRate: total > 0 ? responded / total : 0,
    unanswered: total - responded,
    propertyCount: propertyIds.size,
  }
}
