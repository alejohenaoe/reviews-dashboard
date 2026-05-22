const STYLES = {
  positive: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  negative: 'bg-red-50 border-red-200 text-red-700',
  mixed: 'bg-amber-50 border-amber-200 text-amber-700',
}

export default function SentimentBadge({ sentiment }) {
  const style = STYLES[sentiment] ?? 'bg-gray-50 border-gray-200 text-gray-600'
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {sentiment}
    </span>
  )
}
