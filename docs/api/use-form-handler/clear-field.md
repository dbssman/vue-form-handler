# clearField

Clears a field, this means that the field is set to it's default value or to the fallback value.
This will also trigger a validation for the field if existing.

## Demo

Coming soon...

## Usage

### Clear a field conditioned by another field

```vue
<template>
    <select v-bind="register('continent')" placeholder="Choose your country">
        <option disabled value=null>Choose your continent</option>
        <option value="AM">America</option>
        <option value="AS">Asia</option>
        <option value="EU">Europe</option>
    </select>
    <select v-bind="register('country')" placeholder="Choose your country">
        <option disabled value=null>Choose your country</option>
        <option value="CAN">Canada</option>
        <option value="USA">United States</option>
        <option value="JAP">Japan</option>
        <option value="CHN">China</option>
        <option value="ESP">Spain</option>
        <option value="DEU">Germany</option>
    </select>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const interceptor = ({ name, clearField }) => {
    if (name === 'continent') {
        clearField('country')
    }
    return true
}

const { register } = useFormHandler({
    interceptor
})
</script>
```

### Allowing the field to emit a 'clear' event or to have a button that clears a field

```vue
<template>
    <input type="text" v-bind="register('clearableField')">
    <button @click="clearField('clearableField')">X</button>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler'

const { register, clearField } = useFormHandler()
</script>
```

## Type Declarations

```ts
export type ClearField = (
    name: string
) => Promise<void>
```