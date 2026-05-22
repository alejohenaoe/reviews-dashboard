export function riskLevel(averageRating) {
  if (averageRating === null || averageRating === undefined) return 'unknown'
  if (averageRating < 3.5) return 'critical'
  if (averageRating < 4.2) return 'at_risk'
  return 'healthy'
}
