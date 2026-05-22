import { useMemo } from 'react'
import { useReviews } from '../state/useReviews.js'
import { portfolioStats } from '../metrics/portfolioStats.js'
import KpiCard from '../components/overview/KpiCard.jsx'
import RatingTrendChart from '../components/overview/RatingTrendChart.jsx'
import PortfolioInsights from '../components/overview/PortfolioInsights.jsx'

export default function PortfolioOverview() {
  const { filteredReviews } = useReviews()
  const stats = useMemo(() => portfolioStats(filteredReviews), [filteredReviews])

  return (
    <div className="max-w-5xl space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Total Reviews" value={stats.totalReviews.toLocaleString()} />
        <KpiCard
          label="Average Rating"
          value={stats.averageRating !== null ? `${stats.averageRating.toFixed(2)} ★` : '—'}
          accent="text-indigo-600"
        />
        <KpiCard
          label="Response Rate"
          value={`${(stats.responseRate * 100).toFixed(1)}%`}
          sub={`${stats.unanswered} unanswered`}
        />
        <KpiCard
          label="Unanswered"
          value={stats.unanswered.toLocaleString()}
          accent={stats.unanswered > 0 ? 'text-amber-600' : 'text-gray-900'}
        />
      </div>
      <RatingTrendChart reviews={filteredReviews} />
      <PortfolioInsights />
    </div>
  )
}
