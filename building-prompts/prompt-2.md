Read and follow CLAUDE.md, ARCHITECTURE.md, and the project skills before making changes.

Implement the application shell and shared layout for this phase.

Create only the folders and files needed for this phase if they do not already exist.

Build:
- A fixed sidebar and a main content area
- Page navigation
- A top bar that reflects the current page and loading/error state
- Shared layout components for reuse across the app

Functional requirements:
1. Add navigation for:
   - /
   - /properties
   - /property/:id
   - /queue
2. The sidebar must be presentational and reusable.
3. The top bar must show:
   - the current page title
   - the current loading state
   - the current error state, if any
4. Keep layout and navigation components separate from data logic.
5. Make the layout responsive for desktop widths.
6. Use a consistent visual language across the shell.
7. The shell should feel like a real product, but do not add feature logic yet.

Suggested page titles:
- / → Portfolio Overview
- /properties → Properties
- /property/:id → Property Detail
- /queue → Unanswered Queue

Acceptance criteria:
- All routes render through the shared shell.
- Navigation works.
- Loading and error indicators are visible in the top bar.
- The shell is ready for feature pages.
- No analytics logic is introduced yet.