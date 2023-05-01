import { inject } from '@vue/runtime-core'
import { defaultInjectionKey } from './constants'
import { FormHandlerReturn, InjectionKey } from './types'

export const useFormContext = (
  key: InjectionKey = defaultInjectionKey
): FormHandlerReturn => inject(key) as FormHandlerReturn
