import { useReviews } from './state/useReviews.js'

function App() {
  const { isLoading, error, reviews, filteredReviews, loadedAt } = useReviews()

  if (isLoading) return <p>Loading reviews…</p>
  if (error) return <p>Error: {error}</p>

  return (
    <main>
      <h1>Reviews dashboard</h1>
      <p>
        {filteredReviews.length} of {reviews.length} reviews shown
        {loadedAt ? ` · loaded ${loadedAt.toISOString()}` : null}
      </p>
    </main>
  )
}

export default App
