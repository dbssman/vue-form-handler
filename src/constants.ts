import { BaseControlEmits } from './types'

export const DEFAULT_FIELD_VALUE = null

export const BaseInputProps = {
  name: { type: String, required: true },
  isDirty: { type: Boolean, default: () => false },
  isTouched: { type: Boolean, default: () => false },
  disabled: { type: Boolean, default: () => false },
  error: { type: String, default: () => '' },
  onBlur: { type: Function, required: true },
  onClear: { type: Function, default: () => null },
  modelValue: {
    type: [String, Object, Array, Number, Boolean, null],
    required: true,
  },
  'onUpdate:modelValue': { type: Function, required: true },
}

export const BaseInputEmits: BaseControlEmits = [
  'update:modelValue',
  'blur',
  'clear',
]

export const defaultInjectionKey = Symbol('formHandler')
