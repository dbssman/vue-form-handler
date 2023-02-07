import { NativeValidations } from './types/validations';
import { DEFAULT_FIELD_VALUE } from './constants';
import {
  ModifiedValues,
  TriggerValidation,
  UseFormHandler,
  ResetField,
  ResetForm,
  InitControl,
  SetError,
  ClearError,
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
  ValidationsConfiguration,
  Unregister,
  FieldReference
} from './types';
import { reactive, readonly, unref, watch } from '@vue/runtime-core'
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

export const useFormHandler: UseFormHandler = ({
  initialValues = {},
  interceptor,
  validate,
  validationMode = 'onChange'
} = {}) => {
  const values: Record<string, any> = reactive({ ...unref(initialValues) })
  const formState = reactive<FormState>({ ...initialState() })

  let _refs: Refs = {}

  const _getDefault = (name: string): any => _refs[name]?._defaultValue ?? getDefaultFieldValue(_refs[name]?.ref)
  const _getInitial = (name: string): any => unref(initialValues)?.[name] ?? _getDefault(name)
  const _initControl: InitControl = (name, options) => {
    const needsReset = options.disabled && _refs[name] && !_refs[name]._disabled
    _refs[name] = {
      ..._refs[name] || {},
      _validations: {
        ...(!options.useNativeValidation
          && transformValidations(options as ValidationsConfiguration)),
        ...(options.validate || {})
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
    formState.isValid = !Object.values(formState.errors).some(Boolean)
  }

  const _updateDirtyState = () => {
    formState.isDirty = Object.values(formState.dirty).some(Boolean)
  }

  const _updateTouchedState = () => {
    formState.isTouched = Object.values(formState.touched).some(Boolean)
  }

  const clearError: ClearError = (name) => {
    try {
      if (!name) {
        formState.errors = {}
        return
      }
      delete formState.errors[name]
    } finally {
      _updateValidState()
    }
  }

  const triggerValidation: TriggerValidation = async (name) => {
    try {
      if (!name) {
        await validateForm({ formState, values, _refs })
        return
      }
      await validateField({ formState, name, _refs, values })
    } finally {
      _updateValidState()
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
      _updateDirtyState()
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
      _updateTouchedState()
    }
  }

  const resetField: ResetField = (name) => {
    values[name] = _getInitial(name)
    setTouched(name, false)
    setDirty(name, false)
    clearError(name)
  }

  const resetForm: ResetForm = () => {
    Object.assign(values, {
      ...Object.fromEntries(Object.keys(values).map((key) => [key, _getInitial(key)])),
    })
    Object.assign(formState, initialState())
  }

  const setError: SetError = (name, error) => {
    formState.errors[name] = error
    _updateValidState()
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
          clearError,
          clearField,
          formState,
          modifiedValues,
          name,
          resetField,
          resetForm,
          setError,
          setValue,
          triggerValidation,
          value,
          values
        }))) {
      values[name] = value
      setDirty(name, !isEqual(value, _getInitial(name)))
    }
  }

  const handleBlur: HandleBlur = (name) => {
    setTouched(name, true)
    if (['always', 'onBlur'].includes(validationMode)) {
      triggerValidation(name)
    }
  }

  const handleChange: HandleChange = async (name, value = DEFAULT_FIELD_VALUE) => {
    await setValue(name, value)
    setTouched(name, true)
    if (['always', 'onChange'].includes(validationMode)) {
      triggerValidation(name)
    }
  }

  const clearField: ClearField = async (name) => {
    const defaultValue: any = _getDefault(name);
    if (defaultValue !== values[name]) {
      await setValue(name, defaultValue)
      await triggerValidation(name)
    }
  }

  const unregister: Unregister = (name) => {
    delete _refs[name]
    delete values[name]
    delete formState.errors[name]
    delete formState.dirty[name]
    delete formState.touched[name]
    _updateTouchedState()
    _updateDirtyState()
    _updateValidState()
  }

  const register: Register = (name, options = {}) => {
    const {
      validate,
      defaultValue,
      disabled,
      withDetails,
      native,
      useNativeValidation,
      pattern,
      ...nativeValidations } = options
    _initControl(name, options);
    return ({
      name,
      modelValue: values[name],
      error: formState.errors[name],
      'onUpdate:modelValue': async (value: any) => await handleChange(name, value),
      ref: refFn(name, _refs, values),
      onBlur: () => handleBlur(name),
      onClear: () => clearField(name),
      ...(disabled && { disabled: true }),
      ...(withDetails && {
        isDirty: !!formState.dirty[name],
        isTouched: !!formState.touched[name],
      }),
      ...(native !== false && {
        onChange: async () => {
          if (!_refs[name].ref || (_refs[name].ref as FieldReference).type === 'custom') {
            return
          }
          await handleChange(name, getNativeFieldValue(_refs[name].ref))
        },
      }),
      ...(useNativeValidation && {
        ...({
          ...nativeValidations,
          ...(pattern && { pattern: pattern instanceof RegExp ? pattern.source : pattern }),
        } as NativeValidations)
      })
    })
  }

  const isValidForm: IsValidForm = async () => {
    if (validate) {
      return await validate(values)
    }
    await triggerValidation()
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

  watch(() => initialValues, () => {
    resetForm()
  }, { deep: true })

  return {
    clearError,
    clearField,
    formState: readonly(formState),
    handleSubmit,
    modifiedValues,
    register,
    resetField,
    resetForm,
    setError,
    setValue,
    triggerValidation,
    unregister,
    values: readonly(values)
  }
}
