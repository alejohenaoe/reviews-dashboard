import ReviewCard from './ReviewCard.jsx'

function EmptyState() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
      <svg
        className="mx-auto mb-3 h-10 w-10 text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <p className="text-sm font-medium text-gray-500">No reviews match your filters</p>
      <p className="mt-1 text-xs text-gray-400">Try adjusting or resetting the filters above.</p>
    </div>
  )
}

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) return <EmptyState />

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
