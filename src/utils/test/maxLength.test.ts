import { describe, expect, it } from 'vitest'
import maxLength from '../maxLength'

describe('maxLength', () => {
  it('should work if value is nullish', () => {
    const message = 'This field must be smaller than -10'
    const maxLength10 = maxLength(
      -10,
      message
    )
    expect(maxLength10(null)).toBe(true)
    expect(maxLength10(undefined)).toBe(true)
    expect(maxLength10('')).toBe(message)
  })
  it('should work if maxLength is 0', () => {
    const maxLength0 = maxLength(
      0,
      'This field must be smaller than 0'
    )
    expect(maxLength0('')).toBe(true)
  })
  it('should return a function that returns a message if the value is greater than the max length', () => {
    const maxLength10 = maxLength(
      10,
      'This field must be less than 10 characters'
    )
    expect(maxLength10('12345678901')).toBe(
      'This field must be less than 10 characters'
    )
  })
  it('should return a function that returns true if the value is less than or equal to the max length', () => {
    const maxLength10 = maxLength(
      10,
      'This field must be less than 10 characters'
    )
    expect(maxLength10('1234567890')).toBe(true)
  })
})
