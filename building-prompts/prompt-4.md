Read and follow CLAUDE.md, ARCHITECTURE.md, and the project skills /.claude/skills (do not ignore this folder) before making changes.

Implement the operational review workflows for this phase.

Create only the folders and files needed for this phase if they do not already exist.

Build:
- A property detail page with review list and local filters
- An unanswered queue page with priority ordering and queue item cards

Functional requirements:
1. The property detail filters must be local to the page and must not affect global state.
2. The detail page must show:
   - property header
   - property stats
   - review cards
   - local filtering controls
   - an empty state when no reviews match
3. The queue must display unanswered reviews ordered by priority score.
4. Include a transparent explanation of the priority formula.
5. Keep review cards, filter controls, and queue items as separate components.
6. Stub any modal or advanced response workflow if it is not part of this phase.
7. Keep the property detail and queue workflows operational without AI dependency.

Property detail requirements:
- Show the property name and city
- Show stats derived from that property’s reviews
- Provide local filters for:
  - date range
  - rating
  - channel
  - language
- Render a list of review cards
- Review cards should show:
  - rating
  - channel
  - date
  - language
  - full review text
  - whether the review has a response
- If there are no reviews after filtering, show a clear empty state

Queue requirements:
- Use the deterministic priority scoring formula exactly as defined below:

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

- Only unanswered reviews should appear in the queue
- Sort by priority score descending
- Show the property name, city, rating, channel, date, language, and review excerpt
- Add a simple explanation area that shows how the priority score works
- Keep the queue components presentational and reusable

Acceptance criteria:
- Detail page filtering works locally.
- Queue is correctly prioritized.
- Empty states are handled gracefully.
- The operational workflow is usable end-to-end.
- No AI dependency is required for this phase.