import { DEFAULT_FIELD_VALUE } from './core/constants';
import {
  ModifiedValues,
  TriggerValidation,
  Validations,
  FormHandler,
  ResetField,
  ResetForm,
  InitControl,
  SetError,
  ClearErrors,
  SetValue,
  ClearField,
  SetDirty,
  SetTouched,
  HandleBlur,
  HandleChange,
  FormState,
  HandleSubmit,
  Register
} from './types/formHandler';
import { reactive, readonly, watch } from 'vue'
import { isEqual } from 'lodash-es'
import { getNativeFieldValue, validateField, validateForm, getDefaultFieldValue } from './logic';
import refFn from './logic/refFn';

export const initialState = () => ({
  touched: {},
  dirty: {},
  errors: {},
  isDirty: false,
  isTouched: false,
  isValid: true,
})

const useFormHandler: FormHandler = ({
  initialValues = {},
  interceptor,
  validate,
  validationMode = 'onChange'
} = {}) => {
  const values: Record<string, any> = reactive({ ...initialValues })
  const formState = reactive<FormState>({ ...initialState() })

  let validations: Record<string, Validations> = {}
  let defaultValues: Record<string, any> = {}
  let refs: Record<string, any> = {}

  const getDefault = (name: string): any => defaultValues[name] ?? getDefaultFieldValue(refs[name])
  const getInitial = (name: string): any => initialValues[name] ?? getDefault(name)

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
      values[name] = getDefault(name)
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

    if (!Object.entries(formState.errors[name]).length) {
      delete formState.errors[name]
    }
  }

  const triggerValidation: TriggerValidation = async (name) => {
    if (!Object.keys(validations).length) {
      return
    }
    if (!name) {
      validateForm({ formState, values, validations })
      return
    }
    validateField({ formState, name, validations, values })
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
    values[name] = getInitial(name)
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
      setDirty(name, !isEqual(value, getInitial(name)))
    }
  }

  const handleBlur: HandleBlur = (name) => {
    setTouched(name, true)
    if (validationMode === 'onBlur' || validationMode === 'always') {
      triggerValidation(name)
    }
  }

  const handleChange: HandleChange = async (name, value = DEFAULT_FIELD_VALUE) => {
    await setValue(name, value)
    setTouched(name, true)
    if (validationMode === 'onChange' || validationMode === 'always') {
      triggerValidation(name)
    }
  }

  const clearField: ClearField = async (name) => {
    await setValue(name, getDefault(name))
  }

  const register: Register = (name, options = {}) => {
    initControl(name, options);
    return ({
      name,
      modelValue: values[name],
      errors: Object.values(formState.errors[name] || {}) || [],
      'onUpdate:modelValue': (value: any) => handleChange(name, value),

      ref: refFn({ name, refs, values }),
      onBlur: () => handleBlur(name),
      onClear: () => clearField(name),

      ...(options.withDetails && {
        isDirty: !!formState.dirty[name],
        isTouched: !!formState.touched[name],
      }),
      ...(options.native !== false && {
        onChange: () => handleChange(name, getNativeFieldValue(refs[name] as HTMLInputElement)),
        ...(options.required && { required: true })
      }),
    })
  }

  const handleSubmit: HandleSubmit = async (successFn, errorFn) => {
    let valid = false;
    if (validate) {
      valid = await validate()
    }
    else {
      if (validationMode === 'onSubmit' || validationMode === 'always') {
        await triggerValidation()
      }
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
