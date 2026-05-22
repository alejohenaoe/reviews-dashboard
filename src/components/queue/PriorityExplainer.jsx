export default function PriorityExplainer() {
  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4 flex items-center gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <span className="rounded-lg bg-red-100 border border-red-200 px-2.5 py-1 text-sm font-bold text-red-700">20</span>
        <span className="text-xs text-indigo-400">high priority</span>
        <span className="text-indigo-200 mx-1">→</span>
        <span className="text-xs text-indigo-400">low priority</span>
        <span className="rounded-lg bg-gray-100 border border-gray-200 px-2.5 py-1 text-sm font-bold text-gray-500">1</span>
      </div>
      <p className="text-xs text-indigo-700 leading-relaxed">
        Reviews with a higher score need attention first.
      </p>
    </div>
  )
}
