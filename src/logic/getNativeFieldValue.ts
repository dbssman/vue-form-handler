import { DEFAULT_FIELD_VALUE } from '../core/constants';
import { isCheckboxInput, isMultipleSelect, isRadioInput } from "../utils"

export default (el: any) => {
    if (!el) {
        return DEFAULT_FIELD_VALUE
    }
    if (Array.isArray(el)) {
        if (isRadioInput(el[0])) {
            return el.find(({ checked, disabled }) => checked && !disabled)?.value || el[0].value
        }
        return el[0].value
    }
    if (isCheckboxInput(el)) {
        return el.checked
    }
    if (isMultipleSelect(el)) {
        const values = [...el.options]?.filter(({ selected }: any) => selected).map(({ value }: any) => value)
        return !values.length ? DEFAULT_FIELD_VALUE : values
    }
    return el.value || DEFAULT_FIELD_VALUE
}