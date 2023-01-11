/** Props for a base control */
export interface BaseControlProps {
    /** Name of the control */
    name: string,

    /** Current errors of the control */
    errors?: string[]

    /** Current dirty state of the control */
    isDirty?: boolean

    /** Current touched state of the control */
    isTouched?: boolean

    /** Value binding for native inputs */
    ref: any,

    /** Handler binding for native inputs */
    onChange?: (el: any) => void,

    /** Value binding for custom inputs */
    modelValue: any,

    /** Handler binding for custom inputs */
    'onUpdate:modelValue': (value: any) => void,

    /** Blur handler */
    onBlur?: () => void,

    /** Clear handler */
    onClear?: () => void,
}

/** Each emit the handler could be expecting */
export type EmitOption = 'update:modelValue' | 'blur' | 'clear'
/** Emit collection for a base control */
export type BaseControlEmits = EmitOption[]

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
    errors: Record<string, any>
}

/** Function returning true for correct validation or a string with an error if it's invalid */
export type ValidationFn = (_: any) => Promise<boolean | string> | boolean | string

/** Validations collection as an object */
export type Validations = Record<string, ValidationFn>

export interface RegisterOptions {
    /** Indicates wether the input is native or not, set to false if the extra listeners are not desired */
    native?: boolean

    /** Indicates wether the input is clearable or not */
    clearable?: boolean

    /** Default value for the field */
    defaultValue?: any

    /** Required indicator for the control */
    required?: boolean

    /** Validations for the field */
    validations?: Validations

    /** Set to true if you want to bind also dirty and touched states */
    withDetails?: boolean
}

/** Field initializer */
export type InitControl = (name: string, options: RegisterOptions) => void

/** Function that allows you to register a control to interact with the form */
export type Register = (name: string, options?: RegisterOptions) => BaseControlProps

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
export type SetError = (name: string, error: any, replace?: boolean) => void

/** Function to clear an error programmatically */
export type ClearErrors = (name?: string, errors?: string | string[]) => void

/** Function to get the modified values of the form */
export type ModifiedValues = () => Object

/** Expected function to be called after a form submitted successfully */
export type HandleSubmitSuccessFn = (values: Object) => void

/** Optional function to be called after a form failed to submit */
export type HandleSubmitErrorFn = (errors: Object) => void

/** Checks for the validity of the form before submitting */
export type IsValidForm = () => Promise<boolean>

/** Submit handler */
export type HandleSubmit = (successFn: HandleSubmitSuccessFn, errorFn?: HandleSubmitErrorFn) => void

export interface InterceptorParams {
    /** Name of the field that is currently about to be set*/
    name: string,

    /** Value of the field that is currently about to be set */
    value: any,

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

    /** Function to clear one or more errors on a desired field or the whole form*/
    clearErrors: ClearErrors

    /** Function that returns the modified values of the form */
    modifiedValues: ModifiedValues
}
export interface FormHandlerParams {
    /** Values to initialize the form */
    initialValues?: Record<string, any>

    /** Field change interceptor */
    interceptor?: (_: InterceptorParams) => Promise<boolean>

    /** Validation function to execute before submitting (when using this individual validations are invalidated) */
    validate?: () => Promise<boolean> | boolean

    /** Validation behavior options */
    validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'always'
}

export interface FormHandlerReturn {
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

    /** Function to clear one or more errors on a desired field or the whole form*/
    clearErrors: ClearErrors

    /** Function that returns the modified values of the form */
    modifiedValues: ModifiedValues

    /** Function to set the value of a field programmatically */
    setValue: SetValue

    /** Function to clear a desired field*/
    clearField: ClearField

    /** Method to register a field and make it interact with the current form */
    register: Register

    /** Submit handler */
    handleSubmit: HandleSubmit
}

/** Form handler solution as a composable function */
export type FormHandler = (_?: FormHandlerParams) => FormHandlerReturn
