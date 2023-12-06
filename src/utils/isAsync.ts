/**
 * Check if a function is async
 * @param fn - Function to check if it is async
 * @returns - True if the function is async, false otherwise
 */
export default function isAsync(fn: Function) {
  return fn.constructor.name === 'AsyncFunction'
}
