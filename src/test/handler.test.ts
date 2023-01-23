import useFormHandler, { initialState } from '../useFormHandler';
import { expect, it, describe } from "vitest"

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
        expect(formState.isValid).toBeFalsy()
    })
    it('Clearing an error programmatically', async () => {
        const { formState, setError, clearError } = useFormHandler();
        const error = 'This field has an error'
        setError('field', error)
        expect(formState.isValid).toBeFalsy()
        clearError('field')
        expect(formState.errors.field).toBeUndefined()
        expect(formState.isValid).toBeTruthy()
    })
    it('Clearing all errors of the form programmatically', async () => {
        const { formState, setError, clearError } = useFormHandler();
        const errorField1 = { error1: 'some error' }
        const errorField2 = { error2: 'some error' }
        setError('field1', errorField1)
        setError('field2', errorField2)
        expect(formState.errors.field1).toStrictEqual(errorField1)
        expect(formState.errors.field2).toStrictEqual(errorField2)
        expect(formState.isValid).toBeFalsy()
        clearError()
        expect(formState.errors.field1).toBeUndefined()
        expect(formState.errors.field2).toBeUndefined()
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