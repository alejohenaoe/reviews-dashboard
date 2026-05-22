import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useReviews } from '../state/useReviews.js'
import { reviewsForProperty, propertySummaries } from '../metrics/propertySummary.js'
import { applyFilters } from '../metrics/filters.js'
import PropertyHeader from '../components/detail/PropertyHeader.jsx'
import PropertyStats from '../components/detail/PropertyStats.jsx'
import DetailFilters from '../components/detail/DetailFilters.jsx'
import ReviewList from '../components/detail/ReviewList.jsx'

const EMPTY_FILTERS = {
  dateFrom: null,
  dateTo: null,
  channels: [],
  languages: [],
  ratingMin: null,
  ratingMax: null,
}

export default function PropertyDetail() {
  const { id } = useParams()
  const { reviews, isLoading } = useReviews()
  const [localFilters, setLocalFilters] = useState(EMPTY_FILTERS)

  const propertyReviews = useMemo(
    () => reviewsForProperty(reviews, id),
    [reviews, id],
  )

  const summary = useMemo(
    () => propertySummaries(propertyReviews)[0] ?? null,
    [propertyReviews],
  )

  const availableChannels = useMemo(
    () => [...new Set(propertyReviews.map((r) => r.channel).filter(Boolean))].sort(),
    [propertyReviews],
  )

  const availableLanguages = useMemo(
    () => [...new Set(propertyReviews.map((r) => r.language).filter(Boolean))].sort(),
    [propertyReviews],
  )

  const filteredReviews = useMemo(
    () => applyFilters(propertyReviews, localFilters),
    [propertyReviews, localFilters],
  )

  if (isLoading) {
    return (
      <div className="max-w-5xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="max-w-5xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
          <p className="text-sm font-medium text-gray-500">Property not found</p>
          <p className="mt-1 text-xs text-gray-400 font-mono">{id}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-4">
      <PropertyHeader propertyName={summary.propertyName} city={summary.city} />
      <PropertyStats summary={summary} />
      <DetailFilters
        filters={localFilters}
        onFiltersChange={setLocalFilters}
        availableChannels={availableChannels}
        availableLanguages={availableLanguages}
      />
      <ReviewList reviews={filteredReviews} />
    </div>
  )
}
