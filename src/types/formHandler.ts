import { ComputedRef, Ref } from 'vue'
import { RegisterOptions, RegisterReturn } from './register'

/** Expected function to be called after a form submitted successfully */
export type HandleSubmitSuccessFn = (values: Record<string, any>) => void

/** Optional function to be called after a form failed to submit */
export type HandleSubmitErrorFn = (
  errors: Record<string, string | undefined>
) => void

export type Build<T> = <TBuild extends Record<keyof T, RegisterOptions>>(
  configuration: TBuild | Ref<TBuild> | ComputedRef<TBuild>
) => ComputedRef<Record<keyof TBuild, Readonly<RegisterReturn>>>

export interface FormState<T> {
  isDirty: boolean
  isTouched: boolean
  isValid: boolean
  dirty: Record<keyof T, boolean>
  touched: Record<keyof T, boolean>
  errors: Record<keyof T, string | undefined>
}

export interface PartialReturn<T> {
/** Current form values */
  values: T

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
  modifiedValues: <TModified extends T>() => TModified
}

export interface InterceptorParams<T> extends PartialReturn<T> {
  /** Name of the field that is currently about to be set*/
  name: keyof T

  /** Value of the field that is currently about to be set */
  value: T[keyof T]
}

export interface FormHandlerReturn<T> extends PartialReturn<T> {
  /** Function to build the form */
  build: Build<T>

  /** Function to check the validity of the form */
  register: (name: keyof T, options?: RegisterOptions) => RegisterReturn
}

export type Interceptor<T> = (_: InterceptorParams<T>) => Promise<boolean> | boolean

export type SubmitValidation = (
  values: Record<string, any>
) => Promise<boolean> | boolean

export type InjectionKey = string | Symbol

export interface FormHandlerParams<TValues extends Record<string,any>, TInitial extends TValues = TValues> {
  /** Values to initialize the form */
  initialValues?:
    | TInitial
    | Ref<TInitial>
    | ComputedRef<TInitial>

  /** Field change interceptor */
  interceptor?: Interceptor<TValues>

  /** Validation function to execute before submitting (when using this individual validations are invalidated) */
  validate?: SubmitValidation

  /** Validation behavior options */
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'always'

  /** Injection key to override the default */
  injectionKey?: InjectionKey
}
