import { describe, it, expect } from 'vitest'
import isRadioInput from '../isRadioInput'

describe('isRadioInput', () => {
    it('should return true for radio inputs', () => {
        expect(isRadioInput({ type: 'radio' } as HTMLInputElement)).toBe(true)
    })

    it('should return false for non-radio inputs', () => {
        expect(isRadioInput({ type: 'text' } as HTMLInputElement)).toBe(false)
    })
})