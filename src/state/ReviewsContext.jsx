import { useEffect, useMemo, useReducer } from 'react'
import { loadReviews } from '../data/loadReviews.js'
import { applyFilters } from '../metrics/filters.js'
import { ReviewsContext } from './reviewsContext.js'

const initialFilters = {
  dateFrom: null,
  dateTo: null,
  channels: [],
  languages: [],
  ratingMin: null,
  ratingMax: null,
}

const initialState = {
  reviews: [],
  isLoading: true,
  error: null,
  loadedAt: null,
  filters: initialFilters,
  selectedPropertyId: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null }
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        reviews: action.reviews,
        loadedAt: action.loadedAt,
      }
    case 'LOAD_ERROR':
      return { ...state, isLoading: false, error: action.error }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.filters } }
    case 'RESET_FILTERS':
      return { ...state, filters: initialFilters }
    case 'SET_SELECTED_PROPERTY':
      return { ...state, selectedPropertyId: action.propertyId }
    default:
      return state
  }
}

export function ReviewsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: 'LOAD_START' })
    loadReviews()
      .then(({ reviews, loadedAt }) => {
        if (cancelled) return
        dispatch({ type: 'LOAD_SUCCESS', reviews, loadedAt })
      })
      .catch((error) => {
        if (cancelled) return
        dispatch({ type: 'LOAD_ERROR', error: error.message ?? String(error) })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filteredReviews = useMemo(
    () => applyFilters(state.reviews, state.filters),
    [state.reviews, state.filters],
  )

  const value = useMemo(
    () => ({
      reviews: state.reviews,
      isLoading: state.isLoading,
      error: state.error,
      loadedAt: state.loadedAt,
      filters: state.filters,
      selectedPropertyId: state.selectedPropertyId,
      filteredReviews,
      setFilters: (filters) => dispatch({ type: 'SET_FILTERS', filters }),
      resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
      setSelectedPropertyId: (propertyId) =>
        dispatch({ type: 'SET_SELECTED_PROPERTY', propertyId }),
    }),
    [state, filteredReviews],
  )

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}
