/**
 * @description
 * Retries assertion until it passes or timeout is reached
 * @param assertion - jest assertion
 * @param interval - interval between retries
 * @param timeout - timeout after which assertion fails
 * @returns Promise that resolves when assertion passes
 * @
 * await retry(() => expect(values).toEqual(yourChangingValues));
 */
export default (
  assertion: () => void,
  { interval = 20, timeout = 1000 } = {}
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const tryAgain = () => {
      setTimeout(() => {
        try {
          resolve(assertion())
        } catch (err) {
          Date.now() - startTime > timeout ? reject(err) : tryAgain()
        }
      }, interval)
    }

    tryAgain()
  })
}
