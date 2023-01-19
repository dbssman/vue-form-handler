import { describe, expect, it } from 'vitest'
import pattern from '../pattern'

describe('pattern', () => {
    it('should return a function that returns a message if the value does not match the pattern', () => {
        const patternABC = pattern(/abc/, 'This field must match the pattern abc')
        expect(patternABC('123')).toBe('This field must match the pattern abc')
    })
    it('should return a function that returns true if the value matches the pattern', () => {
        const patternABC = pattern(/abc/, 'This field must match the pattern abc')
        expect(patternABC('abc')).toBe(true)
    })
})