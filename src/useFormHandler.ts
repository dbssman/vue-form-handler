import { DEFAULT_FIELD_VALUE } from './core/constants';
import {
  ModifiedValues,
  TriggerValidation,
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
  Register,
  IsValidForm,
  Refs,
  ValidationsConfiguration
} from './types';
import { reactive, readonly, watch } from 'vue'
import { isEqual } from 'lodash-es'
import { getNativeFieldValue, validateField, validateForm, getDefaultFieldValue, refFn, transformValidations } from './logic';

export const initialState = () => ({
  touched: {},
  dirty: {},
  errors: {},
  isDirty: false,
  isTouched: false,
  isValid: true,
})

//TODO: add descriptive Error throwing for easier debugging
//TODO: avoid watcher to update validation state
const useFormHandler: FormHandler = ({
  initialValues = {},
  interceptor,
  validate,
  validationMode = 'onChange'
} = {}) => {
  const values: Record<string, any> = reactive({ ...initialValues })
  const formState = reactive<FormState>({ ...initialState() })

  let _refs: Refs = {}

  const _getDefault = (name: string): any => _refs[name]?._defaultValue ?? getDefaultFieldValue(_refs[name]?.ref)
  const _getInitial = (name: string): any => initialValues[name] ?? _getDefault(name)
  const _initControl: InitControl = (name, options) => {
    const needsReset = options.disabled && _refs[name] && !_refs[name]._disabled
    _refs[name] = {
      ..._refs[name] || {},
      _validations: {
        ...(!options.useNativeValidation
          && transformValidations(options as ValidationsConfiguration)),
        ...(options.validations || {})
      },
      _defaultValue: options.defaultValue,
      _disabled: !!options.disabled,
    }
    if (needsReset) {
      unregister(name)
      return
    }
    if (initialValues[name] === undefined && values[name] === undefined) {
      values[name] = _getDefault(name)
    }
  }

  const _updateValidState = () => {
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
    if (!name) {
      validateForm({ formState, values, _refs })
      return
    }
    validateField({ formState, name, _refs, values })
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
    values[name] = _getInitial(name)
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
    if (!_refs[name]?._disabled
      && (!interceptor
        || await interceptor({
          name,
          value,
          values,
          formState,
          clearErrors,
          modifiedValues,
          resetField,
          resetForm,
          setError,
          triggerValidation
        }))) {
      values[name] = value
      setDirty(name, !isEqual(value, _getInitial(name)))
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
    await setValue(name, _getDefault(name))
  }

  const unregister = (name: string) => {
    delete _refs[name]
    delete values[name]
    delete formState.errors[name]
    delete formState.dirty[name]
    delete formState.touched[name]
  }

  const register: Register = (name, options = {}) => {
    const {
      validations,
      defaultValue,
      disabled,
      withDetails,
      native,
      useNativeValidation,
      ...nativeValidations } = options
    _initControl(name, options);
    return ({
      name,
      modelValue: values[name],
      errors: Object.values(formState.errors[name] || {}) || [],
      'onUpdate:modelValue': (value: any) => handleChange(name, value),
      ref: refFn(name, _refs, values),
      onBlur: () => handleBlur(name),
      onClear: () => clearField(name),
      ...(disabled && { disabled: true }),
      ...(withDetails && {
        isDirty: !!formState.dirty[name],
        isTouched: !!formState.touched[name],
      }),
      ...(native !== false && {
        onChange: () => handleChange(name, getNativeFieldValue(_refs[name].ref)),
      }),
      ...(useNativeValidation && {
        ...nativeValidations
      })
    })
  }

  const isValidForm: IsValidForm = async () => {
    if (['always', 'onSubmit'].includes(validationMode)) {
      if (validate) {
        return await validate()
      }
      triggerValidation()
    }
    return formState.isValid
  }

  const handleSubmit: HandleSubmit = async (successFn, errorFn) => {
    try {
      if (await isValidForm()) {
        successFn(values)
        return
      }
      if (errorFn) {
        errorFn(formState.errors)
        return
      }
    } catch {
      throw new Error('One or more errors found during validation')
    }
  }

  watch(
    () => formState.errors,
    () => {
      _updateValidState();
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
