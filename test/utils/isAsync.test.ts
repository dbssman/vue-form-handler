import isAsync from '~/src/utils/isAsync'
import { describe, expect, it } from 'vitest'

describe('isAsync', () => {
  it('should return true if the function is async', () => {
    async function asyncFn() {}
    expect(isAsync(asyncFn)).toBe(true)
  })
  it('should return true if the function is async arrow function', () => {
    const asyncFn = async () => {}
    expect(isAsync(asyncFn)).toBe(true)
  })
  it('should return false if the function is not async', () => {
    function fn() {}
    expect(isAsync(fn)).toBe(false)
  })
  it('should return false if the function is arrow function', () => {
    const fn = () => {}
    expect(isAsync(fn)).toBe(false)
  })
})
