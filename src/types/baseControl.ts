/** Props for a base control */
export interface BaseControlProps {
    /** Name of the control */
    name: string,

    /** Current errors of the control */
    errors: string[]

    /** Value binding for native inputs */
    ref: any,

    /** Value binding for custom inputs */
    modelValue: any,

    /** Handler binding for custom inputs */
    'onUpdate:modelValue': (value: any) => void,

    /** Disabled state of the field*/
    disabled?: boolean

    /** Current dirty state of the control */
    isDirty?: boolean

    /** Current touched state of the control */
    isTouched?: boolean

    /** Handler binding for native inputs */
    onChange?: (el: any) => void,

    /** Blur handler */
    onBlur?: () => void,

    /** Clear handler */
    onClear?: () => void,
}

/** Each emit the handler could be expecting */
export type EmitOption = 'update:modelValue' | 'blur' | 'clear'
/** Emit collection for a base control */
export type BaseControlEmits = EmitOption[]