const EMPTY_FILTERS = {
  dateFrom: null,
  dateTo: null,
  channels: [],
  languages: [],
  ratingMin: null,
  ratingMax: null,
}

const RATING_OPTIONS = [
  { label: 'Any rating', value: '' },
  { label: '1+ stars', value: '1' },
  { label: '2+ stars', value: '2' },
  { label: '3+ stars', value: '3' },
  { label: '4+ stars', value: '4' },
  { label: '5 stars', value: '5' },
]

function toDateInputValue(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

export default function DetailFilters({
  filters,
  onFiltersChange,
  availableChannels,
  availableLanguages,
}) {
  function handleDateFrom(e) {
    const val = e.target.value
    onFiltersChange({ ...filters, dateFrom: val ? new Date(val) : null })
  }

  function handleDateTo(e) {
    const val = e.target.value
    onFiltersChange({ ...filters, dateTo: val ? new Date(val) : null })
  }

  function handleRating(e) {
    const val = e.target.value
    onFiltersChange({
      ...filters,
      ratingMin: val === '' ? null : Number(val),
      ratingMax: null,
    })
  }

  function handleChannel(e) {
    const val = e.target.value
    onFiltersChange({ ...filters, channels: val === '' ? [] : [val] })
  }

  function handleLanguage(e) {
    const val = e.target.value
    onFiltersChange({ ...filters, languages: val === '' ? [] : [val] })
  }

  function handleReset() {
    onFiltersChange(EMPTY_FILTERS)
  }

  const isActive =
    filters.dateFrom ||
    filters.dateTo ||
    filters.channels.length > 0 ||
    filters.languages.length > 0 ||
    filters.ratingMin !== null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">From</label>
          <input
            type="date"
            value={toDateInputValue(filters.dateFrom)}
            onChange={handleDateFrom}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">To</label>
          <input
            type="date"
            value={toDateInputValue(filters.dateTo)}
            onChange={handleDateTo}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Rating</label>
          <select
            value={filters.ratingMin !== null ? String(filters.ratingMin) : ''}
            onChange={handleRating}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {availableChannels.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Channel</label>
            <select
              value={filters.channels[0] ?? ''}
              onChange={handleChannel}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All channels</option>
              {availableChannels.map((ch) => (
                <option key={ch} value={ch}>
                  {ch.charAt(0).toUpperCase() + ch.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {availableLanguages.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Language</label>
            <select
              value={filters.languages[0] ?? ''}
              onChange={handleLanguage}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}

        {isActive && (
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
