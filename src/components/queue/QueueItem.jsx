function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function excerpt(text, max = 160) {
  if (!text) return null
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

export default function QueueItem({ review, score, onDraftResponse }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center justify-center rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 shrink-0 min-w-[56px]">
          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Score</span>
          <span className="text-xl font-bold text-amber-700">{score}</span>
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-900">{review.propertyName || '—'}</span>
            {review.city && (
              <span className="text-sm text-gray-500">{review.city}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {review.rating !== null ? (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                {review.rating.toFixed(1)}
                <span className="text-amber-400">★</span>
              </span>
            ) : (
              <span className="text-xs text-gray-400">No rating</span>
            )}

            {review.channel && (
              <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                {review.channel.charAt(0).toUpperCase() + review.channel.slice(1)}
              </span>
            )}

            {review.language && (
              <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {review.language.toUpperCase()}
              </span>
            )}

            <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
          </div>

          {review.reviewText && (
            <p className="text-sm text-gray-600 leading-relaxed">{excerpt(review.reviewText)}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDraftResponse?.(review)}
          className="shrink-0 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          Respond
        </button>
      </div>
    </div>
  )
}
