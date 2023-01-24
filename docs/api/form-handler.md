# \<FormHandler/>

The `FormHandler` component is an utility for people that are still using the options API or, that for some reason want to do the handling on the template side. 

::: tip
It is highly recommend that you use the `useFormHandler` composable if possible, since it is the intended way of making use of this package and gives you more control over the form.
:::
## How it works

You pass the same props as you'd be passing to the composable but to a component on the template, and the component will enable you a [scoped slot](https://vuejs.org/guide/components/slots.html#scoped-slots) with the return of `useFormHandler`.

As you can imagine, the `FormHandler` composable and `useFormHandler` share the same API but differ in the usage.

## Example: 

```vue
<template @submit.prevent="handleSubmit(successFn)">
    <FormHandler>
        <template v-slot="{register, handleSubmit}">
            <form @submit.prevent="handleSubmit(successFn)">
                <input v-bind="register('firstName')">
                <input v-bind="register('lastName')">
            </form>
        </template>
    </FormHandler>
</template>
<script setup lang="ts">
    import { FormHandler } from 'vue-form-handler'
    
    const successFn = (form:Record<string,any>) => {
        console.log({form})
    }
</script>
```
