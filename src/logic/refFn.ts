import { RefFnParams } from '../types/logic';
import { isRadioInput, isCheckboxInput, isMultipleSelect, isDefined, isNativeControl } from "../utils"

export default ({ refs, name, values }: RefFnParams) => (fieldRef: any) => {
    if (!fieldRef || !fieldRef.nodeName || !isNativeControl(fieldRef)) {
        refs = {
            ...refs,
            [name]: {
                type: 'custom'
            }
        }
        return
    }
    if (!refs[name] || (isRadioInput(fieldRef) && !refs[name].some((option: any) => option.value === fieldRef.value))) {
        refs = {
            ...refs,
            [name]: isRadioInput(fieldRef) ? [...(refs[name] || []), fieldRef] : fieldRef
        }
    }
    if (isRadioInput(fieldRef)) {
        if (fieldRef.checked) {
            values[name] = fieldRef.value
            return
        }
        fieldRef.checked = (values[name] === fieldRef.value)
        return
    }
    if (isCheckboxInput(fieldRef)) {
        if (isDefined(fieldRef.checked)) {
            values[name] = !!fieldRef.checked
            return
        }
        fieldRef.checked = !!values[name]
        return
    }
    if (isMultipleSelect(fieldRef)) {
        [...fieldRef.options].forEach((option: any, index) => {
            fieldRef[index].selected = !!values[name]?.includes(option.value)
        })
        return
    }
    fieldRef.value = values[name]
}