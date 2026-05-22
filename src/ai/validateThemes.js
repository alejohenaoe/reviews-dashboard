const VALID_SENTIMENTS = new Set(['positive', 'negative', 'mixed'])

/**
 * Parse and validate the raw theme extraction JSON response from Claude.
 * Expected shape (prompt-5.md schema):
 *   { propertyId: string, propertyName: string, themes: Theme[] }
 *
 * Malformed individual theme objects are silently dropped.
 * Throws a descriptive string on structural failure.
 *
 * @param {string} rawResponse
 * @returns {{ propertyId: string, propertyName: string, themes: object[] }}
 */
export function validateThemes(rawResponse) {
  let parsed
  try {
    parsed = JSON.parse(rawResponse)
  } catch {
    throw 'Invalid JSON: the response could not be parsed.'
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw 'Expected an object with a themes array but received a different type.'
  }

  if (!Array.isArray(parsed.themes)) {
    throw 'Response is missing the required "themes" array.'
  }

  const themes = parsed.themes.filter((item) => {
    if (!item || typeof item !== 'object') return false
    if (typeof item.name !== 'string' || item.name.trim() === '') return false
    if (!VALID_SENTIMENTS.has(item.sentiment)) return false
    if (typeof item.count !== 'number') return false
    if (!Array.isArray(item.reviewIndices)) return false
    if (typeof item.summary !== 'string') return false
    if (!Array.isArray(item.languages)) return false
    return true
  })

  return {
    propertyId: typeof parsed.propertyId === 'string' ? parsed.propertyId : '',
    propertyName: typeof parsed.propertyName === 'string' ? parsed.propertyName : '',
    themes,
  }
}
