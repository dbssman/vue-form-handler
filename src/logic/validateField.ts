import { FormState } from "../types"

export interface ValidateField<T>{
  name: keyof T
  values: T
  formState: FormState<T>
  _refs: any
} 

//TODO: review this
export default async <T>({
  name,
  values,
  formState,
  _refs,
}:ValidateField<T>): Promise<void> => {
  if (!Object.keys(_refs[name]?._validations ?? {}).length) {
    return
  }
  if (_refs[name]._disabled) {
    return
  }
  for (const validation of Object.values(_refs[name]._validations)) {
    const result = await (validation as any)(values[name])
    if (result !== true) {
      formState.errors[name] = result
      break
    }
    delete formState.errors[name]
  }
}
