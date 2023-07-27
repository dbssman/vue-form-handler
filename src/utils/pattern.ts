import isNil from "./isNil"

/**
 * @param pattern - RegExp pattern
 * @param message - The validation message
 * @returns A function that returns true if the value matches the pattern or a string with the message if it doesn't
 * @example
 * const pattern = pattern(/^[a-z]+$/, 'This field is invalid')
 *
 * pattern('abc') // true
 * pattern('123') // 'This field is invalid'
 */
export default (pattern: RegExp, message = 'This field is invalid') =>
  (value: any) => {
    if (!isNil(value) && !pattern.test(value)) {
      return message
    }
    return true
  }
