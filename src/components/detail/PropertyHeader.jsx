export default function PropertyHeader({ propertyName, city }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-xl font-semibold text-gray-900">{propertyName || '—'}</h2>
      {city && <p className="mt-1 text-sm text-gray-500">{city}</p>}
    </div>
  )
}
