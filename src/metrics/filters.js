export function applyFilters(reviews, filters) {
  return reviews.filter((review) => {
    if (filters.dateFrom && review.date && review.date < filters.dateFrom) return false
    if (filters.dateTo && review.date && review.date > filters.dateTo) return false
    if (filters.channels?.length) {
      if (!review.channel || !filters.channels.includes(review.channel)) return false
    }
    if (filters.languages?.length) {
      if (!review.language || !filters.languages.includes(review.language)) return false
    }
    if (filters.ratingMin !== null && filters.ratingMin !== undefined) {
      if (review.rating === null || review.rating < filters.ratingMin) return false
    }
    if (filters.ratingMax !== null && filters.ratingMax !== undefined) {
      if (review.rating === null || review.rating > filters.ratingMax) return false
    }
    return true
  })
}
