import { ValidateFormParams } from './../types/logic'
import validateField from './validateField'

export default async (params: ValidateFormParams) => {
  for (const name of Object.keys(params.values)) {
    await validateField({ ...params, name })
  }
}
