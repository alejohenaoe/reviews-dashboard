/**
 * Parse and validate the raw vibe score JSON response from Claude.
 * Throws a descriptive string on failure.
 *
 * @param {string} rawResponse
 * @returns {{ vibeScore: number, vibeLabel: string, mismatch: boolean, mismatchNote?: string, dominantEmotion: string }}
 */
export function validateVibeScore(rawResponse) {
  let parsed
  try {
    parsed = JSON.parse(rawResponse)
  } catch {
    throw 'Invalid JSON: the response could not be parsed.'
  }

  if (!parsed || typeof parsed !== 'object') {
    throw 'Expected a JSON object.'
  }

  const { vibeScore, vibeLabel, mismatch, mismatchNote, dominantEmotion } = parsed

  if (!Number.isInteger(vibeScore) || vibeScore < 1 || vibeScore > 5) {
    throw `"vibeScore" must be an integer between 1 and 5, got: ${vibeScore}`
  }
  if (typeof vibeLabel !== 'string' || vibeLabel.trim() === '') {
    throw '"vibeLabel" must be a non-empty string.'
  }
  if (typeof mismatch !== 'boolean') {
    throw '"mismatch" must be a boolean.'
  }
  if (mismatch && (typeof mismatchNote !== 'string' || mismatchNote.trim() === '')) {
    throw '"mismatchNote" is required when "mismatch" is true.'
  }
  if (typeof dominantEmotion !== 'string' || dominantEmotion.trim() === '') {
    throw '"dominantEmotion" must be a non-empty string.'
  }

  return { vibeScore, vibeLabel, mismatch, mismatchNote: mismatch ? mismatchNote : undefined, dominantEmotion }
}
