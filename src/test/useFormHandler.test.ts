import { initialState, useFormHandler } from '../useFormHandler'
import { expect, it, describe } from 'vitest'

describe('useFormHandler()', () => {
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
  describe('handler functionality',() => {
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
})
