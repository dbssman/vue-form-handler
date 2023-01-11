import { FormState, Validations } from "./formHandler"

export interface ValidateFormParams {
    validations: Record<string, Validations>
    formState: FormState
    values: Record<string, any>
}

export interface ValidateFieldParams extends ValidateFormParams {
    name: string
}

export interface TriggerValidationParams extends ValidateFieldParams { }