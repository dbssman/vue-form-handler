import { ComputedRef, Ref } from 'vue'
import { RegisterOptions, Register } from './register'

export interface FormState {
  /** Boolean holding the dirty state of the form */
  isDirty: boolean

  /** Boolean holding the touched state of the form */
  isTouched: boolean

  /** Boolean holding the valid state of the form */
  isValid: boolean

  /** Object holding the dirty fields of the form */
  dirty: Record<string, boolean>

  /** Object holding the touched fields of the form */
  touched: Record<string, boolean>

  /** Object holding the fields with errors (one or multiple, check:validationErrors)*/
  errors: Record<string, string | undefined>
}

/** Field initializer */
export type InitControl = (name: string, options: RegisterOptions) => void

/** Sets dirty state of a control */
export type SetDirty = (name: string, dirty: boolean) => void

/** Sets touched state of a control */
export type SetTouched = (name: string, touched: boolean) => void

/** Function to set a value programmatically */
export type SetValue = (name: string, value: any) => Promise<void>

/** Function to trigger validations programmatically */
export type TriggerValidation = (name?: string) => Promise<void>

/** Control blur handler */
export type HandleBlur = (name: string) => void

/** Control change handler */
export type HandleChange = (name: string, value?: any) => Promise<void>

/** Function to set an error programmatically */
export type ClearField = (name: string) => Promise<void>

/** Function to reset a control programmatically*/
export type ResetField = (name: string) => void

/** Function to reset the whole form programmatically*/
export type ResetForm = () => void

/** Function to set an error programmatically */
export type SetError = (name: string, error: string) => void

/** Function to clear an error programmatically */
export type ClearError = (name?: string) => void

/** Function to get the modified values of the form */
export type ModifiedValues = () => Record<string, any>

/** Expected function to be called after a form submitted successfully */
export type HandleSubmitSuccessFn = (values: Record<string, any>) => void

/** Optional function to be called after a form failed to submit */
export type HandleSubmitErrorFn = (
  errors: Record<string, string | undefined>
) => void

/** Checks for the validity of the form before submitting */
export type IsValidForm = () => Promise<boolean>

/** Submit handler */
export type HandleSubmit = (
  successFn: HandleSubmitSuccessFn,
  errorFn?: HandleSubmitErrorFn
) => void

export interface InterceptorParams {
  /** Name of the field that is currently about to be set*/
  name: string

  /** Value of the field that is currently about to be set */
  value: any

  /** Current form values */
  values: Record<string, any>

  /** Current form state */
  formState: FormState

  /** Triggers the validation of a field */
  triggerValidation: TriggerValidation

  /** Function to reset a field */
  resetField: ResetField

  /** Function to reset the whole form */
  resetForm: ResetForm

  /** Function to set an error on a field programmatically */
  setError: SetError

  /** Function to set the value of a field programmatically */
  setValue: SetValue

  /** Function to clear one or more errors on a desired field or the whole form*/
  clearError: ClearError

  /** Function to clear a desired field*/
  clearField: ClearField

  /** Function that returns the modified values of the form */
  modifiedValues: ModifiedValues
}

export type Interceptor = (_: InterceptorParams) => Promise<boolean> | boolean

export type FormValidation = (
  values: Record<string, any>
) => Promise<boolean> | boolean

export interface FormHandlerParams {
  /** Values to initialize the form */
  initialValues?:
    | Record<string, any>
    | Ref<Record<string, any>>
    | ComputedRef<Record<string, any>>

  /** Field change interceptor */
  interceptor?: Interceptor

  /** Validation function to execute before submitting (when using this individual validations are invalidated) */
  validate?: FormValidation

  /** Validation behavior options */
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'always'
}
export interface FormHandlerReturn {
  /** Current form state */
  formState: FormState

  /** Current form values */
  values: Record<string, any>

  /** Function to clear one or more errors on a desired field or the whole form*/
  clearError: ClearError

  /** Function to clear a desired field*/
  clearField: ClearField

  /** Submit handler */
  handleSubmit: HandleSubmit

  /** Function that returns the modified values of the form */
  modifiedValues: ModifiedValues

  /** Method to register a field and make it interact with the current form */
  register: Register

  /** Function to reset a field */
  resetField: ResetField

  /** Function to reset the whole form */
  resetForm: ResetForm

  /** Function to set an error on a field programmatically */
  setError: SetError

  /** Function to set the value of a field programmatically */
  setValue: SetValue

  /** Triggers the validation of a field */
  triggerValidation: TriggerValidation

  /** Method to unregister a field and make it stop interacting with the current form */
  unregister: (name: string) => void
}

/** Form handler solution as a composable function */
export type UseFormHandler = (_?: FormHandlerParams) => FormHandlerReturn
