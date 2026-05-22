import { useMemo } from 'react'
import { useReviews } from '../state/useReviews.js'
import { propertySummaries } from '../metrics/propertySummary.js'
import PropertyTable from '../components/properties/PropertyTable.jsx'

export default function Properties() {
  const { filteredReviews } = useReviews()
  const summaries = useMemo(() => propertySummaries(filteredReviews), [filteredReviews])

  return (
    <div className="max-w-7xl space-y-4">
      <p className="text-sm text-gray-500">{summaries.length} properties</p>
      <PropertyTable summaries={summaries} />
    </div>
  )
}
