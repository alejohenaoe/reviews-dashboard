import { useState, useCallback, useMemo } from 'react'
import { useReviews } from '../../state/useReviews.js'
import { useThemes } from '../../state/useThemes.js'
import { groupByLanguage, runBatchExtraction } from '../../ai/extractThemesBatch.js'
import { mergePropertyThemes, aggregatePortfolioThemes } from '../../metrics/aggregateThemes.js'
import AiDebugPanel from '../ai/AiDebugPanel.jsx'
import InsightItem from './InsightItem.jsx'

const MAX_INSIGHTS = 5
const PORTFOLIO_ID = '__portfolio__'
const PORTFOLIO_NAME = 'Portfolio'

export default function PortfolioInsights() {
  const { reviews } = useReviews()
  const { themesByPropertyId, startExtraction, setExtractionSuccess, setExtractionError } =
    useThemes()

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progressTotal, setProgressTotal] = useState(0)
  const [batchErrors, setBatchErrors] = useState([])

  const portfolioEntry = themesByPropertyId.get(PORTFOLIO_ID) ?? null

  const insights = useMemo(() => {
    if (!portfolioEntry?.themes?.length) return null
    // Wrap in a Map keyed by portfolio ID to reuse aggregatePortfolioThemes
    const map = new Map([[PORTFOLIO_ID, { themes: portfolioEntry.themes, propertyName: PORTFOLIO_NAME }]])
    return aggregatePortfolioThemes(map)
  }, [portfolioEntry])

  const analyzePortfolio = useCallback(async () => {
    if (isAnalyzing || reviews.length === 0) return
    setIsAnalyzing(true)
    setBatchErrors([])

    const languageGroups = groupByLanguage(reviews)
    const total = Object.keys(languageGroups).length
    setProgressTotal(total)

    startExtraction(PORTFOLIO_ID, PORTFOLIO_NAME)

    try {
      const { results, errors } = await runBatchExtraction(languageGroups, PORTFOLIO_ID, PORTFOLIO_NAME)
      const merged = mergePropertyThemes(results)

      const debugSummary = {
        prompt: `Language batches: ${Object.keys(languageGroups).join(', ')}`,
        rawResponse: `${results.length} batches succeeded, ${errors.length} failed`,
        parseError: errors.length > 0 ? errors.join('\n') : null,
      }

      setExtractionSuccess(PORTFOLIO_ID, PORTFOLIO_NAME, merged, debugSummary)
      if (errors.length > 0) setBatchErrors(errors)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setExtractionError(PORTFOLIO_ID, PORTFOLIO_NAME, msg, { prompt: null, rawResponse: null, parseError: msg })
    }

    setIsAnalyzing(false)
  }, [isAnalyzing, reviews, startExtraction, setExtractionSuccess, setExtractionError])

  const isLoading = portfolioEntry?.isLoading ?? false
  const error = portfolioEntry?.error ?? null
  const hasResults = insights !== null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">Portfolio Theme Insights</p>
        <button
          type="button"
          onClick={analyzePortfolio}
          disabled={isAnalyzing || isLoading || reviews.length === 0}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {isAnalyzing || isLoading
            ? `Analyzing ${progressTotal} language ${progressTotal === 1 ? 'group' : 'groups'}…`
            : hasResults
              ? 'Re-analyze'
              : 'Analyze Portfolio'}
        </button>
      </div>

      {batchErrors.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 space-y-1">
          <p className="text-xs font-medium text-amber-700">
            {batchErrors.length} language {batchErrors.length === 1 ? 'batch' : 'batches'} failed — results may be partial.
          </p>
          <ul className="space-y-0.5">
            {batchErrors.map((e, i) => (
              <li key={i} className="text-xs text-amber-700 font-mono">{e}</li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {portfolioEntry?.debug && <AiDebugPanel debug={portfolioEntry.debug} />}

      {(isAnalyzing || isLoading) && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="h-4 w-4 animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Running parallel language analysis…
        </div>
      )}

      {insights && (
        <div className="space-y-4">
          {insights.negative.length > 0 && (
            <section>
              <p className="text-xs font-medium text-gray-500 mb-2">Top issues</p>
              <div className="space-y-2">
                {insights.negative.slice(0, MAX_INSIGHTS).map((t) => (
                  <InsightItem key={t.name} theme={t} />
                ))}
              </div>
            </section>
          )}

          {insights.positive.length > 0 && (
            <section>
              <p className="text-xs font-medium text-gray-500 mb-2">Top highlights</p>
              <div className="space-y-2">
                {insights.positive.slice(0, MAX_INSIGHTS).map((t) => (
                  <InsightItem key={t.name} theme={t} />
                ))}
              </div>
            </section>
          )}

          {insights.negative.length === 0 && insights.positive.length === 0 && (
            <p className="text-xs text-gray-400">No recurring themes found across the portfolio.</p>
          )}
        </div>
      )}

      {!insights && !isLoading && !isAnalyzing && !error && (
        <p className="text-xs text-gray-400">
          Click &ldquo;Analyze Portfolio&rdquo; to extract recurring themes across all reviews.
        </p>
      )}
    </div>
  )
}
