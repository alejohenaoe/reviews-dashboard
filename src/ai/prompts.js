/**
 * Build the prompt for language-batch theme extraction (based on prompt-5.md schema).
 * Reviews must already be filtered to a single language batch before calling this.
 *
 * @param {object[]} reviews      Array of review objects for this batch
 * @param {string}   language     Language code for this batch (e.g. 'en', 'es', 'unknown')
 * @param {string}   propertyId   Property ID to embed in the prompt
 * @param {string}   propertyName Property name to embed in the prompt
 */
export function buildLanguageBatchThemePrompt(reviews, language, propertyId, propertyName) {
  const reviewsList = reviews
    .map((r, i) =>
      JSON.stringify({ index: i, language: r.language ?? language, rating: r.rating ?? null, text: r.reviewText ?? '' }),
    )
    .join('\n')

  return `You are an assistant for analyzing vacation rental reviews.

Your job is to extract recurring themes from a set of guest reviews with high precision and low noise.

Follow these rules exactly:
- Analyze the reviews semantically.
- Do not translate the reviews before analysis.
- Keep the original language of each review excerpt unchanged.
- Do not create separate themes only because reviews are in different languages.
- Canonical theme names must be in English.
- Output only valid JSON.
- If the input is insufficient, still return valid JSON with an empty themes array.
- Do not include any commentary, notes, markdown, or code fences in the response.
- Do not compute ratings, averages, counts beyond what is explicitly requested in the schema.

Analyze the following reviews for property:

- Property name: ${propertyName}
- Property ID: ${propertyId}
- Language batch: ${language}
- Review count: ${reviews.length}

### Reviews
Each item contains:
- index: the zero-based review index within this batch
- language: the original review language
- rating: numeric rating if available
- text: original review text, unchanged

${reviewsList}

Extraction rules:
1. Group semantically equivalent comments into the same theme.
2. Prefer a single canonical English name for each theme — names must be specific and operational (e.g. "Broken Air Conditioning" not "AC Issues", "Noisy Street at Night" not "Noise").
3. If the same issue appears in multiple reviews, merge it into one theme.
4. Keep themes operationally meaningful and specific. Avoid broad labels like "Service" or "Cleanliness" unless the reviews clearly support that abstraction.
5. Avoid duplicate or near-duplicate themes.
6. Limit the output to the most important themes only. Prefer fewer, stronger themes.
7. A theme requires at least 2 supporting reviews unless it is a severe isolated complaint (rating 1 or 2).
8. If there are no clear recurring themes, return an empty themes array.
9. Structure the output so each theme can be rendered as a dashboard card.

Return exactly this JSON shape — no markdown, no code fences, no prose:

{
  "propertyId": "${propertyId}",
  "propertyName": "${propertyName}",
  "themes": [
    {
      "name": "Canonical English theme name",
      "sentiment": "positive | negative | mixed",
      "count": 0,
      "reviewIndices": [0, 1, 2],
      "summary": "Short English summary of the recurring pattern (max 120 chars)",
      "languages": ["en", "es"],
      "evidence": [
        {
          "index": 0,
          "language": "en",
          "excerpt": "Original review excerpt, unchanged, max 200 chars"
        }
      ]
    }
  ]
}`
}

/**
 * Build the prompt for per-review vibe score analysis.
 */
export function buildVibeScorePrompt(review) {
  return `Analyze the emotional tone of this guest review independently from its numeric rating.

Review text: "${review.reviewText}"
Numeric rating given: ${review.rating ?? 'none'}
Review language: ${review.language ?? 'unknown'}

Return ONLY a valid JSON object with exactly these fields:
- "vibeScore": integer from 1 (very negative) to 5 (very positive) based solely on the text sentiment — use the same 1–5 scale as the numeric star rating so both can be compared directly
- "vibeLabel": short label describing the emotional tone (e.g. "Frustrated", "Delighted", "Neutral")
- "mismatch": boolean — true if the text sentiment and the numeric rating appear to disagree significantly
- "mismatchNote": short English explanation of the mismatch (string) — include only when mismatch is true, omit otherwise
- "dominantEmotion": single English word describing the strongest emotion in the text

Respond with ONLY the JSON object. No markdown, no code fences, no prose.`
}

/**
 * Build the prompt for drafting a host response to a review.
 * Instructs Claude to respond in the SAME language as the review.
 */
export function buildDraftResponsePrompt(review) {
  const tone =
    review.rating !== null && review.rating <= 2
      ? 'apologetic and solution-focused'
      : review.rating !== null && review.rating >= 4
        ? 'warm and grateful'
        : 'balanced and professional'

  return `You are a short-term rental host. Write a response to the following guest review.

Rules:
- Write the response in the SAME language as the review (language code: ${review.language ?? 'unknown'}).
- Tone should be ${tone} (rating: ${review.rating ?? 'none'}).
- Keep the response concise — 3 to 5 sentences maximum.
- Be specific to the content of the review.
- Do NOT use placeholders like [Your Name] or [Property Name].
- Respond with ONLY the response text — no labels, no JSON, no explanation.

Guest review:
"${review.reviewText}"`
}
