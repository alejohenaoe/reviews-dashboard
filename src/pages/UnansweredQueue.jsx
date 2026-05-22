import { useMemo } from 'react'
import { useReviews } from '../state/useReviews.js'
import { unansweredByPriority } from '../metrics/priorityScore.js'
import PriorityExplainer from '../components/queue/PriorityExplainer.jsx'
import QueueList from '../components/queue/QueueList.jsx'

export default function UnansweredQueue() {
  const { reviews } = useReviews()

  const queue = useMemo(() => unansweredByPriority(reviews), [reviews])

  return (
    <div className="max-w-5xl space-y-4">
      <PriorityExplainer />
      <QueueList queue={queue} />
    </div>
  )
}
