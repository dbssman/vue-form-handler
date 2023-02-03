import { useFormHandler } from './useFormHandler';
import { FormHandlerParams, FormHandlerReturn } from './types/formHandler';
import { defineComponent, PropType } from '@vue/runtime-core';

export const FormHandler = defineComponent({
    name: 'FormHandler',
    props: {
        initialValues: Object as PropType<FormHandlerParams['initialValues']>,
        interceptor: Function as PropType<FormHandlerParams['interceptor']>,
        validate: Function as PropType<FormHandlerParams['validate']>,
        validationMode: Object as PropType<FormHandlerParams['validationMode']>
    },
    setup: (props, { slots }) => {
        const { ...formHandler } = useFormHandler({
            initialValues: props.initialValues,
            interceptor: props.interceptor,
            validate: props.validate,
            validationMode: props.validationMode
        })
        return () => slots.default && slots.default({ ...formHandler } as FormHandlerReturn)
    }
})