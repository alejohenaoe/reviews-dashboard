import { describe, it, expect } from 'vitest'
import { riskLevel } from '../riskLevel.js'

describe('riskLevel', () => {
  it('returns unknown for null', () => {
    expect(riskLevel(null)).toBe('unknown')
  })

  it('returns unknown for undefined', () => {
    expect(riskLevel(undefined)).toBe('unknown')
  })

  it('returns critical below 3.5', () => {
    expect(riskLevel(1)).toBe('critical')
    expect(riskLevel(3.0)).toBe('critical')
    expect(riskLevel(3.49)).toBe('critical')
  })

  it('returns at_risk at exactly 3.5 (lower boundary)', () => {
    expect(riskLevel(3.5)).toBe('at_risk')
  })

  it('returns at_risk between 3.5 and 4.2', () => {
    expect(riskLevel(3.8)).toBe('at_risk')
    expect(riskLevel(4.0)).toBe('at_risk')
    expect(riskLevel(4.19)).toBe('at_risk')
  })

  it('returns healthy at exactly 4.2 (lower boundary)', () => {
    expect(riskLevel(4.2)).toBe('healthy')
  })

  it('returns healthy above 4.2', () => {
    expect(riskLevel(4.5)).toBe('healthy')
    expect(riskLevel(5.0)).toBe('healthy')
  })
})
