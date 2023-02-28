/**
 * @param {string} message
 * @returns {function} A function that returns true if the value is not undefined, null or an empty string or a string with the message if it is
 * @example
 * const required = required('This field is required')
 *
 * required('abc') // true
 * required('') // 'This field is required'
 */
export default (message = 'This field is required') =>
  (value: any) => {
    if (value === undefined || value === null || value === '') {
      return message
    }
    return true
  }
