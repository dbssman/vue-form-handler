import { FormState } from "./formHandler"
import { Refs } from "./refs"

export interface ValidateFormParams {
    _refs: Refs
    formState: FormState
    values: Record<string, any>
}

export interface ValidateFieldParams extends ValidateFormParams {
    name: string
}

export interface TriggerValidationParams extends ValidateFieldParams { }