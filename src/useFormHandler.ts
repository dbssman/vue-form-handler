import {
  Build,
  FormHandlerParams,
  HandleSubmitErrorFn,
  HandleSubmitSuccessFn,
} from './types/formHandler'
import { DEFAULT_FIELD_VALUE, defaultInjectionKey } from './constants'
import {
  FieldReference,
  RegisterReturn,
  WrappedReference,
  RegisterOptions,
  FormState,
  NativeValidations,
} from './types'
import {
  computed,
  provide,
  reactive,
  readonly,
  unref,
  watch,
} from '@vue/runtime-core'
import { isEqual } from 'lodash-es'
import {
  getNativeFieldValue,
  getDefaultFieldValue,
  refFn,
  transformValidations,
} from './logic'
import { isNativeControl, objectKeys } from './utils'

export const initialState = () => ({
  touched: {},
  dirty: {},
  errors: {},
  isDirty: false,
  isTouched: false,
  isValid: true,
})

type Refs<T> = Record<keyof T, WrappedReference>

interface ValidateField<T> {
  name: keyof T
  values: T
  formState: FormState<T>
  _refs: any
}

export const useFormHandler = <
  TForm extends Record<string, any> = Record<string, any>,
  TInitial extends Partial<TForm> = Partial<TForm>,
>({
  initialValues = {} as TInitial,
  interceptor,
  validate,
  validationMode = 'onChange',
  injectionKey = defaultInjectionKey,
}: FormHandlerParams<TForm, TInitial> = {}) => {
  const values: Partial<TForm> = reactive({ ...unref(initialValues) })

  const formState = reactive({
    ...(initialState() as FormState<TForm>),
  }) as FormState<TForm>

  let _refs: Refs<TForm> = {} as Refs<TForm>

  const _getDefault = (name: keyof TForm): TForm[keyof TForm] =>
    _refs[name]?._defaultValue ?? getDefaultFieldValue(_refs[name]?.ref)
  const _getInitial = (name: keyof TForm): any =>
    unref(initialValues)?.[name] ?? _getDefault(name)
  const _initControl = (name: keyof TForm, options: RegisterOptions) => {
    const needsReset = options.disabled && _refs[name] && !_refs[name]._disabled
    _refs[name] = {
      ...(_refs[name] || {}),
      _validations: {
        ...(!options.useNativeValidation && transformValidations(options)),
        ...(options.validate || {}),
      },
      _defaultValue: options.defaultValue,
      _disabled: !!options.disabled,
      _dependentFields: options.dependentFields,
    }
    if (needsReset) {
      unregister(name)
      return
    }
    if (
      (!initialValues || unref(initialValues)?.[name] === undefined) &&
      values[name] === undefined
    ) {
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

  const _validateField = async <T>({
    name,
    values,
    formState,
    _refs,
  }: ValidateField<Partial<T>>) => {
    if (!Object.keys(_refs[name]?._validations ?? {}).length) {
      return
    }
    if (_refs[name]._disabled) {
      return
    }
    for (const validation of Object.values(_refs[name]._validations)) {
      const result = await (validation as any)(values[name])
      if (result !== true) {
        formState.errors[name] = result
        break
      }
      delete formState.errors[name]
    }
  }

  const _validateForm = async <T extends Record<string, any>>(
    params: Omit<ValidateField<T>, 'name'>
  ) => {
    for (const name of Object.keys(params.values)) {
      await _validateField({ ...params, name })
    }
  }

  const clearError = (name?: keyof TForm) => {
    try {
      if (!name) {
        formState.errors = {} as FormState<TForm>['errors']
        return
      }
      delete formState.errors[name]
    } finally {
      _updateValidState()
    }
  }

  const triggerValidation = async (name?: keyof TForm) => {
    try {
      if (!name) {
        await _validateForm({ formState, values, _refs })
        return
      }
      await _validateField({ formState, name, _refs, values })
    } finally {
      _updateValidState()
    }
  }

  const setDirty = (name: keyof TForm, dirty: boolean) => {
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

  const setTouched = (name: keyof TForm, touched: boolean) => {
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

  const resetField = (name: keyof TForm) => {
    values[name] = _getInitial(name)
    setTouched(name, false)
    setDirty(name, false)
    clearError(name)
  }

  const resetForm = () => {
    Object.assign(values, {
      ...Object.fromEntries(
        Object.keys(values).map((key) => [key, _getInitial(key)])
      ),
    })
    Object.assign(formState, initialState())
  }

  const setError = (name: keyof TForm, error: string) => {
    formState.errors[name] = error
    _updateValidState()
  }

  const modifiedValues = computed(() => {
    return Object.fromEntries(
      Object.entries(values).filter(([name]) => formState.dirty[name])
    ) as Partial<TForm>
  })

  const setValue = async (
    name: keyof TForm,
    value: any = DEFAULT_FIELD_VALUE
  ) => {
    const field = _refs[name]
    if (
      !field?._disabled &&
      (!interceptor ||
        (await interceptor({
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
          value: value as TForm[keyof TForm],
          values,
        })))
    ) {
      values[name] = value as any
      setDirty(name, !isEqual(value, _getInitial(name)))
      if (field && field._dependentFields) {
        for (const dependentField of field._dependentFields) {
          if (_refs[dependentField]) {
            await triggerValidation(dependentField)
          }
        }
      }
      return
    }
    if (
      isNativeControl(
        (Array.isArray(_refs[name].ref)
          ? (_refs[name].ref as FieldReference[])[0]
          : _refs[name].ref) as HTMLInputElement
      )
    ) {
      const prev = values[name]
      values[name] = undefined as any
      values[name] = prev
    }
  }

  const handleBlur = (name: keyof TForm) => {
    setTouched(name, true)
    if (['always', 'onBlur'].includes(validationMode)) {
      triggerValidation(name)
    }
  }

  const handleChange = async (
    name: keyof TForm,
    value = DEFAULT_FIELD_VALUE
  ) => {
    await setValue(name, value)
    setTouched(name, true)
    if (['always', 'onChange'].includes(validationMode)) {
      triggerValidation(name)
    }
  }

  const clearField = async (name: keyof TForm) => {
    const defaultValue: any = _getDefault(name)
    if (defaultValue !== values[name]) {
      await setValue(name, defaultValue)
      await triggerValidation(name)
    }
  }

  const unregister = (name: keyof TForm) => {
    delete _refs[name]
    delete values[name]
    delete formState.errors[name]
    delete formState.dirty[name]
    delete formState.touched[name]
    _updateTouchedState()
    _updateDirtyState()
    _updateValidState()
  }

  const register = (name: keyof TForm, options: RegisterOptions = {}) => {
    const {
      validate,
      defaultValue,
      disabled,
      withDetails,
      native,
      useNativeValidation,
      pattern,
      ...nativeValidations
    } = options
    _initControl(name, options)
    return {
      name,
      modelValue: values[name],
      'onUpdate:modelValue': async (value: any) =>
        await handleChange(name, value),
      ref: refFn<TForm>(name, _refs, values),
      onBlur: () => handleBlur(name),
      onClear: () => clearField(name),
      ...(disabled ? { disabled: true } : { disabled: undefined }),
      ...(withDetails && {
        isDirty: !!formState.dirty[name],
        isTouched: !!formState.touched[name],
      }),
      ...(native !== false && {
        onChange: async () => {
          if (
            !_refs[name].ref ||
            (_refs[name].ref as FieldReference).type === 'custom'
          ) {
            return
          }
          await handleChange(name, getNativeFieldValue(_refs[name].ref))
        },
      }),
      ...(useNativeValidation && {
        ...{
          ...(nativeValidations as NativeValidations),
          ...(pattern && {
            pattern:
              pattern instanceof RegExp
                ? pattern.source
                : (pattern as NativeValidations['pattern']),
          }),
        },
      }),
    }
  }

  const build: Build<TForm> = (configuration) => {
    const plainConfig = unref(configuration)
    const built = computed(() =>
      objectKeys(plainConfig).reduce(
        (acc, key) => {
          acc[key] = register(key as unknown as keyof TForm, plainConfig[key])
          return acc
        },
        {} as Record<
          keyof typeof plainConfig,
          Readonly<RegisterReturn<typeof plainConfig>>
        >
      )
    )
    return built
  }

  const isValidForm = async () => {
    if (validate) {
      return await validate(values)
    }
    await triggerValidation()
    return formState.isValid
  }

  const handleSubmit = async (
    successFn: HandleSubmitSuccessFn<TForm>,
    errorFn?: HandleSubmitErrorFn<TForm>
  ) => {
    if (await isValidForm()) {
      successFn(values as TForm)
      return
    }
    if (errorFn) {
      errorFn(formState.errors)
    }
  }

  watch(
    () => initialValues,
    () => {
      resetForm()
    },
    { deep: true }
  )

  const toExpose = {
    build,
    clearError,
    clearField,
    formState: readonly(formState),
    handleSubmit,
    modifiedValues: readonly(modifiedValues),
    register,
    resetField,
    resetForm,
    setError,
    setValue,
    triggerValidation,
    unregister,
    values: readonly(values),
  }

  provide(injectionKey, toExpose)

  return toExpose
}
