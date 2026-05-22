import KpiCard from '../overview/KpiCard.jsx'

const fmt = (n) => (n !== null && Number.isFinite(n) ? n.toFixed(2) : '—')
const fmtPct = (n) => (n !== null && Number.isFinite(n) ? `${(n * 100).toFixed(0)}%` : '—')

const SUB_RATING_LABELS = {
  cleanliness: 'Cleanliness',
  location: 'Location',
  checkin: 'Check-in',
  communication: 'Communication',
  value: 'Value',
}

export default function PropertyStats({ summary }) {
  if (!summary) return null

  const hasSubRatings = Object.values(summary.subRatingAverages).some(
    (v) => v !== null && Number.isFinite(v),
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Total Reviews"
          value={summary.totalReviews.toLocaleString()}
        />
        <KpiCard
          label="Average Rating"
          value={summary.averageRating !== null ? `${fmt(summary.averageRating)} ★` : '—'}
          accent="text-indigo-600"
        />
        <KpiCard
          label="Response Rate"
          value={fmtPct(summary.responseRate)}
          sub={`${summary.unanswered} unanswered`}
        />
        <KpiCard
          label="Unanswered"
          value={summary.unanswered.toLocaleString()}
          accent={summary.unanswered > 0 ? 'text-amber-600' : 'text-gray-900'}
        />
      </div>

      {hasSubRatings && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
            Sub-ratings
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(summary.subRatingAverages).map(([key, val]) => {
              if (val === null || !Number.isFinite(val)) return null
              return (
                <div
                  key={key}
                  className="flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"
                >
                  <span className="text-xs text-gray-500">{SUB_RATING_LABELS[key]}</span>
                  <span className="mt-0.5 text-base font-semibold text-gray-900">
                    {val.toFixed(1)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
