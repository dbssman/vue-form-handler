import { describe, it, expect } from 'vitest'
import useFormHandler from '../useFormHandler'

const sleep = () => new Promise((resolve) => setTimeout(() => resolve(true), 50))

describe('Register function testing', () => {
    it('Registering a field', () => {
        const { values, register } = useFormHandler();
        const field = register('field')
        expect(field.name).toBe('field')
        expect(field.errors).toStrictEqual([])
        expect(field.onBlur).toBeDefined()
        expect(field.isDirty).toBeUndefined()
        expect(field.isTouched).toBeUndefined()
        expect(field.onClear).toBeDefined()
        expect(field.onChange).toBeDefined()
        expect(field.modelValue).toBe(null)
        expect(field['onUpdate:modelValue']).toBeDefined()
        expect(values.field).toBe(null)
    })
    it('Specified native field should have native handlers', () => {
        const { register } = useFormHandler();
        const field = register('field', { native: true })
        expect(field.ref).toBeDefined()
        expect(field.onChange).toBeDefined()
    })
    it('Specified custom field shouldn\'t have native handlers', () => {
        const { register } = useFormHandler();
        const field = register('field', { native: false })
        expect(field.onChange).toBeUndefined()
        expect(field.modelValue).toBeDefined()
        expect(field['onUpdate:modelValue']).toBeDefined()
    })
    it('Input registered with details receives dirty and touched states', () => {
        const { register } = useFormHandler();
        const field = register('field', { withDetails: true })
        expect(field.isDirty).toBeDefined()
        expect(field.isTouched).toBeDefined()
    })
    it('Clearable inputs should have a bound clear handler', () => {
        const { register } = useFormHandler();
        const field = register('field', { clearable: true })
        expect(field.onClear).toBeDefined()
    })
    it('Registering a field with default value', () => {
        const { values, register } = useFormHandler();
        register('field', { defaultValue: 'something' })
        expect(values.field).toBe('something')
    })
    it('Registered validations work on update via handler', async () => {
        const { values, register, formState } = useFormHandler();
        const field = register('field', {
            validations: {
                error: (val) => val !== 'error' || 'Error with your field'
            }
        })
        if (field['onUpdate:modelValue']) {
            field['onUpdate:modelValue']('error')
            await sleep()
            expect(values.field).toBe('error')
            expect(formState.isValid).toBeFalsy()
        }
    })
    it('Registered validations work on update via setter', async () => {
        const { values, register, formState, setValue, triggerValidation } = useFormHandler();
        register('field', {
            validations: {
                error: (val) => val !== 'error' || 'Error with your field'
            }
        })
        await setValue('field', 'error')
        await triggerValidation('field')
        expect(values.field).toBe('error')
        await sleep()
        expect(formState.isValid).toBeFalsy()
    })
})