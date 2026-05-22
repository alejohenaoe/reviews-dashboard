import { describe, it, expect } from 'vitest'
import { portfolioStats } from '../portfolioStats.js'

describe('portfolioStats', () => {
  it('returns zero-state for an empty array', () => {
    const stats = portfolioStats([])
    expect(stats.totalReviews).toBe(0)
    expect(stats.averageRating).toBeNull()
    expect(stats.responseRate).toBe(0)
    expect(stats.unanswered).toBe(0)
    expect(stats.propertyCount).toBe(0)
  })

  it('treats null ratings as absent — not zero — when averaging', () => {
    // (4 + 2) / 2 = 3.0, not (4 + 0 + 2) / 3 = 2.0
    const reviews = [
      { rating: 4, hasResponse: false, propertyId: 'P1' },
      { rating: null, hasResponse: false, propertyId: 'P1' },
      { rating: 2, hasResponse: false, propertyId: 'P1' },
    ]
    expect(portfolioStats(reviews).averageRating).toBeCloseTo(3.0, 10)
  })

  it('returns null averageRating when all ratings are null', () => {
    const reviews = [{ rating: null, hasResponse: false, propertyId: 'P1' }]
    expect(portfolioStats(reviews).averageRating).toBeNull()
  })

  it('computes responseRate and unanswered correctly', () => {
    const reviews = [
      { rating: 4, hasResponse: true, propertyId: 'P1' },
      { rating: 3, hasResponse: false, propertyId: 'P1' },
      { rating: 5, hasResponse: true, propertyId: 'P1' },
      { rating: 2, hasResponse: false, propertyId: 'P1' },
    ]
    const stats = portfolioStats(reviews)
    expect(stats.totalReviews).toBe(4)
    expect(stats.responseRate).toBeCloseTo(0.5, 10)
    expect(stats.unanswered).toBe(2)
  })

  it('counts unique properties', () => {
    const reviews = [
      { rating: 4, hasResponse: false, propertyId: 'P1' },
      { rating: 3, hasResponse: false, propertyId: 'P1' },
      { rating: 5, hasResponse: false, propertyId: 'P2' },
    ]
    expect(portfolioStats(reviews).propertyCount).toBe(2)
  })

  it('responseRate is 0 when no reviews are responded to', () => {
    const reviews = [
      { rating: 2, hasResponse: false, propertyId: 'P1' },
      { rating: 1, hasResponse: false, propertyId: 'P1' },
    ]
    expect(portfolioStats(reviews).responseRate).toBe(0)
    expect(portfolioStats(reviews).unanswered).toBe(2)
  })

  it('responseRate is 1 when all reviews are responded to', () => {
    const reviews = [
      { rating: 4, hasResponse: true, propertyId: 'P1' },
      { rating: 5, hasResponse: true, propertyId: 'P1' },
    ]
    expect(portfolioStats(reviews).responseRate).toBe(1)
    expect(portfolioStats(reviews).unanswered).toBe(0)
  })
})
