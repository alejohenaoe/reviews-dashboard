import { useContext } from 'react'
import { ReviewsContext } from './reviewsContext.js'

export function useReviews() {
  const ctx = useContext(ReviewsContext)
  if (!ctx) throw new Error('useReviews must be used inside a ReviewsProvider')
  return ctx
}
