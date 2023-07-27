import {describe,it,expect} from 'vitest'
import getDefaultFieldValue from '../getDefaultFieldValue'

describe('getDefaultFieldValue()', () => {
    it('should return null if no element', () => {
        expect(getDefaultFieldValue(undefined)).toBe(null)
    });
    it('should return false for native checkbox inputs', () => {
        const fieldRef = {
            type: 'checkbox',
        }
        expect(getDefaultFieldValue(fieldRef)).toBe(false)
    });
    it('should return null for any other input', () => {
        const fieldRef = {
            type: 'text',
        }
        expect(getDefaultFieldValue(fieldRef)).toBe(null)
    });
})