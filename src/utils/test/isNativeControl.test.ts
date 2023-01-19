import { describe, it, expect } from 'vitest'
import isNativeControl from '../isNativeControl'

describe('isNativeControl', () => {
    it('should return true for input control', () => {
        const input = document.createElement('input')
        expect(isNativeControl(input)).toBe(true)
    })

    it('should return true for select control', () => {
        const select = document.createElement('select')
        expect(isNativeControl(select)).toBe(true)
    })

    it('should return true for textarea control', () => {
        const textarea = document.createElement('textarea')
        expect(isNativeControl(textarea)).toBe(true)
    })

    it('should return false for non-native controls', () => {
        const div = document.createElement('div')
        expect(isNativeControl(div)).toBe(false)
    })
})