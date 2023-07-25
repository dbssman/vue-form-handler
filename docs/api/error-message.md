# \<ErrorMessage/>

The `ErrorMessage` component is an utility Intended to be used right away, or wrapped for your customisation needs.

Make sure you use `ErrorMessage` along with at least one of this situations:

- With an existing handler instance in the current/previous levels of the component tree.
- With a known formState

Depending on your situation you might want to use the component in one of these two ways.

## Explicit formState

```vue
<template @submit.prevent="handleSubmit(successFn)">
  <form>
    <form @submit.prevent="handleSubmit(successFn)">
      <input v-bind="register('firstName', { required: true })" />
      <ErrorMessage name="firstName" :form-state="formState">
    </form>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { handleSubmit, register, formState } = useFormHandler();

const successFn = (form: Record<string, any>) => {
  console.log({ form })
}
</script>
```

## Injected formState

```vue
<template @submit.prevent="handleSubmit(successFn)">
  <form>
    <form @submit.prevent="handleSubmit(successFn)">
      <input v-bind="register('firstName', { required: true })" />
      <ErrorMessage name="firstName">
    </form>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { handleSubmit, register } = useFormHandler();

const successFn = (form: Record<string, any>) => {
  console.log({ form })
}
</script>
```

:::warning
Since for this approach, the component uses `useFormContext` internally, remember to pass the custom injectionKey in case you might be using some for your handler. i.e:

```vue
<template @submit.prevent="handleSubmit(successFn)">
  <form>
    <form @submit.prevent="handleSubmit(successFn)">
      <input v-bind="register('firstName', { required: true })" />
      <ErrorMessage name="firstName" :injection-key="injectionKey">
    </form>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const injectionKey = Symbol('test')

const { handleSubmit, register } = useFormHandler({
    injectionKey
});

const successFn = (form: Record<string, any>) => {
  console.log({ form })
}
</script>
```

:::
