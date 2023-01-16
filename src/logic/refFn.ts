import { isCheckboxInput, isMultipleSelect, isNativeControl, isRadioInput } from "../utils"

export default (name: string, _refs: any, values: any) => (fieldRef: any) => {
    if (!fieldRef) {
        delete _refs[name]
        return
    }
    if (!fieldRef.nodeName || !isNativeControl(fieldRef)) {
        //TODO: Correctly type this in order to expect a fixed data structure
        _refs[name] = {
            type: 'custom'
        }
        return
    }
    const isFirstRegister = !_refs[name] || (Array.isArray(_refs[name]) && isRadioInput(fieldRef) && !_refs[name].some((option: any) => option.value === fieldRef.value))
    if (isFirstRegister) {
        _refs[name] = isRadioInput(fieldRef) ? [...(_refs[name] || []), fieldRef] : fieldRef
    }
    if (isRadioInput(fieldRef)) {
        if (isFirstRegister && fieldRef.checked) {
            values[name] = fieldRef.value
            return
        }
        fieldRef.checked = (values[name] === fieldRef.value)
        return
    }
    if (isCheckboxInput(fieldRef)) {
        if (isFirstRegister) {
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
};