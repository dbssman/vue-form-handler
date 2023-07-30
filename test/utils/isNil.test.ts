import { describe, it, expect } from 'vitest'
import isNil from '@/utils/isNil'

describe('isNil()', () => {
  it('should return true if value is null', () => {
    expect(isNil(null)).toBe(true)
  })
  it('should return true if value is undefined', () => {
    expect(isNil(undefined)).toBe(true)
  })
  it('should return false if value is not null or undefined', () => {
    expect(isNil('')).toBe(false)
    expect(isNil(0)).toBe(false)
    expect(isNil(false)).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil({})).toBe(false)
  })
})
