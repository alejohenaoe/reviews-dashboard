import { useParams } from 'react-router-dom'

export default function PropertyDetail() {
  const { id } = useParams()

  return (
    <div className="max-w-5xl">
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400">
        <svg className="mx-auto mb-3 h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <p className="text-sm font-medium text-gray-500">Property Detail</p>
        <p className="mt-1 text-xs text-gray-400">
          Property <span className="font-mono text-gray-500">{id}</span> — detail view coming in the next phase.
        </p>
      </div>
    </div>
  )
}
