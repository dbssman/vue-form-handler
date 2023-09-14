import {
  ValidationsConfiguration,
  ValidationWithMessage,
  Validations,
} from '../types'
import { max, maxLength, min, minLength, pattern, required } from '../utils'

const isValidationWithMessage = (
  validation: any
): validation is ValidationWithMessage => {
  return (
    typeof validation === 'object' &&
    validation !== null &&
    'value' in validation &&
    'message' in validation
  )
}

const getValidationForConfiguration = (validation: any, fn: Function) =>
  isValidationWithMessage(validation)
    ? fn(validation.value, validation.message)
    : fn(validation)

export default (validations: ValidationsConfiguration = {}): Validations => {
  return {
    ...(validations.required && {
      required:
        typeof validations.required === 'string'
          ? required(validations.required)
          : required(),
    }),
    ...(validations.min && {
      min: getValidationForConfiguration(validations.min, min),
    }),
    ...(validations.max && {
      max: getValidationForConfiguration(validations.max, max),
    }),
    ...(validations.minLength && {
      minLength: getValidationForConfiguration(
        validations.minLength,
        minLength
      ),
    }),
    ...(validations.maxLength && {
      maxLength: getValidationForConfiguration(
        validations.maxLength,
        maxLength
      ),
    }),
    ...(validations.pattern && {
      pattern: getValidationForConfiguration(validations.pattern, pattern),
    }),
  }
}
