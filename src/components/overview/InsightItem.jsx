import SentimentBadge from '../ai/SentimentBadge.jsx'

export default function InsightItem({ theme }) {
  return (
    <div className="flex flex-wrap items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
        <span className="font-medium text-sm text-gray-900">{theme.name}</span>
        <SentimentBadge sentiment={theme.sentiment} />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 shrink-0">
        <span>{theme.totalCount} mentions</span>
        <span className="text-gray-300">·</span>
        <span>{theme.affectedPropertyCount} {theme.affectedPropertyCount === 1 ? 'property' : 'properties'}</span>
        {(theme.languages ?? []).map((lang) => (
          <span
            key={lang}
            className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600"
          >
            {lang.toUpperCase()}
          </span>
        ))}
      </div>

      <p className="w-full text-xs text-gray-600 leading-relaxed">{theme.summary}</p>
    </div>
  )
}
