/** Props for a base control */
export interface BaseControlProps<
  T extends Record<string, any> = Record<string, any>,
> {
  /** Name of the control */
  name: keyof T

  /** Value binding for native inputs */
  ref: (fieldRef: any) => void

  /** Value binding for custom inputs */
  modelValue: any

  /** Handler binding for custom inputs */
  'onUpdate:modelValue': (value: any) => Promise<void>

  /** Clear handler */
  onClear: () => void

  /** Blur handler */
  onBlur: () => void

  /** Disabled state of the field*/
  disabled?: boolean

  /** Current dirty state of the control */
  isDirty?: boolean

  /** Current touched state of the control */
  isTouched?: boolean

  /** Current validating state of the control */
  isValidating?: boolean

  /** Handler binding for native inputs */
  onChange?: (el: any) => Promise<void>
}

/** Each emit the handler could be expecting */
export type EmitOption = 'update:modelValue' | 'blur' | 'clear'
/** Emit collection for a base control */
export type BaseControlEmits = EmitOption[]
