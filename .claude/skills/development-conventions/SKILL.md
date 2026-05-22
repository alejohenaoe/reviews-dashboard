Purpose:
Enforce codebase conventions and prevent inconsistent or overly large implementations.

Rules:
- Use PascalCase for React components and component file names.
- Use camelCase for variables, functions, hooks, and utility exports.
- Keep each file focused on a single responsibility.
- React components should remain presentation-focused whenever possible.
- Do not mix data fetching, parsing, calculations, and UI rendering in the same component unless the scope is trivially small.
- Split large UI blocks into smaller components when a component starts handling multiple concerns.
- Prefer pure functions for calculations, normalization, and derived data.
- Avoid monolithic components and duplicated logic.
- Keep styling consistent with the existing design system.
- Prefer composition over deeply nested conditional logic.
- Do not introduce abstractions unless they are reused or clearly reduce complexity.
- Name of all variables, functions, or components should clearly indicate their purpose and usage.