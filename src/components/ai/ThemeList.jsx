import ThemeCard from './ThemeCard.jsx'
import AiDebugPanel from './AiDebugPanel.jsx'

export default function ThemeList({ themes, isLoading, error, debug, onRetry }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 justify-center">
        <svg className="h-4 w-4 animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm text-gray-400">Extracting themes…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm text-red-700">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="shrink-0 text-xs font-medium text-red-700 hover:text-red-900 underline"
            >
              Retry
            </button>
          )}
        </div>
        <AiDebugPanel debug={debug} />
      </div>
    )
  }

  if (!themes) return null

  if (themes.length === 0) {
    return (
      <p className="text-xs text-gray-400 px-1">
        No recurring themes found in the reviews for this selection.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {themes.map((theme) => (
        <ThemeCard key={theme.name} theme={theme} />
      ))}
      <AiDebugPanel debug={debug} />
    </div>
  )
}
