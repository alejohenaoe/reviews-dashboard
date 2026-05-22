export default function UnansweredQueue() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
        <svg className="mx-auto mb-3 h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <p className="text-sm font-medium text-gray-500">Unanswered Queue</p>
        <p className="mt-1 text-xs text-gray-400">Priority queue coming in the next phase.</p>
      </div>
    </div>
  )
}
