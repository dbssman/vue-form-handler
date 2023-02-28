import { describe, expect, it } from 'vitest'
import minLength from '../minLength'

describe('minLength', () => {
  it('should return a function that returns a message if the value is less than the min length', () => {
    const minLength10 = minLength(
      10,
      'This field must be greater than 10 characters'
    )
    expect(minLength10('123456789')).toBe(
      'This field must be greater than 10 characters'
    )
  })
  it('should return a function that returns true if the value is greater than or equal to the min length', () => {
    const minLength10 = minLength(
      10,
      'This field must be greater than 10 characters'
    )
    expect(minLength10('1234567890')).toBe(true)
  })
})
