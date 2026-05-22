import { useCallback, useState } from 'react'
import { useAiRequest } from '../../ai/useAiRequest.js'
import { buildVibeScorePrompt } from '../../ai/prompts.js'
import { validateVibeScore } from '../../ai/validateVibeScore.js'
import AiDebugPanel from './AiDebugPanel.jsx'

function scoreBadgeStyle(score) {
  if (score <= 2) return 'bg-red-50 border-red-200 text-red-700'
  if (score === 3) return 'bg-amber-50 border-amber-200 text-amber-700'
  return 'bg-emerald-50 border-emerald-200 text-emerald-700'
}

export default function VibeScore({ review }) {
  const promptFn = useCallback((r) => buildVibeScorePrompt(r), [])
  const { data, isLoading, error, debug, run } = useAiRequest(promptFn, validateVibeScore)
  const [analyzed, setAnalyzed] = useState(false)

  function handleAnalyze() {
    setAnalyzed(true)
    run(review)
  }

  if (!analyzed) {
    return (
      <button
        type="button"
        onClick={handleAnalyze}
        className="text-xs text-indigo-600 hover:text-indigo-800 underline"
      >
        Analyze sentiment
      </button>
    )
  }

  if (isLoading) {
    return <span className="text-xs text-gray-400">Analyzing sentiment…</span>
  }

  if (error) {
    return (
      <div className="space-y-1">
        <p className="text-xs text-red-600">{error}</p>
        <AiDebugPanel debug={debug} />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${scoreBadgeStyle(data.vibeScore)}`}>
          Vibe {data.vibeScore}/5 ★
        </span>
        <span className="text-xs text-gray-600">{data.vibeLabel}</span>
        <span className="text-xs text-gray-400">· {data.dominantEmotion}</span>
        <button
          type="button"
          onClick={() => run(review)}
          className="text-xs text-gray-400 hover:text-indigo-600"
          title="Re-analyze"
        >
          ↺
        </button>
      </div>

      {data.mismatch && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-700">
          ⚠ Rating mismatch: {data.mismatchNote}
        </div>
      )}

      <AiDebugPanel debug={debug} />
    </div>
  )
}
