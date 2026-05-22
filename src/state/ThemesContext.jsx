import { useReducer, useCallback } from 'react'
import { ThemesContext } from './themesContext.js'

const initialState = new Map()

function reducer(state, action) {
  const next = new Map(state)
  switch (action.type) {
    case 'EXTRACTION_START':
      next.set(action.propertyId, {
        propertyName: action.propertyName,
        themes: null,
        isLoading: true,
        error: null,
        debug: null,
      })
      return next
    case 'EXTRACTION_SUCCESS':
      next.set(action.propertyId, {
        propertyName: action.propertyName,
        themes: action.themes,
        isLoading: false,
        error: null,
        debug: action.debug,
      })
      return next
    case 'EXTRACTION_ERROR':
      next.set(action.propertyId, {
        propertyName: action.propertyName,
        themes: null,
        isLoading: false,
        error: action.error,
        debug: action.debug,
      })
      return next
    default:
      return state
  }
}

export function ThemesProvider({ children }) {
  const [themesByPropertyId, dispatch] = useReducer(reducer, initialState)

  const startExtraction = useCallback((propertyId, propertyName) => {
    dispatch({ type: 'EXTRACTION_START', propertyId, propertyName })
  }, [])

  const setExtractionSuccess = useCallback((propertyId, propertyName, themes, debug) => {
    dispatch({ type: 'EXTRACTION_SUCCESS', propertyId, propertyName, themes, debug })
  }, [])

  const setExtractionError = useCallback((propertyId, propertyName, error, debug) => {
    dispatch({ type: 'EXTRACTION_ERROR', propertyId, propertyName, error, debug })
  }, [])

  return (
    <ThemesContext.Provider value={{ themesByPropertyId, startExtraction, setExtractionSuccess, setExtractionError }}>
      {children}
    </ThemesContext.Provider>
  )
}
