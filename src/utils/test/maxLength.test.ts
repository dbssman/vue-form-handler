import { describe, expect, it } from 'vitest'
import maxLength from '../maxLength'

describe('maxLength', () => {
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
