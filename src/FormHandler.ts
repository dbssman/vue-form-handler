import useFormHandler from './useFormHandler';
import { FormHandlerParams } from './types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'FormHandler',
    props: {
        initialValues: Object as PropType<FormHandlerParams['initialValues']>,
        interceptor: Function as PropType<FormHandlerParams['interceptor']>,
        validate: Function as PropType<FormHandlerParams['validate']>,
        options: Object as PropType<FormHandlerParams['options']>
    },
    setup: (props, {slots}) => {
        const {register, ...formHandler} = useFormHandler({
            initialValues: props.initialValues,
            interceptor: props.interceptor,
            validate: props.validate,
            options: props.options
        })
        return () => slots.default && slots.default({register,...formHandler})
    }
})