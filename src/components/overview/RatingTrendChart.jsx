import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { monthlyTrend } from '../../metrics/monthlyTrend.js'

function formatMonth(key) {
  const [y, m] = key.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  })
}

export default function RatingTrendChart({ reviews }) {
  const data = useMemo(
    () =>
      monthlyTrend(reviews)
        .slice(-12)
        .map((t) => ({
          month: formatMonth(t.month),
          rating: t.averageRating !== null ? Number(t.averageRating.toFixed(2)) : null,
          reviews: t.count,
        })),
    [reviews],
  )

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="mb-4 text-sm font-semibold text-gray-700">Rating Trend — Last 12 Months</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: '8px', borderColor: '#e2e8f0' }}
            formatter={(v) => [v !== null ? v.toFixed(2) : 'N/A', 'Avg Rating']}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3, fill: '#6366f1' }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
