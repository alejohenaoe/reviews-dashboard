import { useContext } from 'react'
import { ThemesContext } from './themesContext.js'

export function useThemes() {
  const ctx = useContext(ThemesContext)
  if (!ctx) throw new Error('useThemes must be used inside ThemesProvider')
  return ctx
}
