import { useCallback, useEffect, useState } from 'react'
import { useAiRequest } from '../../ai/useAiRequest.js'
import { buildDraftResponsePrompt } from '../../ai/prompts.js'
import AiDebugPanel from './AiDebugPanel.jsx'

function validateDraftResponse(raw) {
  const text = raw.trim()
  if (!text) throw 'Empty response received.'
  return text
}

export default function DraftResponseModal({ review, isOpen, onClose }) {
  const promptFn = useCallback((r) => buildDraftResponsePrompt(r), [])
  const { data, isLoading, error, debug, run } = useAiRequest(promptFn, validateDraftResponse)
  const [copied, setCopied] = useState(false)

  // Auto-trigger when modal opens for the first time (no re-fire on re-renders)
  useEffect(() => {
    if (isOpen && review) {
      run(review)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, review])

  function handleCopy() {
    if (!data) return
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Draft Response</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Original review */}
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500 mb-1">Original review</p>
            <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
              {review?.reviewText || '—'}
            </p>
          </div>

          {/* Draft */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">
              Draft response {review?.language ? `(${review.language.toUpperCase()})` : ''}
            </p>

            {isLoading ? (
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 justify-center">
                <svg className="h-4 w-4 animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm text-gray-400">Generating draft…</span>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : (
              <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 leading-relaxed whitespace-pre-wrap min-h-[80px]">
                {data || '—'}
              </p>
            )}
          </div>

          <AiDebugPanel debug={debug} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 gap-3">
          <button
            type="button"
            onClick={() => run(review)}
            disabled={isLoading}
            className="text-sm text-gray-500 hover:text-indigo-600 disabled:opacity-40 transition-colors"
          >
            ↺ Regenerate
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!data || isLoading}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
