import { describe, expect, it } from 'vitest'
import min from '../min'

describe('min', () => {
  it('should work if value is nullish', () => {
    const message = 'This field must be greater than 10'
    const min10 = min(
      10,
      message
    )
    expect(min10(null)).toBe(true)
    expect(min10(undefined)).toBe(true)
    expect(min10(0)).toBe(message)
  })
  it('should work if min is 0', () => {
    const min0 = min(
      0,
      'This field must be greater than 0'
    )
    expect(min0(0)).toBe(true)
    expect(min0(1)).toBe(true)
  })
  it('should return a function that returns a message if the value is less than the min', () => {
    const min10 = min(10, 'This field must be greater than 10')
    expect(min10(5)).toBe('This field must be greater than 10')
  })
  it('should return a function that returns true if the value is greater than the min', () => {
    const min10 = min(10, 'This field must be greater than 10')
    expect(min10(15)).toBe(true)
  })
})
