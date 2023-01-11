import { ValidateFieldParams } from './../types/logic';

export default async ({ name, validations, values, formState }: ValidateFieldParams): Promise<void> => {
    if (!Object.keys(validations[name]).length) {
        return
    }
    for (const [validationName, validation] of Object.entries(validations[name])) {
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