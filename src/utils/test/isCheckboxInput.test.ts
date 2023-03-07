import { describe, it, expect } from 'vitest'
import isCheckboxInput from '../isCheckboxInput'

describe('isCheckboxInput', () => {
  it('should return true for checkbox inputs', () => {
    expect(isCheckboxInput({ type: 'checkbox' } as HTMLInputElement)).toBe(true)
  })

  it('should return false for non-checkbox inputs', () => {
    expect(isCheckboxInput({ type: 'text' } as HTMLInputElement)).toBe(false)
  })
})
