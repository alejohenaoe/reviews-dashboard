import { callClaude } from './claudeClient.js'
import { buildLanguageBatchThemePrompt } from './prompts.js'
import { validateThemes } from './validateThemes.js'

const MAX_PER_LANGUAGE = 100

/**
 * Group reviews by language code. Reviews with missing language go into 'unknown'.
 * Each group is capped at maxPerLanguage to keep prompts manageable.
 *
 * @param {object[]} reviews
 * @param {number}   maxPerLanguage
 * @returns {{ [language: string]: object[] }}
 */
export function groupByLanguage(reviews, maxPerLanguage = MAX_PER_LANGUAGE) {
  const groups = {}
  for (const review of reviews) {
    const lang = review.language?.trim().toLowerCase() || 'unknown'
    if (!groups[lang]) groups[lang] = []
    if (groups[lang].length < maxPerLanguage) {
      groups[lang].push(review)
    }
  }
  return groups
}

/**
 * Run parallel theme extraction for all language groups.
 * Per-group errors are collected but do not abort other groups.
 *
 * @param {{ [language: string]: object[] }} languageGroups  Output of groupByLanguage
 * @param {string} propertyId
 * @param {string} propertyName
 * @returns {Promise<{ results: Array<{ themes: object[], reviews: object[], language: string }>, errors: string[] }>}
 */
export async function runBatchExtraction(languageGroups, propertyId, propertyName) {
  const entries = Object.entries(languageGroups)

  const settled = await Promise.allSettled(
    entries.map(async ([language, reviews]) => {
      const prompt = buildLanguageBatchThemePrompt(reviews, language, propertyId, propertyName)
      const { rawResponse } = await callClaude(prompt)
      const validated = validateThemes(rawResponse)
      return { themes: validated.themes, reviews, language }
    }),
  )

  const results = []
  const errors = []

  for (let i = 0; i < settled.length; i++) {
    const outcome = settled[i]
    if (outcome.status === 'fulfilled') {
      results.push(outcome.value)
    } else {
      const lang = entries[i][0]
      const msg = outcome.reason instanceof Error ? outcome.reason.message : String(outcome.reason)
      errors.push(`[${lang}] ${msg}`)
    }
  }

  return { results, errors }
}
