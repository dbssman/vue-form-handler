import { inject } from '@vue/runtime-core'
import { defaultInjectionKey } from './constants'
import { FormHandlerReturn, InjectionKey } from './types'

export const useFormContext = <
  T extends Record<string, any> = Record<string, any>,
>(
  key: InjectionKey = defaultInjectionKey
) => inject<FormHandlerReturn<T>>(key) as FormHandlerReturn<T>
