import { useLocation } from 'react-router-dom'
import { useReviews } from '../../state/useReviews.js'

const PAGE_TITLES = {
  '/': 'Portfolio Overview',
  '/properties': 'Properties',
  '/queue': 'Unanswered Queue',
}

function getPageTitle(pathname) {
  if (pathname.startsWith('/property/')) return 'Property Detail'
  return PAGE_TITLES[pathname] ?? 'Dashboard'
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-indigo-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export default function TopBar() {
  const { pathname } = useLocation()
  const { isLoading, error } = useReviews()
  const title = getPageTitle(pathname)

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-gray-200 shrink-0">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-3">
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Spinner />
            <span>Loading data…</span>
          </div>
        )}
        {!isLoading && error && (
          <div className="flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-700 border border-red-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {!isLoading && !error && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Data loaded
          </span>
        )}
      </div>
    </header>
  )
}
