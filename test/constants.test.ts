import {
  DEFAULT_FIELD_VALUE,
  BaseInputProps,
  BaseInputEmits,
  defaultInjectionKey,
} from '@/constants'
import { describe, it, expect } from 'vitest'

describe('constants', () => {
  it('should export constants', () => {
    expect(DEFAULT_FIELD_VALUE).toBe(null)
    expect(BaseInputProps).toBeTruthy()
    expect(BaseInputEmits).toBeTruthy()
    expect(defaultInjectionKey).toBeTruthy()
  })
})
