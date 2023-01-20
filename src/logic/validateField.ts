import { ValidateFieldParams } from './../types/logic';

export default async ({ name, values, formState, _refs }: ValidateFieldParams): Promise<void> => {
    if (!Object.keys(_refs[name]._validations).length) {
        return
    }
    if (_refs[name]._disabled) {
        return
    }
    for (const validation of Object.values(_refs[name]._validations)) {
        const result = await validation(values[name])
        if (result !== true) {
            formState.errors[name] = result
            break;
        }
        delete formState.errors[name]
    }
}