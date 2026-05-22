import Papa from 'papaparse'
import { normalizeReview } from './normalize.js'

const CSV_PATH = '/data/guest_reviews.csv'

export async function loadReviews() {
  const response = await fetch(CSV_PATH)
  if (!response.ok) {
    throw new Error(`Failed to fetch reviews CSV (${response.status})`)
  }
  const text = await response.text()
  const { data, errors } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  })
  if (errors.length > 0) {
    console.warn('CSV parse warnings:', errors)
  }
  const reviews = data.map(normalizeReview).filter((r) => r.id)
  return { reviews, loadedAt: new Date() }
}
