import { inject } from '@vue/runtime-core'
import { defaultInjectionKey } from './constants'
import { FormHandlerReturn, InjectionKey } from './types'

export const useFormContext = <T>(
  key: InjectionKey = defaultInjectionKey
) => inject<FormHandlerReturn<T>>(key)
