import { DEFAULT_FIELD_VALUE } from './constants';
import { ModifiedValues, TriggerValidation, Validations, FormHandler, ResetField, ResetForm, InitControl, SetError, ClearErrors, SetValue, ClearField, SetDirty, SetTouched, HandleBlur, HandleChange, GetInitValueForControl } from './types';
import { FormState, HandleSubmit, Register } from './types';
import { reactive, readonly, watch } from 'vue'
import { isEqual } from 'lodash-es'
import { getNativeFieldValue } from './logic';
import { isCheckboxInput, isRadioInput, isMultipleSelect, isNativeControl, isDefined } from './utils';
import getDefaultFieldValue from './logic/getDefaultFieldValue';

export const initialState = () => ({
  touched: {},
  dirty: {},
  errors: {},
  isDirty: false,
  isTouched: false,
  isValid: true,
})

//TODO: separate synchronous from asynchronous validations
//TODO: extend validation behaviors
const useFormHandler: FormHandler = ({
  initialValues = {},
  interceptor,
  validate,
  // TODO: if no further options, validation behavior should be considered along with the base params
  options = { validationBehaviour: 'always' }
} = {}) => {
  const values: Record<string, any> = reactive({ ...initialValues })
  const formState = reactive<FormState>({ ...initialState() })

  let validations: Record<string, Validations> = {}
  let defaultValues: Record<string, any> = {}
  let refs: Record<string, any> = {}

  const getDefaultValueForControl = (name: string) => defaultValues[name] ?? getDefaultFieldValue(refs[name])
  const getInitValueForControl: GetInitValueForControl = (name) => initialValues[name] ?? getDefaultValueForControl(name)
  const initControl: InitControl = (name, options) => {
    validations = {
      ...validations,
      [name]: options.validations || {}
    }
    defaultValues = {
      ...defaultValues,
      [name]: options.defaultValue
    }
    if (initialValues[name] === undefined && values[name] === undefined) {
      values[name] = getDefaultValueForControl(name)
    }
  }

  const isValid = () => {
    formState.isValid = !Object.keys(formState.errors).some(field => Object.keys(formState.errors[field]).length)
  }

  const clearErrors: ClearErrors = (name, errors) => {
    if (!name) {
      formState.errors = {}
      return
    }
    if (!errors) {
      delete formState.errors[name]
      return
    }
    formState.errors[name] = Object.fromEntries(Object
      .entries(formState.errors[name])
      .filter(([errorName]) => Array.isArray(errors)
        ? !errors.includes(errorName)
        : errors !== errorName))

    if (Object.entries(formState.errors[name]).length < 1) {
      delete formState.errors[name]
    }
  }

  const triggerValidation: TriggerValidation = async (name) => {
    if (!Object.keys(validations).length) {
      return
    }
    if (!name) {
      for (const field of Object.keys(values)) {
        await triggerValidation(field)
      }
      return
    }
    if (!Object.keys(validations[name]).length) {
      return
    }
    for (const [validationName, validation] of Object.entries(validations[name])) {
      const result = await validation(values[name])
      formState.errors[name] = {
        ...(result !== true && { [validationName]: result })
      }
      if (result !== true) {
        break;
      }
      //TODO: improve this
      clearErrors(name)
    }
  }

  const setDirty: SetDirty = (name, dirty) => {
    if (formState.dirty[name] !== dirty) {
      if (dirty) {
        formState.dirty[name] = true
        formState.isDirty = true
        return
      }
      delete formState.dirty[name]
      formState.isDirty = Object.values(formState.touched).some(Boolean)
    }
  }

  const setTouched: SetTouched = (name, touched) => {
    if (formState.touched[name] !== touched) {
      if (touched) {
        formState.touched[name] = true
        formState.isTouched = true
        return
      }
      delete formState.touched[name]
      formState.isTouched = Object.values(formState.touched).some(Boolean)
    }
  }

  const resetField: ResetField = (name) => {
    values[name] = getInitValueForControl(name)
    setTouched(name, false)
    setDirty(name, false)
  }

  const resetForm: ResetForm = () => {
    Object.keys(values).forEach((key) => {
      resetField(key)
    })
  }

  const setError: SetError = (name, error, replace = false) => {
    formState.errors[name] = {
      ...(!replace && formState.errors[name]),
      ...error
    }
  }

  const modifiedValues: ModifiedValues = () => {
    return Object.fromEntries(Object
      .entries(values)
      .filter(([name]) => formState.dirty[name]))
  }

  const setValue: SetValue = async (name, value = DEFAULT_FIELD_VALUE) => {
    if (!interceptor || await interceptor({ name, value, values, formState, clearErrors, modifiedValues, resetField, resetForm, setError, triggerValidation })) {
      values[name] = value
      setDirty(name, !isEqual(value, getInitValueForControl(name)))
    }
  }

  const handleBlur: HandleBlur = (name) => {
    setTouched(name, true)
    triggerValidation(name)
  }

  const handleChange: HandleChange = async (name, value = DEFAULT_FIELD_VALUE) => {
    await setValue(name, value)
    setTouched(name, true)
    triggerValidation(name)
  }

  const clearField: ClearField = async (name) => {
    await setValue(name, getDefaultValueForControl(name))
  }

  const register: Register = (name, options = {}) => {
    initControl(name, options);
    return ({
      name,
      errors: Object.values(formState.errors[name] || {}) || [],
      onBlur: () => handleBlur(name),
      ...(options.withDetails && {
        isDirty: !!formState.dirty[name],
        isTouched: !!formState.touched[name],
      }),
      modelValue: values[name],
      'onUpdate:modelValue': (value: any) => handleChange(name, value),
      ref: (fieldRef: any) => {
        if (!fieldRef || !fieldRef.nodeName || !isNativeControl(fieldRef)) {
          refs = {
            ...refs,
            [name]: {
              type: 'custom'
            }
          }
          return
        }
        if (!refs[name] || (isRadioInput(fieldRef) && !refs[name].some((option: any) => option.value === fieldRef.value))) {
          refs = {
            ...refs,
            [name]: isRadioInput(fieldRef) ? [...(refs[name] || []), fieldRef] : fieldRef
          }
        }
        if (isRadioInput(fieldRef)) {
          if (fieldRef.checked) {
            values[name] = fieldRef.value
            return
          }
          fieldRef.checked = (values[name] === fieldRef.value)
          return
        }
        if (isCheckboxInput(fieldRef)) {
          if (isDefined(fieldRef.checked)) {
            values[name] = !!fieldRef.checked
            return
          }
          fieldRef.checked = !!values[name]
          return
        }
        if (isMultipleSelect(fieldRef)) {
          [...fieldRef.options].forEach((option: any, index) => {
            fieldRef[index].selected = !!values[name]?.includes(option.value)
          })
          return
        }
        fieldRef.value = values[name]
      },
      ...(options.native !== false && {
        onChange: () => handleChange(name, getNativeFieldValue(refs[name] as HTMLInputElement)),
        ...(options.required && { required: true })
      }),
      ...(options.clearable && { onClear: () => resetField(name) })
    })
  }

  const handleSubmit: HandleSubmit = async (successFn, errorFn) => {
    let valid = false;
    if (validate) {
      valid = await validate()
    }
    else {
      await triggerValidation()
      valid = formState.isValid
    }
    if (valid) {
      successFn(values)
      return
    }
    if (errorFn) {
      errorFn(formState.errors)
      return
    }
    throw new Error('One or more errors found during validation')
  }

  watch(
    () => formState.errors,
    () => {
      isValid();
    }, { deep: true, immediate: true })

  return {
    values: readonly(values),
    formState,
    register,
    setValue,
    setError,
    clearErrors,
    clearField,
    resetField,
    resetForm,
    handleSubmit,
    modifiedValues,
    triggerValidation,
  }
}

export default useFormHandler
