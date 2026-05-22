/**
 * Collapsible debug panel for AI calls.
 * Props: debug: { prompt, rawResponse, parseError }
 */
export default function AiDebugPanel({ debug }) {
  if (!debug) return null

  return (
    <details className="mt-2">
      <summary className="cursor-pointer select-none text-xs text-gray-400 hover:text-gray-600">
        AI debug
      </summary>
      <div className="mt-2 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono space-y-3 p-3">
        {debug.prompt && (
          <div>
            <p className="text-slate-400 mb-1">Prompt sent</p>
            <pre className="whitespace-pre-wrap max-h-48 overflow-y-auto">{debug.prompt}</pre>
          </div>
        )}
        {debug.rawResponse && (
          <div>
            <p className="text-slate-400 mb-1">Raw response</p>
            <pre className="whitespace-pre-wrap max-h-48 overflow-y-auto">{debug.rawResponse}</pre>
          </div>
        )}
        {debug.parseError && (
          <div>
            <p className="text-red-400 mb-1">Parse / validation error</p>
            <pre className="whitespace-pre-wrap text-red-300">{debug.parseError}</pre>
          </div>
        )}
      </div>
    </details>
  )
}
