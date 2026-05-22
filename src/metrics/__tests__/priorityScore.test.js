import { describe, it, expect } from 'vitest'
import { severityWeight, recencyMultiplier, priorityScore, unansweredByPriority } from '../priorityScore.js'

const NOW = new Date('2025-10-01T00:00:00Z')
const DAY_MS = 1000 * 60 * 60 * 24

function reviewAt(rating, daysAgo) {
  return { rating, date: new Date(NOW.getTime() - daysAgo * DAY_MS) }
}

// ---------------------------------------------------------------------------
// severityWeight
// ---------------------------------------------------------------------------
describe('severityWeight', () => {
  it('maps each star rating to its weight', () => {
    expect(severityWeight(1)).toBe(10)
    expect(severityWeight(2)).toBe(6)
    expect(severityWeight(3)).toBe(3)
    expect(severityWeight(4)).toBe(1)
    expect(severityWeight(5)).toBe(0)
  })

  it('returns 3 for null rating', () => {
    expect(severityWeight(null)).toBe(3)
  })

  it('returns 3 for undefined rating', () => {
    expect(severityWeight(undefined)).toBe(3)
  })
})

// ---------------------------------------------------------------------------
// recencyMultiplier
// ---------------------------------------------------------------------------
describe('recencyMultiplier', () => {
  it('returns 2.0 for 0 days (same day)', () => {
    expect(recencyMultiplier(0)).toBe(2.0)
  })

  it('returns 2.0 at the 7-day boundary', () => {
    expect(recencyMultiplier(7)).toBe(2.0)
  })

  it('returns 1.5 at 8 days (just past the first threshold)', () => {
    expect(recencyMultiplier(8)).toBe(1.5)
  })

  it('returns 1.5 at the 30-day boundary', () => {
    expect(recencyMultiplier(30)).toBe(1.5)
  })

  it('returns 1.0 at 31 days (just past the second threshold)', () => {
    expect(recencyMultiplier(31)).toBe(1.0)
  })

  it('returns 1.0 at the 90-day boundary', () => {
    expect(recencyMultiplier(90)).toBe(1.0)
  })

  it('returns 0.5 at 91 days (just past the third threshold)', () => {
    expect(recencyMultiplier(91)).toBe(0.5)
  })

  it('returns 0.5 for very old reviews', () => {
    expect(recencyMultiplier(365)).toBe(0.5)
  })
})

// ---------------------------------------------------------------------------
// priorityScore
// ---------------------------------------------------------------------------
describe('priorityScore', () => {
  it('1-star review 3 days ago = 10 × 2.0 = 20', () => {
    expect(priorityScore(reviewAt(1, 3), NOW)).toBe(20)
  })

  it('2-star review 15 days ago = 6 × 1.5 = 9', () => {
    expect(priorityScore(reviewAt(2, 15), NOW)).toBe(9)
  })

  it('3-star review 7 days ago = 3 × 2.0 = 6', () => {
    expect(priorityScore(reviewAt(3, 7), NOW)).toBe(6)
  })

  it('4-star review 45 days ago = 1 × 1.0 = 1', () => {
    expect(priorityScore(reviewAt(4, 45), NOW)).toBe(1)
  })

  it('5-star review always scores 0 regardless of recency', () => {
    expect(priorityScore(reviewAt(5, 0), NOW)).toBe(0)
    expect(priorityScore(reviewAt(5, 365), NOW)).toBe(0)
  })

  it('null-rating review 100 days ago = 3 × 0.5 = 1.5', () => {
    expect(priorityScore(reviewAt(null, 100), NOW)).toBe(1.5)
  })

  it('falls back to 0.5 multiplier when date is missing', () => {
    // severity 10 (1-star) × fallback 0.5 = 5
    expect(priorityScore({ rating: 1, date: null }, NOW)).toBe(5)
  })

  it('falls back to 0.5 multiplier when date is not a Date instance', () => {
    expect(priorityScore({ rating: 2, date: '2025-01-01' }, NOW)).toBe(3)
  })
})

// ---------------------------------------------------------------------------
// unansweredByPriority
// ---------------------------------------------------------------------------
describe('unansweredByPriority', () => {
  it('excludes reviews that already have a response', () => {
    const reviews = [
      { ...reviewAt(1, 5), hasResponse: true },
      { ...reviewAt(2, 5), hasResponse: false },
    ]
    const result = unansweredByPriority(reviews, NOW)
    expect(result).toHaveLength(1)
    expect(result[0].review.rating).toBe(2)
  })

  it('sorts by descending priority score', () => {
    const reviews = [
      { ...reviewAt(4, 5), hasResponse: false },  // score: 1 × 2.0 = 2
      { ...reviewAt(1, 5), hasResponse: false },  // score: 10 × 2.0 = 20
      { ...reviewAt(3, 5), hasResponse: false },  // score: 3 × 2.0 = 6
    ]
    const result = unansweredByPriority(reviews, NOW)
    expect(result[0].score).toBe(20)
    expect(result[1].score).toBe(6)
    expect(result[2].score).toBe(2)
  })

  it('returns empty array when all reviews have responses', () => {
    const reviews = [{ ...reviewAt(1, 5), hasResponse: true }]
    expect(unansweredByPriority(reviews, NOW)).toEqual([])
  })

  it('returns empty array for empty input', () => {
    expect(unansweredByPriority([], NOW)).toEqual([])
  })
})
