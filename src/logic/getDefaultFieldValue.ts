import { isCheckboxInput } from "../utils"
import { DEFAULT_FIELD_VALUE } from "../core/constants"

export default (el: any) => {
    if (!el) {
        return DEFAULT_FIELD_VALUE
    }
    if (isCheckboxInput(el)) {
        return false
    }
    return DEFAULT_FIELD_VALUE
}