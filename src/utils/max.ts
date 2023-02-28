/**
 * @param max - The maximum value
 * @param message - The validation message
 * @returns A function that returns true if the value is less than the max or a string with the message if it's not
 * @example
 * const max = max(10, 'This field must be less than 10')
 *
 * max(5) // true
 * max(15) // 'This field must be less than 10'
 */
export default (max: number, message = `This field must be less than ${max}`) =>
  (value: any) => {
    if (value && value > max) {
      return message
    }
    return true
  }
