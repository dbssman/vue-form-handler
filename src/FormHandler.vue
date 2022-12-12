<template>
    <slot v-bind="{ ...formHandler }"></slot>
</template>

<script lang="ts">
export default {
    name: 'FormHandler'
}
</script>
<script setup lang="ts">
import { PropType } from 'vue';
import { FormHandlerParams } from './types';
import { useFormHandler } from './useFormHandler';

const props: FormHandlerParams = defineProps({
    initialValues: Object as PropType<FormHandlerParams['initialValues']>,
    interceptor: Function as PropType<FormHandlerParams['interceptor']>,
    validate: Function as PropType<FormHandlerParams['validate']>
})
const formHandler = useFormHandler({
    initialValues: props.initialValues,
    interceptor: props.interceptor,
    validate: props.validate,
})
</script>