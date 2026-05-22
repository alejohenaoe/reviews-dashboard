import { describe, it, expect } from 'vitest'
import { propertySummaries } from '../propertySummary.js'
import {
  casaDelMarReviews,
  penthouseBocagrandeReviews,
  villaManzanilloReviews,
  elPobladoSkyReviews,
} from './fixtures.js'

const allFixtureReviews = [
  ...casaDelMarReviews,
  ...penthouseBocagrandeReviews,
  ...villaManzanilloReviews,
  ...elPobladoSkyReviews,
]

function findProperty(summaries, id) {
  return summaries.find((s) => s.propertyId === id)
}

const summaries = propertySummaries(allFixtureReviews)

// ---------------------------------------------------------------------------
// P001 – Casa del Mar 2B  (avgRating 3.0 → critical)
// ---------------------------------------------------------------------------
describe('P001 — Casa del Mar 2B (critical)', () => {
  const p = findProperty(summaries, 'P001')

  it('identifies the property', () => {
    expect(p.propertyName).toBe('Casa del Mar 2B')
    expect(p.city).toBe('Cartagena')
    expect(p.totalReviews).toBe(5)
  })

  it('averageRating = 3.0  (ratings: 3,2,4,1,5)', () => {
    expect(p.averageRating).toBeCloseTo(3.0, 10)
  })

  it('responseRate = 0.8, unanswered = 1', () => {
    expect(p.responseRate).toBeCloseTo(0.8, 10)
    expect(p.unanswered).toBe(1)
  })

  it('sub-rating averages skip null entries', () => {
    // cleanliness: (4+3+1)/3 = 8/3
    expect(p.subRatingAverages.cleanliness).toBeCloseTo(8 / 3, 10)
    // communication: (4+1)/2 = 2.5
    expect(p.subRatingAverages.communication).toBeCloseTo(2.5, 10)
    // checkin: (4+5)/2 = 4.5
    expect(p.subRatingAverages.checkin).toBeCloseTo(4.5, 10)
    // location: 1/1 = 1.0
    expect(p.subRatingAverages.location).toBeCloseTo(1.0, 10)
    // value: (3+5)/2 = 4.0
    expect(p.subRatingAverages.value).toBeCloseTo(4.0, 10)
  })
})

// ---------------------------------------------------------------------------
// P002 – Penthouse Bocagrande  (avgRating 4.6 → healthy)
// ---------------------------------------------------------------------------
describe('P002 — Penthouse Bocagrande (healthy)', () => {
  const p = findProperty(summaries, 'P002')

  it('averageRating = 4.6  (ratings: 5,5,4,4,5)', () => {
    expect(p.averageRating).toBeCloseTo(4.6, 10)
  })

  it('responseRate = 0.4, unanswered = 3', () => {
    expect(p.responseRate).toBeCloseTo(0.4, 10)
    expect(p.unanswered).toBe(3)
  })

  it('sub-rating averages', () => {
    // cleanliness: (5+5)/2 = 5.0
    expect(p.subRatingAverages.cleanliness).toBeCloseTo(5.0, 10)
    // communication: (5+4+4+5)/4 = 18/4
    expect(p.subRatingAverages.communication).toBeCloseTo(18 / 4, 10)
    // checkin: (5+5+4+5+5)/5 = 24/5  (R00032=5, R00036=5, R00026=4, R00029=5, R00027=5)
    expect(p.subRatingAverages.checkin).toBeCloseTo(24 / 5, 10)
    // location: (5+5)/2 = 5.0
    expect(p.subRatingAverages.location).toBeCloseTo(5.0, 10)
    // value: (4+5)/2 = 4.5
    expect(p.subRatingAverages.value).toBeCloseTo(4.5, 10)
  })
})

// ---------------------------------------------------------------------------
// P004 – Villa Manzanillo  (avgRating 3.8 → at_risk)
// ---------------------------------------------------------------------------
describe('P004 — Villa Manzanillo (at_risk)', () => {
  const p = findProperty(summaries, 'P004')

  it('averageRating = 3.8  (ratings: 5,5,4,4,1)', () => {
    expect(p.averageRating).toBeCloseTo(3.8, 10)
  })

  it('responseRate = 0.6, unanswered = 2', () => {
    expect(p.responseRate).toBeCloseTo(0.6, 10)
    expect(p.unanswered).toBe(2)
  })

  it('sub-rating averages', () => {
    // cleanliness: (3+5)/2 = 4.0  (R00065, R00074)
    expect(p.subRatingAverages.cleanliness).toBeCloseTo(4.0, 10)
    // communication: (5+5+4)/3 = 14/3  (R00068, R00077, R00065)
    expect(p.subRatingAverages.communication).toBeCloseTo(14 / 3, 10)
    // checkin: (5+4+4+1)/4 = 14/4  (R00068, R00065, R00074, R00060)
    expect(p.subRatingAverages.checkin).toBeCloseTo(14 / 4, 10)
    // location: (5+5+4+1)/4 = 15/4  (R00077, R00065, R00074, R00060)
    expect(p.subRatingAverages.location).toBeCloseTo(15 / 4, 10)
    // value: 5/1 = 5.0  (R00077 only)
    expect(p.subRatingAverages.value).toBeCloseTo(5.0, 10)
  })
})

// ---------------------------------------------------------------------------
// P005 – El Poblado Sky 1102  (avgRating 2.6 → critical)
// ---------------------------------------------------------------------------
describe('P005 — El Poblado Sky 1102 (critical)', () => {
  const p = findProperty(summaries, 'P005')

  it('averageRating = 2.6  (ratings: 1,3,3,2,4)', () => {
    expect(p.averageRating).toBeCloseTo(2.6, 10)
  })

  it('responseRate = 0.4, unanswered = 3', () => {
    expect(p.responseRate).toBeCloseTo(0.4, 10)
    expect(p.unanswered).toBe(3)
  })

  it('sub-rating averages', () => {
    // cleanliness: (3+2+5)/3 = 10/3  (R00083, R00079, R00086)
    expect(p.subRatingAverages.cleanliness).toBeCloseTo(10 / 3, 10)
    // communication: (1+2+2)/3 = 5/3  (R00084, R00082, R00083)
    expect(p.subRatingAverages.communication).toBeCloseTo(5 / 3, 10)
    // checkin: (1+3)/2 = 2.0  (R00084, R00079)
    expect(p.subRatingAverages.checkin).toBeCloseTo(2.0, 10)
    // location: (1+4+2)/3 = 7/3  (R00084, R00082, R00083)
    expect(p.subRatingAverages.location).toBeCloseTo(7 / 3, 10)
    // value: (2+4+2+2+4)/5 = 14/5 = 2.8  (all 5 reviews)
    expect(p.subRatingAverages.value).toBeCloseTo(2.8, 10)
  })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe('propertySummaries — edge cases', () => {
  it('returns empty array for empty input', () => {
    expect(propertySummaries([])).toEqual([])
  })

  it('lastReviewDate is the maximum date across reviews', () => {
    const reviews = [
      { propertyId: 'PX', propertyName: 'X', city: 'X', rating: null, subRatings: { cleanliness: null, location: null, checkin: null, communication: null, value: null }, hasResponse: false, date: new Date('2025-01-01T00:00:00Z') },
      { propertyId: 'PX', propertyName: 'X', city: 'X', rating: null, subRatings: { cleanliness: null, location: null, checkin: null, communication: null, value: null }, hasResponse: false, date: new Date('2025-06-15T00:00:00Z') },
      { propertyId: 'PX', propertyName: 'X', city: 'X', rating: null, subRatings: { cleanliness: null, location: null, checkin: null, communication: null, value: null }, hasResponse: false, date: new Date('2025-03-10T00:00:00Z') },
    ]
    const result = propertySummaries(reviews)
    expect(result[0].lastReviewDate.getTime()).toBe(new Date('2025-06-15T00:00:00Z').getTime())
  })

  it('lastReviewDate is null when no dates are valid', () => {
    const reviews = [
      { propertyId: 'PX', propertyName: 'X', city: 'X', rating: null, subRatings: { cleanliness: null, location: null, checkin: null, communication: null, value: null }, hasResponse: false, date: null },
    ]
    expect(propertySummaries(reviews)[0].lastReviewDate).toBeNull()
  })

  it('subRatingAverages are null when all values for a key are null', () => {
    const reviews = [
      { propertyId: 'PX', propertyName: 'X', city: 'X', rating: 3, subRatings: { cleanliness: null, location: null, checkin: null, communication: null, value: null }, hasResponse: false, date: null },
    ]
    const result = propertySummaries(reviews)
    expect(result[0].subRatingAverages.cleanliness).toBeNull()
    expect(result[0].subRatingAverages.value).toBeNull()
  })
})
