import { useFormHandler } from './useFormHandler';
import { FormHandlerParams } from './types';
import { SetupContext } from 'vue';

export default {
    name: 'FormHandler',
    props: {
        initialValues: Object,
        interceptor: Function,
        validate: Function
    },
    setup: (props:FormHandlerParams, {slots}: SetupContext) => {
        const { handleBlur, handleChange, ...formHandler } = useFormHandler({
            initialValues: props.initialValues,
            interceptor: props.interceptor,
            validate: props.validate,
        })
        return () => slots.default && slots.default({...formHandler})
    }
}