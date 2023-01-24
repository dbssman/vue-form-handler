<template>
    <input type="text" v-bind="register('name')" />
    <input type="checkbox" v-bind="register('children')" />
    <input v-if="values.children" type="number" v-bind="register('childrenAmount')" />

    <pre>{{ values }}</pre>
    <pre>{{ formState }}</pre>
</template>
<script setup lang="ts" >
import { watch } from 'vue'
import { useFormHandler } from '../src'

const { register, values, unregister, formState } = useFormHandler()

watch(
    () => values.children,
    (curr) => {
        if (!curr) {
            unregister('childrenAmount')
        }
    }
)
</script>