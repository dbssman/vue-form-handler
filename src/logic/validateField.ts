import { ValidateFieldParams } from './../types/logic';

export default async ({ name, values, formState, _refs }: ValidateFieldParams): Promise<void> => {
    if (!Object.keys(_refs[name]._validations).length) {
        return
    }
    if (_refs[name]._disabled) {
        return
    }
    for (const [validationName, validation] of Object.entries(_refs[name]._validations)) {
        const result = await validation(values[name])
        formState.errors[name] = {
            ...(result !== true && { [validationName]: result })
        }
        if (result !== true) {
            break;
        }
        delete formState.errors[name]
    }
}