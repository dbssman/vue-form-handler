export interface ValidationWithMessage<T = any> {
  /** Validation value */
  value: T

  /** Validation message */
  message: string
}

export interface NativeValidations {
  /** Required validation */
  required?: boolean

  /** Min validation */
  min?: number

  /** Max validation */
  max?: number

  /** MinLength validation */
  minLength?: number

  /** MaxLength validation */
  maxLength?: number

  /** Pattern validation */
  pattern?: string
}

export interface ValidationsConfiguration {
  /** Required validation */
  /** If true, the field is required */
  /** If a string, the field is required and the string is the validation message */
  required?: boolean | string

  /** Min validation */
  /** If a number, the field must be greater than or equal to the number */
  /** If an object, the field must be greater than or equal to the object.value and the object.message is the validation message */
  min?: number | ValidationWithMessage<number>

  /** Max validation */
  /** If a number, the field must be less than or equal to the number */
  /** If an object, the field must be less than or equal to the object.value and the object.message is the validation message */
  max?: number | ValidationWithMessage<number>

  /** MinLength validation */
  /** If a number, the field must be greater than or equal to the number */
  /** If an object, the field must be greater than or equal to the object.value and the object.message is the validation message */
  minLength?: number | ValidationWithMessage<number>

  /** MaxLength validation */
  /** If a number, the field must be less than or equal to the number */
  /** If an object, the field must be less than or equal to the object.value and the object.message is the validation message */
  maxLength?: number | ValidationWithMessage<number>

  /** Pattern validation */
  /** If a RegExp, the field must match the RegExp */
  /** If an object, the field must match the object.value and the object.message is the validation message */
  pattern?: string | RegExp | ValidationWithMessage<string | RegExp>
}
