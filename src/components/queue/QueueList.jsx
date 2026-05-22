import QueueItem from './QueueItem.jsx'

function EmptyState() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
      <svg
        className="mx-auto mb-3 h-10 w-10 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <p className="text-sm font-medium text-gray-500">All reviews have been answered</p>
      <p className="mt-1 text-xs text-gray-400">No unanswered reviews in the queue.</p>
    </div>
  )
}

export default function QueueList({ queue, onDraftResponse }) {
  if (queue.length === 0) return <EmptyState />

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">{queue.length} unanswered review{queue.length !== 1 ? 's' : ''}</p>
      {queue.map(({ review, score }) => (
        <QueueItem key={review.id} review={review} score={score} onDraftResponse={onDraftResponse} />
      ))}
    </div>
  )
}
