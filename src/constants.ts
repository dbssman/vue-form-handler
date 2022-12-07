export const BaseInputProps = {
    label: { type: String, required: true },
    name: { type: String, required: true },
    onBlur: { type: Function, required: true },
    modelValue: { type: String, required: true },
    'onUpdate:modelValue': { type: Function, required: true },
  }
  export const BaseInputEmits = ['update:modelValue', 'blur']