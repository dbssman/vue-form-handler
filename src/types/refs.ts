import { Validations } from './register'

export interface FieldReference {
  type:
    | 'custom'
    | 'select'
    | 'select-multiple'
    | 'radio'
    | 'checkbox'
    | 'input'
    | 'textarea'
    | 'file'
    | 'range'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  value?: any
  checked?: boolean
  selected?: boolean
  options?: any
  nodeName?: string
}

export interface WrappedReference {
  ref: FieldReference | FieldReference[]
  _validations: Validations
  _disabled: boolean
  _defaultValue: any
  _dependentFields?: string[]
}

export type Refs<T> = Record<keyof T, WrappedReference>
