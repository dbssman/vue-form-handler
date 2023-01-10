import useFormHandler, { initialState } from '../src/useFormHandler';
import { expect, it, describe } from "vitest"

const sleep = () => new Promise((resolve) => setTimeout(() => resolve(true), 50))

describe('Form handler testing', () => {
    it('Initial form state and values', () => {
        const { values, formState } = useFormHandler();
        expect(values).toStrictEqual({})
        expect(formState).toStrictEqual({ ...initialState() })
    })
    it('Initial values should be applied without', () => {
        const initialValues = {
            field: 'test'
        }
        const { values } = useFormHandler({ initialValues });
        expect(values).toStrictEqual(initialValues)
    })
    it('Setting a value programmatically', async () => {
        const { values, setValue, formState } = useFormHandler();
        await setValue('field', 'oneTwoThree');
        expect(values.field).toBe('oneTwoThree')
        expect(formState.isDirty).toBeTruthy()
    })
    it('Clearing a field programmatically', async () => {
        const { values, setValue, formState, clearField } = useFormHandler();
        await setValue('field', 'oneTwoThree');
        expect(values.field).toBe('oneTwoThree')
        expect(formState.isDirty).toBeTruthy()
        await clearField('field');
        expect(values.field).toBe(null)
        expect(formState.isDirty).toBeFalsy()
    })
    it('Clearing an initialized field leaves it dirty', async () => {
        const { values, formState, clearField } = useFormHandler({
            initialValues: { field: 'value' }
        });
        expect(values.field).toBe('value')
        expect(formState.isDirty).toBeFalsy()
        await clearField('field');
        expect(values.field).toBe(null)
        expect(formState.isDirty).toBeTruthy()
    })
    it('Setting an error programmatically', async () => {
        const { formState, setError } = useFormHandler();
        setError('field', { error: 'some error' })
        expect(formState.errors).toStrictEqual({ field: { error: 'some error' } })
        await sleep()
        expect(formState.isValid).toBeFalsy()
    })
    it('Clearing one error of a control programmatically', async () => {
        const { formState, setError, clearErrors } = useFormHandler();
        const errors = { error: 'some error', error2: 'some other error' }
        setError('field', errors)
        await sleep()
        expect(formState.isValid).toBeFalsy()
        clearErrors('field', 'error')
        expect(formState.errors.field).toStrictEqual({ error2: 'some other error' })
        await sleep()
        expect(formState.isValid).toBeFalsy()
    })
    it('Clearing all errors of a control programmatically', async () => {
        const { formState, setError, clearErrors } = useFormHandler();
        const errors = { error: 'some error', error2: 'some other error' }
        setError('field', errors)
        await sleep()
        expect(formState.isValid).toBeFalsy()
        clearErrors('field')
        expect(formState.errors.field).toStrictEqual({})
        await sleep()
        expect(formState.isValid).toBeTruthy()
    })
    it('Clearing all errors of the form programmatically', async () => {
        const { formState, setError, clearErrors } = useFormHandler();
        const errorField1 = { error1: 'some error' }
        const errorField2 = { error2: 'some error' }
        setError('field1', errorField1)
        setError('field2', errorField2)
        expect(formState.errors.field1).toStrictEqual(errorField1)
        expect(formState.errors.field2).toStrictEqual(errorField2)
        await sleep()
        expect(formState.isValid).toBeFalsy()
        clearErrors()
        expect(formState.errors.field1).toBeUndefined()
        expect(formState.errors.field2).toBeUndefined()
        await sleep()
        expect(formState.isValid).toBeTruthy()
    })
    it('Resetting a field it back to its initial values and state', async () => {
        const { values, formState, resetField, setValue } = useFormHandler({
            initialValues: { field: 'value' }
        });
        expect(values.field).toBe('value')
        expect(formState.isDirty).toBeFalsy()
        await setValue('field', 'some other value')
        expect(values.field).toBe('some other value')
        expect(formState.isDirty).toBeTruthy()
        resetField('field');
        expect(values.field).toBe('value')
        expect(formState.isDirty).toBeFalsy()
    })
    it('Expecting modifiedValues to work', async () => {
        const { modifiedValues, setValue } = useFormHandler({
            initialValues: {
                field: 'something'
            }
        });
        await setValue('field2', 'another thing')
        expect(modifiedValues()).toStrictEqual({ field2: 'another thing' })
    })
})

describe('Register function testing', () => {
    it('Registering a field', () => {
        const { values, register } = useFormHandler();
        const field = register('field')
        expect(field.name).toBe('field')
        expect(field.errors).toStrictEqual([])
        expect(field.onBlur).toBeDefined()
        expect(field.isDirty).toBeUndefined()
        expect(field.isTouched).toBeUndefined()
        expect(field.onClear).toBeUndefined()
        expect(field.ref).toBe(null)
        expect(field.onChange).toBeDefined()
        expect(field.modelValue).toBe(null)
        expect(field['onUpdate:modelValue']).toBeDefined()
        expect(values.field).toBe(null)
    })
    it('Specified native field shouldn\'t have custom handlers', () => {
        const { register } = useFormHandler();
        const field = register('field', { native: true })
        expect(field.ref).toBeDefined()
        expect(field.onChange).toBeDefined()
        expect(field.modelValue).toBeUndefined()
        expect(field['onUpdate:modelValue']).toBeUndefined()
    })
    it('Specified custom field shouldn\'t have native handlers', () => {
        const { register } = useFormHandler();
        const field = register('field', { native: false })
        expect(field.ref).toBeUndefined()
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
        expect(formState.isValid).toBeFalsy()
    })
})