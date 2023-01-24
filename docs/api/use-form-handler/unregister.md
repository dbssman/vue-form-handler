# unregister

Un-registers the field from the form, removing its value and influence over the form state.

## Demo

Coming soon...

## Usage

### In case of a dynamically added field

```vue
<template>
    <input type="text" v-bind="register('name')" />
    <input type="checkbox" v-bind="register('children')" />
    <input v-if="values.children" type="number" v-bind="register('childrenAmount')" />
</template>
<script setup lang="ts" >
import { watch } from 'vue'
import { useFormHandler } from 'vue-form-handler'

const { register, values, unregister } = useFormHandler()

watch(
    () => values.children,
    (curr) => {
        if(!curr){
            unregister('childrenAmount')
        }
    }
)
</script>
```
Easy way of handling a dynamic field by registering and un-registering it.

:::warning
The field value or state is not recovered after un-registering it. It starts every time again as a new field.
:::


## Type Declarations

```ts
export type Unregister = (
    name: string
) => void
```