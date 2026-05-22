import { riskLevel } from '../../metrics/riskLevel.js'

const STYLES = {
  critical: 'bg-red-50 text-red-700 border-red-200',
  at_risk: 'bg-amber-50 text-amber-700 border-amber-200',
  healthy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  unknown: 'bg-gray-50 text-gray-500 border-gray-200',
}

const LABELS = {
  critical: 'Critical',
  at_risk: 'At Risk',
  healthy: 'Healthy',
  unknown: 'Unknown',
}

export default function RiskBadge({ averageRating }) {
  const level = riskLevel(averageRating)
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[level]}`}
    >
      {LABELS[level]}
    </span>
  )
}
