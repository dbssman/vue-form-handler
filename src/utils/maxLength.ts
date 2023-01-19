/**
 * @param {number} max - Maximum length of the string
 * @param {string} message - The validation message
 * @returns {function} A function that returns true if the value is less than the max or a string with the message if it's not
 * @example
 * const maxLength = maxLength(10, 'This field must be less than 10 characters')
 * 
 * maxLength('123456789') // true
 * maxLength('12345678901') // 'This field must be less than 10 characters'
 */
export default (max: number, message = `This field must be less than ${max} characters`) => (value: any) => {
    if (value && value.length > max) {
        return message
    }
    return true
}
