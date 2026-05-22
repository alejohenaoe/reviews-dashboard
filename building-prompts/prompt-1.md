Read and follow CLAUDE.md, ARCHITECTURE.md, and the project skills before making changes.

Implement the data layer and global application state for this phase.

Create only the folders and files needed for this phase if they do not already exist.

Build:
- CSV loading from public/data/reviews.csv
- Row normalization into a consistent Review shape
- Pure metrics functions
- Priority scoring logic for unanswered reviews
- Global context state for reviews, filters, loading, error, and selected property

Functional requirements:
1. Parse the CSV from public/data/reviews.csv.
2. Normalize every row into this Review shape:
   {
     id: string,
     propertyId: string,
     propertyName: string,
     city: string,
     channel: "airbnb" | "booking" | "vrbo" | "direct",
     date: Date,
     language: "en" | "es" | "pt",
     rating: number | null,
     subRatings: {
       cleanliness: number | null,
       location: number | null,
       checkin: number | null,
       communication: number | null,
       value: number | null
     },
     reviewText: string,
     hasResponse: boolean
   }
3. If a numeric field is empty, invalid, or NaN, store it as null, never 0.
4. Export a function that loads and returns the reviews plus the load timestamp.
5. Implement pure utility functions for:
   - portfolio stats
   - property summaries
   - monthly trend aggregation
   - property-specific review filtering
6. Implement the unanswered review priority scoring formula exactly as follows:

   Severity weights:
   - 1 star = 10
   - 2 stars = 6
   - 3 stars = 3
   - 4 stars = 1
   - 5 stars = 0
   - null rating = 3

   Recency multipliers:
   - 0–7 days = 2.0
   - 8–30 days = 1.5
   - 31–90 days = 1.0
   - more than 90 days = 0.5

   Final score:
   severityWeight * recencyMultiplier

7. Build the global context with:
   - reviews
   - isLoading
   - error
   - filters
   - selectedPropertyId
   - derived filteredReviews
8. Load the reviews on app mount through the provider.
9. Keep all calculations pure and testable.
10. Do not build UI beyond the minimal wiring needed to expose state.
11. Do not introduce AI calls in this phase.

Filters in global state:
{
  dateFrom: Date | null,
  dateTo: Date | null,
  channels: string[],
  languages: string[],
  ratingMin: number | null,
  ratingMax: number | null
}

Acceptance criteria:
- The CSV data loads correctly.
- Derived metrics are computed from normalized reviews.
- Filters work from global state.
- The app remains stable with empty or malformed values.
- No AI logic is present in this phase.