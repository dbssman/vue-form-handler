import {
  ValidationsConfiguration,
  ValidationWithMessage,
  Validations,
} from '../types'
import { max, maxLength, min, minLength, pattern, required } from '../utils'

export default (validations: ValidationsConfiguration = {}): Validations => {
  return {
    ...(validations.required && {
      required:
        typeof validations.required === 'string'
          ? required(validations.required)
          : required(),
    }),
    ...(validations.min && {
      min:
        typeof validations.min === 'number'
          ? min(validations.min)
          : min(validations.min.value as number, validations.min.message),
    }),
    ...(validations.max && {
      max:
        typeof validations.max === 'number'
          ? max(validations.max)
          : max(validations.max.value as number, validations.max.message),
    }),
    ...(validations.minLength && {
      minLength:
        typeof validations.minLength === 'number'
          ? minLength(validations.minLength)
          : minLength(
              validations.minLength.value as number,
              validations.minLength.message
            ),
    }),
    ...(validations.maxLength && {
      maxLength:
        typeof validations.maxLength === 'number'
          ? maxLength(validations.maxLength)
          : maxLength(
              validations.maxLength.value as number,
              validations.maxLength.message
            ),
    }),
    ...(validations.pattern && {
      pattern: !(validations.pattern as ValidationWithMessage)?.value
        ? pattern(
            (typeof validations.pattern === 'string'
              ? new RegExp(validations.pattern)
              : validations.pattern) as RegExp
          )
        : pattern(
            (validations.pattern as ValidationWithMessage).value as RegExp,
            (validations.pattern as ValidationWithMessage).message as string
          ),
    }),
  }
}
