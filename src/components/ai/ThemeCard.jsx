import SentimentBadge from './SentimentBadge.jsx'

export default function ThemeCard({ theme }) {
  const evidence = Array.isArray(theme.evidence) ? theme.evidence : []

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-sm text-gray-900">{theme.name}</span>
        <SentimentBadge sentiment={theme.sentiment} />
        <span className="text-xs text-gray-500">{theme.count} {theme.count === 1 ? 'review' : 'reviews'}</span>
        <div className="ml-auto flex flex-wrap gap-1">
          {(theme.languages ?? []).map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600"
            >
              {lang.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed">{theme.summary}</p>

      {evidence.length > 0 && (
        <details className="mt-1">
          <summary className="cursor-pointer select-none text-xs text-indigo-600 hover:text-indigo-800">
            Show evidence ({evidence.length})
          </summary>
          <div className="mt-2 space-y-2">
            {evidence.map((ev, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-gray-200 pl-3 text-xs text-gray-600 leading-relaxed italic"
              >
                <span className="not-italic font-medium text-gray-400 mr-1">
                  {ev.language?.toUpperCase()}
                </span>
                {ev.excerpt}
              </blockquote>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
