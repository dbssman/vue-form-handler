export interface BaseModel {
    name: string,
    label?: string,
}

export interface FallthroughProps { 
    modelValue?: any,
    value?:any,
    'onUpdate:modelValue'?:(value:any)=>void,
    onInput?:(el:any)=>void,
    onBlur?:()=>void,
}

export type BaseProps = BaseModel & FallthroughProps

export type BaseEmitOptions = 'update:modelValue' | 'blur'

export type BaseEmits = BaseEmitOptions[]


export interface FormState {
    isDirty: boolean
    isTouched: boolean
    isValid: boolean
    touched: Record<string,boolean>
    dirty: Record<string,boolean>
    errors: Record<string,boolean>
}


export interface RegisterOptions {
    native?: boolean
}

export interface HandleSubmitOptions {
    full?: boolean
    diff?: boolean
}

//TODO: remove generics
export type KeyFn = (key:string) => void
export type KeyValueFn = (_:string, value:any) => void

export type ModifiedValues = () => Object
export type HandleSubmit = (successFn:(values: Object, diff?:Object) => void, options: HandleSubmitOptions)=>void
export type ResetForm = (initial: boolean) => void
export type Register = (name:string, options?: RegisterOptions) => BaseProps


export interface FormHandlerParams {
    initialValues?: {[key:string]: string}
    interceptor?:()=>boolean
    validate?:any
}

export interface FormHandlerReturn { 
    values: Object
    formState: FormState
    register: Register
    modifiedValues: ModifiedValues
    handleBlur: KeyFn
    setValue: KeyValueFn
    resetField: KeyValueFn
    resetForm: ResetForm
    handleChange: KeyValueFn
    handleSubmit: HandleSubmit
}
