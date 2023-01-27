import { BaseControlProps } from "./baseControl";
import { ValidationsConfiguration, NativeValidations } from "./validations";

/** Function returning true for correct validation or a string with an error if it's invalid */
export type ValidationFn = (_: any) => Promise<true | string> | true | string

/** Validations collection as an object */
export type Validations = Record<string, ValidationFn>


export interface RegisterOptions extends ValidationsConfiguration {
    /** Indicates wether the input is native or not, set to false if the extra listeners are not desired */
    native?: boolean

    /** Default value for the field */
    defaultValue?: any

    /** Custom validations for the field */
    validate?: Validations

    /** Set to true if you want to bind also dirty and touched states */
    withDetails?: boolean

    /** Set to true if the field should be disabled */
    disabled?: boolean

    /** Indicates if the control should use the native html validation */
    useNativeValidation?: boolean
}

export type RegisterReturn = BaseControlProps & NativeValidations

/** Function that allows you to register a control to interact with the form */
export type Register = (name: string, options?: RegisterOptions) => RegisterReturn

export type Unregister = (name: string) => void