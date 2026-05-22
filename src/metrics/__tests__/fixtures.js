/**
 * Inline review fixtures derived from real rows in public/data/guest_reviews.csv.
 * Values are hardcoded (not loaded at runtime) so tests stay deterministic and
 * independent of the file system.
 *
 * Shape matches the normalized Review object produced by src/data/normalize.js:
 *   { id, propertyId, propertyName, city, rating, subRatings, hasResponse, date }
 */

function makeReview({ id, propertyId, propertyName, city, rating = null, subRatings = {}, hasResponse = false, date = new Date('2025-06-01T00:00:00Z') }) {
  return {
    id,
    propertyId,
    propertyName,
    city,
    rating,
    subRatings: {
      cleanliness: subRatings.cleanliness ?? null,
      location: subRatings.location ?? null,
      checkin: subRatings.checkin ?? null,
      communication: subRatings.communication ?? null,
      value: subRatings.value ?? null,
    },
    hasResponse,
    date,
  }
}

// ---------------------------------------------------------------------------
// P001 – Casa del Mar 2B, Cartagena (rows R00004, R00014, R00005, R00007, R00008)
// Expected: avgRating=3.0, riskLevel=critical, responseRate=0.8, unanswered=1
// cleanliness=8/3, communication=2.5, checkin=4.5, location=1.0, value=4.0
// ---------------------------------------------------------------------------
export const casaDelMarReviews = [
  makeReview({ id: 'R00004', propertyId: 'P001', propertyName: 'Casa del Mar 2B', city: 'Cartagena', rating: 3, subRatings: { cleanliness: 4, communication: 4, checkin: 4, value: 3 }, hasResponse: true }),
  makeReview({ id: 'R00014', propertyId: 'P001', propertyName: 'Casa del Mar 2B', city: 'Cartagena', rating: 2, subRatings: { cleanliness: 3 }, hasResponse: false }),
  makeReview({ id: 'R00005', propertyId: 'P001', propertyName: 'Casa del Mar 2B', city: 'Cartagena', rating: 4, hasResponse: true }),
  makeReview({ id: 'R00007', propertyId: 'P001', propertyName: 'Casa del Mar 2B', city: 'Cartagena', rating: 1, subRatings: { cleanliness: 1, communication: 1, location: 1 }, hasResponse: true }),
  makeReview({ id: 'R00008', propertyId: 'P001', propertyName: 'Casa del Mar 2B', city: 'Cartagena', rating: 5, subRatings: { checkin: 5, value: 5 }, hasResponse: true }),
]

// ---------------------------------------------------------------------------
// P002 – Penthouse Bocagrande, Cartagena (rows R00032, R00036, R00026, R00029, R00027)
// Expected: avgRating=4.6, riskLevel=healthy, responseRate=0.4, unanswered=3
// cleanliness=5.0, communication=4.5, checkin=4.8, location=5.0, value=4.5
// ---------------------------------------------------------------------------
export const penthouseBocagrandeReviews = [
  makeReview({ id: 'R00032', propertyId: 'P002', propertyName: 'Penthouse Bocagrande', city: 'Cartagena', rating: 5, subRatings: { communication: 5, checkin: 5, location: 5, value: 4 }, hasResponse: false }),
  makeReview({ id: 'R00036', propertyId: 'P002', propertyName: 'Penthouse Bocagrande', city: 'Cartagena', rating: 5, subRatings: { cleanliness: 5, communication: 4, checkin: 5, value: 5 }, hasResponse: false }),
  makeReview({ id: 'R00026', propertyId: 'P002', propertyName: 'Penthouse Bocagrande', city: 'Cartagena', rating: 4, subRatings: { communication: 4, checkin: 4 }, hasResponse: false }),
  makeReview({ id: 'R00029', propertyId: 'P002', propertyName: 'Penthouse Bocagrande', city: 'Cartagena', rating: 4, subRatings: { checkin: 5, location: 5 }, hasResponse: true }),
  makeReview({ id: 'R00027', propertyId: 'P002', propertyName: 'Penthouse Bocagrande', city: 'Cartagena', rating: 5, subRatings: { cleanliness: 5, communication: 5, checkin: 5 }, hasResponse: true }),
]

// ---------------------------------------------------------------------------
// P004 – Villa Manzanillo, Manzanillo (rows R00068, R00077, R00065, R00074, R00060)
// Expected: avgRating=3.8, riskLevel=at_risk, responseRate=0.6, unanswered=2
// cleanliness=4.0, communication=14/3, checkin=3.5, location=3.75, value=5.0
// ---------------------------------------------------------------------------
export const villaManzanilloReviews = [
  makeReview({ id: 'R00068', propertyId: 'P004', propertyName: 'Villa Manzanillo', city: 'Manzanillo', rating: 5, subRatings: { communication: 5, checkin: 5 }, hasResponse: true }),
  makeReview({ id: 'R00077', propertyId: 'P004', propertyName: 'Villa Manzanillo', city: 'Manzanillo', rating: 5, subRatings: { communication: 5, location: 5, value: 5 }, hasResponse: false }),
  makeReview({ id: 'R00065', propertyId: 'P004', propertyName: 'Villa Manzanillo', city: 'Manzanillo', rating: 4, subRatings: { cleanliness: 3, communication: 4, checkin: 4, location: 5 }, hasResponse: false }),
  makeReview({ id: 'R00074', propertyId: 'P004', propertyName: 'Villa Manzanillo', city: 'Manzanillo', rating: 4, subRatings: { cleanliness: 5, checkin: 4, location: 4 }, hasResponse: true }),
  makeReview({ id: 'R00060', propertyId: 'P004', propertyName: 'Villa Manzanillo', city: 'Manzanillo', rating: 1, subRatings: { checkin: 1, location: 1 }, hasResponse: true }),
]

// ---------------------------------------------------------------------------
// P005 – El Poblado Sky 1102, Medellín (rows R00084, R00082, R00083, R00079, R00086)
// Expected: avgRating=2.6, riskLevel=critical, responseRate=0.4, unanswered=3
// cleanliness=10/3, communication=5/3, checkin=2.0, location=7/3, value=2.8
// ---------------------------------------------------------------------------
export const elPobladoSkyReviews = [
  makeReview({ id: 'R00084', propertyId: 'P005', propertyName: 'El Poblado Sky 1102', city: 'Medellín', rating: 1, subRatings: { communication: 1, checkin: 1, location: 1, value: 2 }, hasResponse: true }),
  makeReview({ id: 'R00082', propertyId: 'P005', propertyName: 'El Poblado Sky 1102', city: 'Medellín', rating: 3, subRatings: { communication: 2, location: 4, value: 4 }, hasResponse: false }),
  makeReview({ id: 'R00083', propertyId: 'P005', propertyName: 'El Poblado Sky 1102', city: 'Medellín', rating: 3, subRatings: { cleanliness: 3, communication: 2, location: 2, value: 2 }, hasResponse: false }),
  makeReview({ id: 'R00079', propertyId: 'P005', propertyName: 'El Poblado Sky 1102', city: 'Medellín', rating: 2, subRatings: { cleanliness: 2, checkin: 3, value: 2 }, hasResponse: false }),
  makeReview({ id: 'R00086', propertyId: 'P005', propertyName: 'El Poblado Sky 1102', city: 'Medellín', rating: 4, subRatings: { cleanliness: 5, value: 4 }, hasResponse: true }),
]
