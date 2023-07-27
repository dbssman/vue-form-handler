
<template>
  <template v-if="error">
    <span>{{ error }}</span>
  </template>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'
import { DeepReadonly, computed } from '@vue/runtime-core'
import { FormState, InjectionKey } from './types'

const props = defineProps<{
  name:string;
  formState?: DeepReadonly<FormState<Record<string,any>>>;
  injectionKey?: InjectionKey;
}>();

const usableFormState = computed(() =>
  props.formState
    ? props.formState
    : useFormContext(props.injectionKey)?.formState
)

const error = computed(() => usableFormState.value?.errors[props.name])
</script>

<style scoped>

</style>
