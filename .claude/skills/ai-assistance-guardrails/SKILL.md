Purpose:
Define how AI should be used as an assistant rather than as the source of truth.

Rules:
- AI may assist with drafting, classification, summarization, and suggestion generation.
- AI must not be the source of truth for business metrics, scoring formulas, or computed values.
- Any AI output that affects the UI must be validated before rendering.
- Treat AI responses as untrusted input.
- Prefer deterministic code for calculations, filtering, and state transitions.
- Keep prompts explicit, bounded, and task-specific.
- If an AI task can fail, the UI must degrade gracefully.
- Always expose debug information for AI-generated content.