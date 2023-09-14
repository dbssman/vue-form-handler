import { describe, expect, it } from 'vitest'
import max from '@/utils/max'

describe('max', () => {
  it('should work if value is nullish', () => {
    const message = 'This field must be smaller than -10'
    const max10 = max(-10, message)
    expect(max10(null)).toBe(true)
    expect(max10(undefined)).toBe(true)
    expect(max10(0)).toBe(message)
  })
  it('should work if max is 0', () => {
    const max0 = max(0, 'This field must be smaller than 0')
    expect(max0(0)).toBe(true)
    expect(max0(-1)).toBe(true)
  })
  it('should return a function that returns a message if the value is greater than the max', () => {
    const max10 = max(10, 'This field must be less than 10')
    expect(max10(15)).toBe('This field must be less than 10')
  })
  it('should return a function that returns true if the value is less than the max', () => {
    const max10 = max(10, 'This field must be less than 10')
    expect(max10(5)).toBe(true)
  })
})
