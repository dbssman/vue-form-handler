<template>
  <slot v-if="$slots['default']" v-bind="useFormHandler($props)"></slot>
</template>

<script setup lang="ts">
import { FormHandlerParams } from './types'
import { useFormHandler } from './useFormHandler'

defineProps<FormHandlerParams>()
</script>
