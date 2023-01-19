/**
 * @param min - Minimum length of the string
 * @param message - The validation message
 * @returns A function that returns true if the value is greater than the min or a string with the message if it's not
 * @example
 * const minLength = minLength(10, 'This field must be at least 10 characters')
 * 
 * minLength('1234567890') // true
 * minLength('123456789') // 'This field must be at least 10 characters'
 */
export default (min: number, message = `This field must be at least ${min} characters`) => (value: any) => {
    if (value && value.length < min) {
        return message
    }
    return true
}