export interface BaseProps { 
    /** Name of the field */
    name: string,

    /** Current errors of the field */
    errors?:string[]

    /** Current dirty state of the field */
    isDirty?:boolean

    /** Current touched state of the field */
    isTouched?:boolean
    
    /** Value binding for native inputs */
    value?:any,

    /** Handler binding for native inputs */
    onInput?:(el:any)=>void,

    /** Value binding for custom inputs */        
    modelValue?: any,

    /** Handler binding for custom inputs */
    'onUpdate:modelValue'?:(value:any)=>void,

    /** Blur handler */
    onBlur?:()=>void,

    /** Clear handler */
    onClear?:()=>void,
}

export type BaseEmitOptions = 'update:modelValue' | 'blur' | 'clear'
export type BaseEmits = BaseEmitOptions[]

export interface FormState {
    /** Boolean holding the dirty state of the form */
    isDirty: boolean

    /** Boolean holding the touched state of the form */
    isTouched: boolean

    /** Boolean holding the valid state of the form */
    isValid: boolean

    /** Object holding the dirty fields of the form */
    dirty: Record<string,boolean>

    /** Object holding the touched fields of the form */
    touched: Record<string,boolean>

    /** Object holding the fields with errors (one or multiple, check:validationErrors)*/
    errors: Record<string,any>
}

export type ValidationFn = (_:any)=>boolean|string
export type Validations = Record<string,ValidationFn>
export interface RegisterOptions {
    /** Indicates wether the input is native or not, set to false if the extra listeners are not desired */
    native?: boolean

    /** Indicates wether the input is clearable or not */
    clearable?:boolean

    /** Default value for the field */
    defaultValue?: any

    /** Validations for the field */
    validations?: Validations

    /** Set to true if you want to bind also dirty and touched states */
    withDetails?: boolean
}
export type Register = (name:string, options?: RegisterOptions) => BaseProps

export type ResetField = (key:string, initial?:boolean) => void
export type ResetForm = (initial:boolean) => void
export type SetError = (key:string, error:any, replace?:boolean) => void
export type ClearErrors = (key?:string, errors?:string|string[]) => void
export type InitFieldState = (name:string, options:RegisterOptions) => void

export type TriggerValidation = (key:string) => void

export interface HandleSubmitOptions {
    /** Set to true if just the dirty(modified) fields are desired to be emitted */
    diff?: boolean
}

//TODO: remove generics
export type KeyFn = (key:string) => void
export type KeyValueFn = (_:string, value:any) => void

export type ModifiedValues = () => Object
export type HandleSubmitSuccessFn = (values: Object) => void
export type HandleSubmitErrorFn = (errors:Object) => void
export type HandleSubmit = (successFn:HandleSubmitSuccessFn, errorFn?:HandleSubmitErrorFn, options?: HandleSubmitOptions)=>void

export interface FormHandlerOptions{
    /** Set to submit if validations are desired before sending the form */
    validationBehaviour?: 'always' | 'submit'

    /** Set to all if we want to track all the validation errors a field could have */
    validationErrors?: 'first' | 'all'
}
export interface FormHandlerParams {
    /** Values to initialize the form */
    initialValues?: {[key:string]: string}

    /** Field change interceptor */
    interceptor?:(...args:any[])=>boolean

    /** Validation function to execute before submitting (when using this individual validations are invalidated) */
    validate?:()=>boolean

    /** Options for the form handler */
    options?:FormHandlerOptions
}

export interface FormHandlerReturn { 
    /** Current form values */
    values: Record<string,any>

    /** Current form state */
    formState: FormState

    /** Method to register a field and make it interact with the current form */
    register: Register

    /** Function that returns the modified values of the form */
    modifiedValues: ModifiedValues

    /** Function to set the value of a field programmatically */
    setValue: KeyValueFn

    /** Function to set an error on a field programmatically */
    setError: SetError

    /** Function to clear one or more errors on a desired field or the whole form*/
    clearErrors:ClearErrors

    /** Function to reset a field */
    resetField: ResetField

    /** Function to reset the whole form */
    resetForm: ResetForm

    /** Submit handler */
    handleSubmit: HandleSubmit

    /** Triggers the validation of a field */
    triggerValidation:TriggerValidation
}

export type FormHandler = (_?:FormHandlerParams)=>FormHandlerReturn
