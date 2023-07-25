import { describe, it, expect } from 'vitest'
import { useFormHandler } from '../useFormHandler'

describe('register()', () => {
  it('should register a field', () => {
    const { values, register } = useFormHandler()
    const field = register('field')
    expect(field.name).toBe('field')
    expect(field.onBlur).toBeDefined()
    expect(field.isDirty).toBeUndefined()
    expect(field.isTouched).toBeUndefined()
    expect(field.onClear).toBeDefined()
    expect(field.onChange).toBeDefined()
    expect(field.modelValue).toBe(null)
    expect(field['onUpdate:modelValue']).toBeDefined()
    expect(values.field).toBe(null)
  })
  it('should apply native handlers by default', () => {
    const { register } = useFormHandler()
    const field = register('field')
    expect(field.ref).toBeDefined()
    expect(field.onChange).toBeDefined()
  })
  it('should apply native handlers when native is specified', () => {
    const { register } = useFormHandler()
    const field = register('field', { native: true })
    expect(field.ref).toBeDefined()
    expect(field.onChange).toBeDefined()
  })
  it('should not apply native handlers when native is set false', () => {
    const { register } = useFormHandler()
    const field = register('field', { native: false })
    expect(field.onChange).toBeUndefined()
    expect(field.modelValue).toBeDefined()
    expect(field['onUpdate:modelValue']).toBeDefined()
  })
  it('should apply dirty and touched states when withDetails is specified', () => {
    const { register } = useFormHandler()
    const field = register('field', { withDetails: true })
    expect(field.isDirty).toBeDefined()
    expect(field.isTouched).toBeDefined()
  })
  it('should apply default value', () => {
    const { values, register } = useFormHandler()
    register('field', { defaultValue: 'something' })
    expect(values.field).toBe('something')
  })
  it('should trigger validation via handler', async () => {
    const { values, register, formState } = useFormHandler()
    const field = register('field', {
      validate: {
        error: (val) => val !== 'error' || 'Error with your field',
      },
    })
    if (field['onUpdate:modelValue']) {
      await field['onUpdate:modelValue']('error')
      expect(values.field).toBe('error')
      expect(formState.isValid).toBeFalsy()
    }
  })
  it('should trigger validation via setter', async () => {
    const { values, register, formState, setValue, triggerValidation } =
      useFormHandler()
    register('field', {
      validate: {
        error: (val) => val !== 'error' || 'Error with your field',
      },
    })
    await setValue('field', 'error')
    await triggerValidation('field')
    expect(values.field).toBe('error')
    expect(formState.isValid).toBeFalsy()
  })
  it('should trigger validation on dependent field', async () => {
    const { register, formState, setValue } = useFormHandler()
    register('field1', {
      dependentFields: ['field2'],
    })
    register('field2', {
      required: true,
    })
    await setValue('field1', 'error')
    expect(formState.isValid).toBeFalsy()
  })
  it('should trigger validation on multiple dependent fields', async () => {
    const { register, formState, setValue } = useFormHandler()
    register('field1', {
      dependentFields: ['field2', 'field3'],
    })
    register('field2', {
      required: true,
    })
    register('field3', {
      required: true,
    })
    await setValue('field1', 'error')
    expect(formState.errors.field2).toBeDefined()
    expect(formState.errors.field3).toBeDefined()
  })
})
