import validateField, { ValidateField } from './validateField'

//TODO: review this
export default async <T extends Record<string,any>>(params: Omit<ValidateField<T>,'name'>) => {
  for (const name of Object.keys(params.values)) {
    await validateField({ ...params, name })
  }
}
