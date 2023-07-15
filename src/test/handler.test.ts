import { initialState, useFormHandler } from '../useFormHandler'
import { expect, it, describe } from 'vitest'

describe('useFormHandler()', () => {
  it('should have correct initial state and values', () => {
    const { values, formState } = useFormHandler()
    expect(values).toStrictEqual({})
    expect(formState).toStrictEqual({ ...initialState() })
  })
  it('should apply initialValues when specified', () => {
    const initialValues = {
      field: 'test',
    }
    const { values } = useFormHandler({ initialValues })
    expect(values).toStrictEqual(initialValues)
  })
  it('should set a value programmatically', async () => {
    const { values, setValue, formState } = useFormHandler()
    await setValue('field', 'oneTwoThree')
    expect(values.field).toBe('oneTwoThree')
    expect(formState.isDirty).toBeTruthy()
  })
  it('should clear a field', async () => {
    const { register, values, setValue, formState, clearField } =
      useFormHandler()
    register('field')
    await setValue('field', 'oneTwoThree')
    expect(values.field).toBe('oneTwoThree')
    expect(formState.isDirty).toBeTruthy()
    await clearField('field')
    expect(values.field).toBe(null)
    expect(formState.isDirty).toBeFalsy()
  })
  it('should leave an initialized field dirty when clearing', async () => {
    const { register, values, formState, clearField } = useFormHandler({
      initialValues: { field: 'value' },
    })
    register('field')
    expect(values.field).toBe('value')
    expect(formState.isDirty).toBeFalsy()
    await clearField('field')
    expect(values.field).toBe(null)
    expect(formState.isDirty).toBeTruthy()
  })
  it('should set an error programmatically', async () => {
    const { formState, setError } = useFormHandler()
    setError('field', 'some error')
    expect(formState.errors).toStrictEqual({ field: 'some error' })
    expect(formState.isValid).toBeFalsy()
  })
  it('should clear an error programmatically', async () => {
    const { formState, setError, clearError } = useFormHandler()
    const error = 'This field has an error'
    setError('field', error)
    expect(formState.isValid).toBeFalsy()
    clearError('field')
    expect(formState.errors.field).toBeUndefined()
    expect(formState.isValid).toBeTruthy()
  })
  it('should clear all form errors programmatically', async () => {
    const { formState, setError, clearError } = useFormHandler()
    const error = 'some error'
    setError('field1', error)
    setError('field2', error)
    expect(formState.errors.field1).toBe(error)
    expect(formState.errors.field2).toBe(error)
    expect(formState.isValid).toBeFalsy()
    clearError()
    expect(formState.errors.field1).toBeUndefined()
    expect(formState.errors.field2).toBeUndefined()
    expect(formState.isValid).toBeTruthy()
  })
  it('should correctly reset a field', async () => {
    const { values, formState, resetField, setValue } = useFormHandler({
      initialValues: { field: 'value' },
    })
    expect(values.field).toBe('value')
    expect(formState.isDirty).toBeFalsy()
    await setValue('field', 'some other value')
    expect(values.field).toBe('some other value')
    expect(formState.isDirty).toBeTruthy()
    resetField('field')
    expect(values.field).toBe('value')
    expect(formState.isDirty).toBeFalsy()
  })
  it('should return correct modifiedValues', async () => {
    const { modifiedValues, setValue } = useFormHandler({
      initialValues: {
        field: 'something',
      },
    })
    await setValue('field2', 'another thing')
    expect(modifiedValues()).toStrictEqual({ field2: 'another thing' })
  })
  it('should register field properly via build', () => {
    const { build, values } = useFormHandler()
    const form = build({
      field: {},
    })

    expect(form.value.field.name).toBe('field')
    expect(form.value.field.onBlur).toBeDefined()
    expect(form.value.field.isDirty).toBeUndefined()
    expect(form.value.field.isTouched).toBeUndefined()
    expect(form.value.field.onClear).toBeDefined()
    expect(form.value.field.onChange).toBeDefined()
    expect(form.value.field.modelValue).toBe(null)
    expect(form.value.field['onUpdate:modelValue']).toBeDefined()
    expect(values.field).toBe(null)
  })
})
