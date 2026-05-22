Read and follow CLAUDE.md, ARCHITECTURE.md, and the project skills before making changes.

Implement the core analytics views for this phase.

Create only the folders and files needed for this phase if they do not already exist.

Build:
- An overview page with KPI cards and a 12-month rating trend chart
- A properties page with a sortable property table and risk badges

Functional requirements:
1. KPI cards must use real metrics from the global filtered reviews.
2. The trend chart must use monthly aggregated data from the review set.
3. The property table must display computed property summaries.
4. Sorting must be handled in the table without breaking row navigation.
5. Risk states must be visually distinct.
6. Keep charting, card rendering, badges, and table rows as separate components.
7. Do not create large multi-purpose components.

Overview requirements:
- Display total reviews
- Display average rating
- Display response rate
- Display unanswered count
- Use data from the global state, not mock values

Properties page requirements:
- Show one row per property
- Include property name, city, average rating, review count, response rate, last review date, and sub-ratings
- Include a risk badge with these rules:
  - critical: avgRating < 3.5
  - at_risk: avgRating >= 3.5 and < 4.2
  - healthy: avgRating >= 4.2
- Allow sorting by column
- Clicking a row must navigate to the property detail route

Acceptance criteria:
- The overview shows real portfolio metrics.
- The properties page lists real properties and allows sorting.
- Clicking a property row navigates to the detail route.
- The UI remains readable and data-driven.
- No AI logic is introduced yet.