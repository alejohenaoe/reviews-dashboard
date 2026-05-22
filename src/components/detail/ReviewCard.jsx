import VibeScore from '../ai/VibeScore.jsx'

function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function StarRating({ rating }) {
  if (rating === null || !Number.isFinite(rating)) {
    return <span className="text-xs text-gray-400">No rating</span>
  }
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
      {rating.toFixed(1)}
      <span className="text-amber-400">★</span>
    </span>
  )
}

export default function ReviewCard({ review, onDraftResponse }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StarRating rating={review.rating} />

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

        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            review.hasResponse
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}
        >
          {review.hasResponse ? 'Responded' : 'No response'}
        </span>
      </div>

      {review.reviewText ? (
        <p className="text-sm text-gray-700 leading-relaxed">{review.reviewText}</p>
      ) : (
        <p className="text-sm text-gray-400 italic">No review text provided.</p>
      )}

      <VibeScore review={review} />

      {onDraftResponse && !review.hasResponse && (
        <button
          type="button"
          onClick={() => onDraftResponse(review)}
          className="text-xs text-indigo-600 hover:text-indigo-800 underline"
        >
          Draft response
        </button>
      )}
    </div>
  )
}
