import { describe, expect, it } from 'vitest'
import required from '../required'

describe('required', () => {
  it('should return a function that returns a message if the value is empty', () => {
    const requiredMessage = required('This field is required')
    expect(requiredMessage('')).toBe('This field is required')
  })

  it('should return a function that returns true if the value is not empty', () => {
    const requiredMessage = required('This field is required')
    expect(requiredMessage('test')).toBe(true)
  })
})
