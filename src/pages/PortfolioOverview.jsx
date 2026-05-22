export default function PortfolioOverview() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
        <svg className="mx-auto mb-3 h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        <p className="text-sm font-medium text-gray-500">Portfolio Overview</p>
        <p className="mt-1 text-xs text-gray-400">Analytics coming in the next phase.</p>
      </div>
    </div>
  )
}
