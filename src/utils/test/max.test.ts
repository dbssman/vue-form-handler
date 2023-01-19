import { describe, expect, it } from 'vitest'
import max from '../max'

describe('max', () => {
    it('should return a function that returns a message if the value is greater than the max', () => {
        const max10 = max(10, 'This field must be less than 10')
        expect(max10(15)).toBe('This field must be less than 10')
    })
    it('should return a function that returns true if the value is less than the max', () => {
        const max10 = max(10, 'This field must be less than 10')
        expect(max10(5)).toBe(true)
    })
});

