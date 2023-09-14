import { describe, expect, it } from 'vitest'
import transformValidations from '@/logic/transformValidations'

describe('transformValidations()', () => {
  it('should return empty object if no validations', () => {
    expect(transformValidations()).toEqual({})
  })

  it('should return required validation if required is true', () => {
    expect(transformValidations({ required: true }).required).toBeDefined()
  })
  it('should return custom message with required validation if required is string', () => {
    const message = 'required'
    expect(transformValidations({ required: message }).required(null)).toBe(
      message
    )
  })
  it('should return required validation with custom message if required is string', () => {
    const message = 'required'
    expect(transformValidations({ required: message }).required).toBeDefined()
  })

  it('should return min validation if min is number', () => {
    expect(transformValidations({ min: 1 }).min).toBeDefined()
  })
  it('should return min validation with custom message if min is object', () => {
    const message = 'min'
    expect(
      transformValidations({ min: { value: 1, message } }).min
    ).toBeDefined()
  })
  it('should return custom message with min validation if min is object', () => {
    const message = 'min'
    expect(transformValidations({ min: { value: 1, message } }).min(0)).toBe(
      message
    )
  })

  it('should return max validation if max is number', () => {
    expect(transformValidations({ max: 1 }).max).toBeDefined()
  })
  it('should return max validation with custom message if max is object', () => {
    const message = 'max'
    expect(
      transformValidations({ max: { value: 1, message } }).max
    ).toBeDefined()
  })
  it('should return custom message with max validation if max is object', () => {
    const message = 'max'
    expect(transformValidations({ max: { value: 1, message } }).max(2)).toBe(
      message
    )
  })

  it('should return minLength validation if minLength is number', () => {
    expect(transformValidations({ minLength: 1 }).minLength).toBeDefined()
  })
  it('should return minLength validation with custom message if minLength is object', () => {
    const message = 'minLength'
    expect(
      transformValidations({ minLength: { value: 1, message } }).minLength
    ).toBeDefined()
  })
  it('should return custom message with minLength validation if minLength is object', () => {
    const message = 'minLength'
    expect(
      transformValidations({ minLength: { value: 1, message } }).minLength('')
    ).toBe(message)
  })

  it('should return maxLength validation if maxLength is number', () => {
    expect(transformValidations({ maxLength: 1 }).maxLength).toBeDefined()
  })
  it('should return maxLength validation with custom message if maxLength is object', () => {
    const message = 'maxLength'
    expect(
      transformValidations({ maxLength: { value: 1, message } }).maxLength
    ).toBeDefined()
  })
  it('should return custom message with maxLength validation if maxLength is object', () => {
    const message = 'maxLength'
    expect(
      transformValidations({ maxLength: { value: 1, message } }).maxLength(
        'more'
      )
    ).toBe(message)
  })

  it('should return pattern validation if pattern is string', () => {
    expect(transformValidations({ pattern: 'a' }).pattern).toBeDefined()
  })
  it('should return pattern validation if pattern is RegExp', () => {
    expect(transformValidations({ pattern: /a/ }).pattern).toBeDefined()
  })
  it('should return pattern validation with custom message if pattern is object', () => {
    const message = 'pattern'
    expect(
      transformValidations({ pattern: { value: /a/, message } }).pattern
    ).toBeDefined()
  })
  it('should return custom message with pattern validation if pattern is object', () => {
    const message = 'pattern'
    expect(
      transformValidations({ pattern: { value: /a/, message } }).pattern('more')
    ).toBe(message)
  })
})
