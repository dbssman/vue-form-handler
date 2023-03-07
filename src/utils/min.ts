/**
 * @param min - The minimum value
 * @param message - The validation message
 * @returns A function that returns true if the value is greater than the min or a string with the message if it's not
 * @example
 * const min = min(10, 'This field must be at least 10')
 *
 * min(15) // true
 * min(5) // 'This field must be at least 10'
 */
export default (min: number, message = `This field must be at least ${min}`) =>
  (value: any) => {
    if (value && value < min) {
      return message
    }
    return true
  }
