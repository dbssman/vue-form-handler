import { ValidationsConfiguration, ValidationWithMessage, Validations } from "../types";
import { max, maxLength, min, minLength, pattern, required } from "../utils";

export default (validations: ValidationsConfiguration = {}): Validations => {
    const transformed: Validations = {};
    if (!!validations.required) {
        transformed.required = typeof validations.required === 'string'
            ? required(validations.required)
            : required();
    }
    if (validations.min) {
        transformed.min = typeof validations.min === 'number'
            ? min(validations.min)
            : min(validations.min.value as number, validations.min.message);
    }
    if (validations.max) {
        transformed.max = typeof validations.max === 'number'
            ? max(validations.max)
            : max(validations.max.value as number, validations.max.message);
    }
    if (validations.minLength) {
        transformed.minLength = typeof validations.minLength === 'number'
            ? minLength(validations.minLength)
            : minLength(validations.minLength.value as number, validations.minLength.message);
    }
    if (validations.maxLength) {
        transformed.maxLength = typeof validations.maxLength === 'number'
            ? maxLength(validations.maxLength)
            : maxLength(validations.maxLength.value as number, validations.maxLength.message);
    }
    if (validations.pattern) {
        transformed.pattern = !(validations.pattern as ValidationWithMessage)?.value
            ? pattern(validations.pattern as RegExp)
            : pattern((validations.pattern as ValidationWithMessage).value as RegExp, (validations.pattern as ValidationWithMessage).message as string);
    }
    return transformed;
}

