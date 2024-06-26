import { ComputedRef, Ref } from '@vue/runtime-core'
import { RegisterOptions, RegisterReturn } from './register'

type ComputableUnion<T> = T | Ref<T> | ComputedRef<T>

type ConfigType<T> = Partial<Record<keyof T, RegisterOptions>>

type PossiblePromise<T> = T | Promise<T>

export interface FormState<T> {
  isDirty: boolean
  isTouched: boolean
  isValid: boolean
  isValidating: boolean
  dirty: Record<keyof T, boolean>
  touched: Record<keyof T, boolean>
  errors: Record<keyof T, string | undefined>
  validating: Record<keyof T, boolean>
}

/** Optional function to be called after a form failed to submit */
export type HandleSubmitErrorFn<T> = (errors: FormState<T>['errors']) => void

/** Expected function to be called after a form submitted successfully */
export type HandleSubmitSuccessFn<T> = (
  values: Record<keyof T, any>
) => PossiblePromise<void>

export type Build<T extends Record<string, any> = Record<string, any>> = <
  TBuild extends Partial<T>,
>(
  configuration: ComputableUnion<ConfigType<TBuild>>
) => ComputedRef<
  Record<
    keyof TBuild,
    Readonly<RegisterReturn<Partial<Record<keyof TBuild, RegisterOptions>>>>
  >
>
export interface PartialReturn<T> {
  /** Current form values */
  values: Partial<T>

  /** Current form state */
  formState: FormState<T>

  /** Triggers the validation of a field */
  triggerValidation: (name?: keyof T | undefined) => Promise<void>

  /** Function to reset a field */
  resetField: (name: keyof T) => void

  /** Function to reset the whole form */
  resetForm: () => void

  /** Function to set an error on a field programmatically */
  setError: (name: keyof T, error: string) => void

  /** Function to set the value of a field programmatically */
  setValue: (name: keyof Omit<T, keyof T>, value?: any) => Promise<void>

  /** Function to clear one or more errors on a desired field or the whole form*/
  clearError: (name: keyof T) => void

  /** Function to clear a desired field*/
  clearField: (name: keyof T) => void

  /** Function that returns the modified values of the form */
  modifiedValues: ComputedRef<Partial<T>>
}

export interface InterceptorParams<T> extends PartialReturn<T> {
  /** Name of the field that is currently about to be set*/
  name: keyof T

  /** Value of the field that is currently about to be set */
  value: T[keyof T]
}

export interface FormHandlerReturn<T extends Record<string, any>>
  extends PartialReturn<T> {
  /** Function to build the form */
  build: Build<T>

  /** Function to check the validity of the form */
  register: (name: keyof T, options?: RegisterOptions) => RegisterReturn

  /** Function to submit the form */
  handleSubmit: (
    successFn: HandleSubmitSuccessFn<T>,
    errorFn?: HandleSubmitErrorFn<T>
  ) => void
}

export type Interceptor<T> = (
  _: InterceptorParams<T>
) => PossiblePromise<boolean>

export type SubmitValidation = (
  values: Record<string, any>
) => PossiblePromise<boolean>

export type InjectionKey = string | Symbol

export interface FormHandlerParams<
  TForm extends Record<string, any> = Record<string, any>,
  TInitial extends Record<string, any> = Record<string, any>,
> {
  /** Values to initialize the form */
  initialValues?: ComputableUnion<TInitial>

  /** Field change interceptor */
  interceptor?: Interceptor<TForm>

  /** Validation function to execute before submitting (when using this individual validations are invalidated) */
  validate?: (values: Partial<TForm>) => PossiblePromise<boolean>

  /** Validation behavior options */
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'always'

  /** Injection key to override the default */
  injectionKey?: InjectionKey
}
