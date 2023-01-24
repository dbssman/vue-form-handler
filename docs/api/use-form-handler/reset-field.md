# resetField

Resets a field, this means that the field is set back to it's initial value or to the default/fallback value if no `initialValue` was present.
This will not trigger a validation for the field but actually will clear the errors since it goes back to the 'initial' state.
This does also **not** trigger the **interceptor**.

## Demo

Coming soon...

## Usage

### Reset a field on demand

Choose any option of the select and then reset the field
```vue
<template>
    <select v-bind="register('continent')" placeholder="Choose your country">
        <option value="AM">America</option>
        <option value="AS">Asia</option>
        <option value="EU">Europe</option>
    </select>
    <button @click="() => resetField('continent')">Reset a field on demand</button>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'
const { register, resetField } = useFormHandler({
    initialValues: {
        continent: 'AM'
    }
})
</script>
```

## Type Declarations

```ts
export type ResetField = (
    name: string
) => void
```