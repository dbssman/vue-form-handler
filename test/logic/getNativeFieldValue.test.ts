import { describe, expect, it } from 'vitest'
import getNativeFieldValue from '@/logic/getNativeFieldValue'
import { DEFAULT_FIELD_VALUE } from '@/constants'

describe('getNativeFieldValue()', () => {
  it('should return DEFAULT_FIELD_VALUE if no element', () => {
    expect(getNativeFieldValue(undefined)).toBe(null)
  })
  it('should return checked for native checkbox inputs', () => {
    const checked = true
    const fieldRef = {
      type: 'checkbox',
      checked,
    }
    expect(getNativeFieldValue(fieldRef)).toBe(checked)
  })
  it('should return checked element if ref is a radio group', () => {
    const checkedValue = 'b'
    const fieldRef = [
      {
        type: 'radio',
        checked: false,
        value: 'a',
      },
      {
        type: 'radio',
        checked: true,
        value: checkedValue,
      },
    ]
    expect(getNativeFieldValue(fieldRef)).toBe(checkedValue)
  })
  it('should return first element if no checked element in radio group', () => {
    const firstValue = 'a'
    const fieldRef = [
      {
        type: 'radio',
        checked: false,
        value: firstValue,
      },
      {
        type: 'radio',
        checked: false,
        value: 'b',
      },
    ]
    expect(getNativeFieldValue(fieldRef)).toBe(firstValue)
  })
  it('should return first value for array of elements if not radio group', () => {
    const firstValue = 'a'
    const fieldRef = [
      {
        type: 'text',
        value: firstValue,
      },
      {
        type: 'text',
        value: 'b',
      },
    ]
    expect(getNativeFieldValue(fieldRef)).toBe(firstValue)
  })
  it('should return array of values for multiple select', () => {
    const values = ['a', 'b']
    const fieldRef = {
      type: 'select-multiple',
      options: [
        {
          value: values[0],
          selected: true,
        },
        {
          value: values[1],
          selected: true,
        },
      ],
    }
    expect(getNativeFieldValue(fieldRef)).toEqual(values)
  })
  it('should return DEFAULT_FIELD_VALUE for non selected multiple select', () => {
    const fieldRef = {
      type: 'select-multiple',
      options: [
        {
          value: 'a',
          selected: false,
        },
        {
          value: 'b',
          selected: false,
        },
      ],
    }
    expect(getNativeFieldValue(fieldRef)).toBe(DEFAULT_FIELD_VALUE)
  })
  it('should return value for any other field', () => {
    const value = 'a'
    const fieldRef = {
      value,
    }
    expect(getNativeFieldValue(fieldRef)).toBe(value)
  })
  it('should return DEFAULT_FIELD_VALUE if no value', () => {
    const fieldRef = {}
    expect(getNativeFieldValue(fieldRef)).toBe(DEFAULT_FIELD_VALUE)
  })
})
