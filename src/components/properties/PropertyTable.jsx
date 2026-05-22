import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RiskBadge from './RiskBadge.jsx'

const fmt = (n) => (n !== null && Number.isFinite(n) ? n.toFixed(2) : '—')
const fmtPct = (n) => (n !== null && Number.isFinite(n) ? `${(n * 100).toFixed(0)}%` : '—')
const fmtDate = (d) =>
  d instanceof Date
    ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—'

const COLUMNS = [
  { key: 'propertyName', label: 'Property' },
  { key: 'city', label: 'City' },
  { key: 'risk', label: 'Risk', sortKey: 'averageRating' },
  { key: 'averageRating', label: 'Avg ★' },
  { key: 'totalReviews', label: 'Reviews' },
  { key: 'responseRate', label: 'Response' },
  { key: 'lastReviewDate', label: 'Last Review' },
  { key: 'cleanliness', label: 'Clean' },
  { key: 'location', label: 'Loc' },
  { key: 'checkin', label: 'Check-in' },
  { key: 'communication', label: 'Comm' },
  { key: 'value', label: 'Value' },
]

const SUB_KEYS = new Set(['cleanliness', 'location', 'checkin', 'communication', 'value'])

function getSortValue(row, key) {
  if (key === 'averageRating') return row.averageRating ?? -1
  if (key === 'lastReviewDate') return row.lastReviewDate?.getTime() ?? 0
  if (SUB_KEYS.has(key)) return row.subRatingAverages[key] ?? -1
  return row[key] ?? ''
}

function SortIndicator({ colKey, sort }) {
  if (sort.key !== colKey) return <span className="ml-1 text-gray-300">↕</span>
  return <span className="ml-1 text-indigo-500">{sort.dir === 'asc' ? '↑' : '↓'}</span>
}

export default function PropertyTable({ summaries }) {
  const navigate = useNavigate()
  const [sort, setSort] = useState({ key: 'averageRating', dir: 'asc' })

  const sorted = useMemo(() => {
    const copy = [...summaries]
    copy.sort((a, b) => {
      const av = getSortValue(a, sort.key)
      const bv = getSortValue(b, sort.key)
      if (av < bv) return sort.dir === 'asc' ? -1 : 1
      if (av > bv) return sort.dir === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [summaries, sort])

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'desc' },
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            {COLUMNS.map((col) => {
              const k = col.sortKey ?? col.key
              return (
                <th
                  key={col.key}
                  className="cursor-pointer select-none whitespace-nowrap px-4 py-3 hover:text-gray-700"
                  onClick={() => handleSort(k)}
                >
                  {col.label}
                  <SortIndicator colKey={k} sort={sort} />
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sorted.map((row) => (
            <tr
              key={row.propertyId}
              className="cursor-pointer transition-colors hover:bg-indigo-50"
              onClick={() => navigate(`/property/${row.propertyId}`)}
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                {row.propertyName}
              </td>
              <td className="px-4 py-3 text-gray-500">{row.city}</td>
              <td className="px-4 py-3">
                <RiskBadge averageRating={row.averageRating} />
              </td>
              <td className="px-4 py-3 text-gray-700">{fmt(row.averageRating)}</td>
              <td className="px-4 py-3 text-gray-700">{row.totalReviews}</td>
              <td className="px-4 py-3 text-gray-700">{fmtPct(row.responseRate)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                {fmtDate(row.lastReviewDate)}
              </td>
              <td className="px-4 py-3 text-gray-700">{fmt(row.subRatingAverages.cleanliness)}</td>
              <td className="px-4 py-3 text-gray-700">{fmt(row.subRatingAverages.location)}</td>
              <td className="px-4 py-3 text-gray-700">{fmt(row.subRatingAverages.checkin)}</td>
              <td className="px-4 py-3 text-gray-700">
                {fmt(row.subRatingAverages.communication)}
              </td>
              <td className="px-4 py-3 text-gray-700">{fmt(row.subRatingAverages.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-400">No properties found.</div>
      )}
    </div>
  )
}
