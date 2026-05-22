# Theme Extraction Prompt

## Purpose
Extract recurring guest themes from review text for a single property or a small, language-homogeneous batch of reviews.

This prompt is designed for Claude API with Claude Sonnet 4.6.

The dashboard will render each extracted theme as a card, so the output must be compact, structured, and easy to visualize.

## Important constraints
- Do not translate the review text before analysis.
- Keep every review excerpt in its original language.
- Do not treat language differences as separate themes by default.
- Extract themes from meaning, not from exact wording.
- Use AI only for semantic theme extraction.
- Do not calculate business metrics, portfolio totals, or rankings here.
- Do not invent themes that are not supported by the reviews.
- Return strict JSON only. No prose. No markdown fences. No explanations.

## Recommended usage
Use this prompt on:
1. Reviews for one property at a time.
2. Preferably a single language batch per call when possible.
3. If you already grouped reviews by language, keep the output structure consistent so a deterministic merge step can combine equivalent themes later.

---

## System message
You are an assistant for analyzing vacation rental reviews.

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
- Do not mention hidden reasoning.

## User message
Analyze the following reviews for property:

- Property name: {{PROPERTY_NAME}}
- Property ID: {{PROPERTY_ID}}
- Language batch: {{LANGUAGE_BATCH}}
- Review count: {{REVIEW_COUNT}}

### Reviews
Each item contains:
- index: the zero-based review index within this batch
- language: the original review language
- rating: numeric rating if available
- text: original review text, unchanged

{{REVIEWS_LIST}}

## Extraction rules
1. Group semantically equivalent comments into the same theme.
2. Prefer a single canonical English name for each theme.
3. If the same issue appears in multiple languages, merge it into one theme.
4. Use the original review language only as evidence, not as a theme boundary.
5. Keep themes operationally meaningful and specific.
6. Avoid overly broad themes such as "Service" unless the reviews clearly support that level of abstraction.
7. Avoid duplicate or near-duplicate themes.
8. Limit the output to the most important themes only.
9. If there are no clear recurring themes, return an empty array.
10. Structure the output so each theme can be rendered as a dashboard card.

## Dashboard card intent
Each theme will be shown in the UI as a card with:
- theme name
- sentiment badge
- mention count
- language badges
- short summary
- optional review evidence on expand

To support that UI, include enough structured data for each theme to render cleanly.

## Output schema
Return exactly this JSON shape:

{
  "propertyId": "{{PROPERTY_ID}}",
  "propertyName": "{{PROPERTY_NAME}}",
  "themes": [
    {
      "name": "Canonical English theme name",
      "sentiment": "positive | negative | mixed",
      "count": 0,
      "reviewIndices": [0, 1, 2],
      "summary": "Short English summary of the recurring pattern",
      "languages": ["en", "es", "pt"],
      "evidence": [
        {
          "index": 0,
          "language": "en",
          "excerpt": "Original review excerpt, unchanged"
        }
      ]
    }
  ]
}

## Field requirements
- `propertyId`: copy exactly from input.
- `propertyName`: copy exactly from input.
- `themes`: array of theme objects.
- `name`: canonical English label for the theme.
- `sentiment`: one of `positive`, `negative`, or `mixed`.
- `count`: number of reviews that support the theme.
- `reviewIndices`: indices of the supporting reviews from the input batch.
- `summary`: short English sentence describing the recurring pattern.
- `languages`: array of language codes represented in the supporting reviews.
- `evidence`: optional supporting excerpts for UI expansion. Keep excerpts short and unchanged.

## Validation rules
- Return only themes that are clearly supported by the text.
- `count` must match the number of review indices provided.
- `reviewIndices` must contain unique indices only.
- Do not include invalid indices.
- Do not include non-JSON text.
- If no themes are found, return:

{
  "propertyId": "{{PROPERTY_ID}}",
  "propertyName": "{{PROPERTY_NAME}}",
  "themes": []
}

## Quality bar
Prefer:
- fewer, stronger themes
- clearer operational meaning
- better grouping across languages
- canonical English labels that are easy to reuse in the UI
- card-ready output that is concise and easy to scan

Avoid:
- overly granular themes
- duplicate themes
- themes based on one weak mention
- language-specific duplicates
- vague labels that do not help operations