import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useReviews } from '../state/useReviews.js'
import { useThemes } from '../state/useThemes.js'
import { reviewsForProperty, propertySummaries } from '../metrics/propertySummary.js'
import { applyFilters } from '../metrics/filters.js'
import { groupByLanguage, runBatchExtraction } from '../ai/extractThemesBatch.js'
import { mergePropertyThemes } from '../metrics/aggregateThemes.js'
import PropertyHeader from '../components/detail/PropertyHeader.jsx'
import PropertyStats from '../components/detail/PropertyStats.jsx'
import DetailFilters from '../components/detail/DetailFilters.jsx'
import ReviewList from '../components/detail/ReviewList.jsx'
import ThemeList from '../components/ai/ThemeList.jsx'
import DraftResponseModal from '../components/ai/DraftResponseModal.jsx'

const EMPTY_FILTERS = {
  dateFrom: null,
  dateTo: null,
  channels: [],
  languages: [],
  ratingMin: null,
  ratingMax: null,
}

export default function PropertyDetail() {
  const { id } = useParams()
  const { reviews, isLoading } = useReviews()
  const { themesByPropertyId, startExtraction, setExtractionSuccess, setExtractionError } =
    useThemes()
  const [localFilters, setLocalFilters] = useState(EMPTY_FILTERS)
  const [draftReview, setDraftReview] = useState(null)

  const propertyReviews = useMemo(
    () => reviewsForProperty(reviews, id),
    [reviews, id],
  )

  const summary = useMemo(
    () => propertySummaries(propertyReviews)[0] ?? null,
    [propertyReviews],
  )

  const availableChannels = useMemo(
    () => [...new Set(propertyReviews.map((r) => r.channel).filter(Boolean))].sort(),
    [propertyReviews],
  )

  const availableLanguages = useMemo(
    () => [...new Set(propertyReviews.map((r) => r.language).filter(Boolean))].sort(),
    [propertyReviews],
  )

  const filteredReviews = useMemo(
    () => applyFilters(propertyReviews, localFilters),
    [propertyReviews, localFilters],
  )

  const themeEntry = themesByPropertyId.get(id) ?? null

  const analyzeThemes = useCallback(async () => {
    if (!propertyReviews.length || !summary) return
    const propertyName = summary.propertyName
    startExtraction(id, propertyName)
    try {
      const languageGroups = groupByLanguage(propertyReviews)
      const { results, errors } = await runBatchExtraction(languageGroups, id, propertyName)
      const merged = mergePropertyThemes(results)
      const debugSummary = {
        prompt: `Language batches: ${Object.keys(languageGroups).join(', ')}`,
        rawResponse: `${results.length} batches succeeded, ${errors.length} failed`,
        parseError: errors.length > 0 ? errors.join('\n') : null,
      }
      setExtractionSuccess(id, propertyName, merged, debugSummary)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setExtractionError(id, propertyName, msg, { prompt: null, rawResponse: null, parseError: msg })
    }
  }, [id, propertyReviews, summary, startExtraction, setExtractionSuccess, setExtractionError])

  if (isLoading) {
    return (
      <div className="max-w-5xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="max-w-5xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
          <p className="text-sm font-medium text-gray-500">Property not found</p>
          <p className="mt-1 text-xs text-gray-400 font-mono">{id}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-4">
      <PropertyHeader propertyName={summary.propertyName} city={summary.city} />
      <PropertyStats summary={summary} />
      <DetailFilters
        filters={localFilters}
        onFiltersChange={setLocalFilters}
        availableChannels={availableChannels}
        availableLanguages={availableLanguages}
      />
      <ReviewList reviews={filteredReviews} onDraftResponse={setDraftReview} />

      <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Recurring Themes</p>
          <button
            type="button"
            onClick={analyzeThemes}
            disabled={themeEntry?.isLoading}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {themeEntry?.isLoading ? 'Analyzing…' : themeEntry ? 'Re-analyze' : 'Analyze themes'}
          </button>
        </div>
        <ThemeList
          themes={themeEntry?.themes ?? null}
          isLoading={themeEntry?.isLoading ?? false}
          error={themeEntry?.error ?? null}
          debug={themeEntry?.debug ?? null}
          onRetry={analyzeThemes}
        />
      </div>

      <DraftResponseModal
        review={draftReview}
        isOpen={draftReview !== null}
        onClose={() => setDraftReview(null)}
      />
    </div>
  )
}
