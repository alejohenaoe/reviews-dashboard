/**
 * Merge language-batch extraction results for a single property into a flat theme list.
 * Deduplicates by lowercase canonical name, sums counts, unions languages and evidence.
 * Pure function — no AI involved.
 *
 * @param {Array<{ themes: object[], reviews: object[], language: string }>} batchResults
 * @returns {object[]}  Flat, deduplicated Theme[]
 */
export function mergePropertyThemes(batchResults) {
  const byName = new Map()

  for (const { themes } of batchResults) {
    for (const theme of themes) {
      const key = theme.name.trim().toLowerCase()
      if (!byName.has(key)) {
        byName.set(key, {
          name: theme.name.trim(),
          sentiment: theme.sentiment,
          count: 0,
          languages: new Set(),
          summary: theme.summary,
          evidence: [],
        })
      }
      const merged = byName.get(key)
      merged.count += theme.count
      for (const lang of theme.languages ?? []) merged.languages.add(lang)
      for (const ev of theme.evidence ?? []) merged.evidence.push(ev)
    }
  }

  return Array.from(byName.values()).map((t) => ({
    name: t.name,
    sentiment: t.sentiment,
    count: t.count,
    languages: [...t.languages].sort(),
    summary: t.summary,
    evidence: t.evidence,
  }))
}

/**
 * Aggregate per-property themes into portfolio-level insights.
 * Groups by canonical theme name across all properties.
 * Returns three sorted lists (by totalCount desc): negative, positive, mixed.
 * Pure function — no AI involved.
 *
 * @param {Map<string, { themes: object[], propertyName: string }>} themesByPropertyId
 * @returns {{ negative: object[], positive: object[], mixed: object[] }}
 */
export function aggregatePortfolioThemes(themesByPropertyId) {
  const byName = new Map()

  for (const [propertyId, { themes }] of themesByPropertyId) {
    if (!themes?.length) continue
    for (const theme of themes) {
      const key = theme.name.trim().toLowerCase()
      if (!byName.has(key)) {
        byName.set(key, {
          name: theme.name.trim(),
          sentiment: theme.sentiment,
          totalCount: 0,
          affectedProperties: new Set(),
          languages: new Set(),
          summary: theme.summary,
        })
      }
      const agg = byName.get(key)
      agg.totalCount += theme.count
      agg.affectedProperties.add(propertyId)
      for (const lang of theme.languages ?? []) agg.languages.add(lang)
    }
  }

  const all = Array.from(byName.values()).map((agg) => ({
    name: agg.name,
    sentiment: agg.sentiment,
    totalCount: agg.totalCount,
    affectedPropertyCount: agg.affectedProperties.size,
    languages: [...agg.languages].sort(),
    summary: agg.summary,
  }))

  const sortByCount = (a, b) => b.totalCount - a.totalCount

  return {
    negative: all.filter((t) => t.sentiment === 'negative').sort(sortByCount),
    positive: all.filter((t) => t.sentiment === 'positive').sort(sortByCount),
    mixed: all.filter((t) => t.sentiment === 'mixed').sort(sortByCount),
  }
}
