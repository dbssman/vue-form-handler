import { describe, it, expect } from 'vitest'
import isMultipleSelect from '../isMultipleSelect'

describe('isMultipleSelect', () => {
  it('should return true for multiple select', () => {
    expect(
      isMultipleSelect({ type: 'select-multiple' } as HTMLSelectElement)
    ).toBe(true)
  })

  it('should return false for non-multiple select', () => {
    expect(isMultipleSelect({ type: 'custom' } as HTMLSelectElement)).toBe(
      false
    )
  })
})
