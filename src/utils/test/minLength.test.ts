import { describe, expect, it } from 'vitest'
import minLength from '../minLength'

describe('minLength', () => {
  it('should work if value is nullish', () => {
    const message = 'This field must be greater than 10 characters'
    const minLength10 = minLength(
      10,
      message
    )
    expect(minLength10(null)).toBe(true)
    expect(minLength10(undefined)).toBe(true)
    expect(minLength10('')).toBe(message)
  })
  it('should work if minLength is 0', () => {
    const minLength0 = minLength(
      0,
      'This field must be greater than 0 characters'
    )
    expect(minLength0('')).toBe(true)
    expect(minLength0('1')).toBe(true)
  })
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
