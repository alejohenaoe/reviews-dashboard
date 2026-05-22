import { useReducer, useCallback } from 'react'
import { callClaude } from './claudeClient.js'

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  debug: { prompt: null, rawResponse: null, parseError: null },
}

function reducer(state, action) {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, isLoading: true, error: null, debug: { prompt: action.prompt, rawResponse: null, parseError: null } }
    case 'REQUEST_SUCCESS':
      return { ...state, isLoading: false, data: action.data, debug: { ...state.debug, rawResponse: action.rawResponse, parseError: null } }
    case 'REQUEST_ERROR':
      return { ...state, isLoading: false, error: action.error, debug: { ...state.debug, rawResponse: action.rawResponse, parseError: action.error } }
    default:
      return state
  }
}

/**
 * Generic hook for a single-turn AI request.
 * @param {(...args: any[]) => string} promptFn  Builds the prompt from run() arguments
 * @param {(raw: string) => any} validateFn       Parses / validates the raw response; throws on failure
 */
export function useAiRequest(promptFn, validateFn) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const run = useCallback(
    async (...args) => {
      const prompt = promptFn(...args)
      dispatch({ type: 'REQUEST_START', prompt })
      let rawResponse = null
      try {
        const result = await callClaude(prompt)
        rawResponse = result.rawResponse
        const data = validateFn(rawResponse)
        dispatch({ type: 'REQUEST_SUCCESS', data, rawResponse })
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        dispatch({ type: 'REQUEST_ERROR', error, rawResponse })
      }
    },
    [promptFn, validateFn],
  )

  return { ...state, run }
}
