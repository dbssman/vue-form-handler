import { describe, expect, it } from 'vitest'
import min from '../min'

describe('min', () => {
    it('should return a function that returns a message if the value is less than the min', () => {
        const min10 = min(10, 'This field must be greater than 10')
        expect(min10(5)).toBe('This field must be greater than 10')
    })
    it('should return a function that returns true if the value is greater than the min', () => {
        const min10 = min(10, 'This field must be greater than 10')
        expect(min10(15)).toBe(true)
    })
})