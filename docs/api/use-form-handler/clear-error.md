# clearError: <font size="3">ClearError</font>

Clears all the errors from the form or the error from a field programmatically.

## Demo

Coming soon...
## Usage

### Validating/Invalidating the form without a field scoped validation

```vue
<template>
    <form>
        <input type="text" v-bind="register('name')" />
        <input type="text" v-bind="register('email')" />
        <input type="text" v-bind="register('password')" />
        <input type="text" v-bind="register('password_confirmation')" />
        <button type="submit">Submit</button>
    </form>
</template>
<script setup lang="ts" >
import { useFormHandler, Interceptor } from '../src/index'

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//validate your fields here
const validateFieldGroup = async () => {
    await sleep(1000)
    return Math.random() < 0.5;
}

const interceptor: Interceptor = async ({ name, setError, clearError }) => {
    if (['name', 'email'].includes(name)) {
        await validateUser()
            ? clearError(name)
            : setError('user', 'User already exists')
    }
    return true
}

const { register } = useFormHandler({ interceptor })
</script>
```

Notice how we use the combination of [setError](/api/use-form-handler/set-error) and `clearError` in order to invalidate the form when we have some fields that need to be validated together and the error is not scoped to one single field but to the whole field group.

### Clearing the errors of a form after triggering validation/ submitting on demand

```vue
<template>
    <form @submit.prevent="handleSubmit(successFn, errorFn)">
        <input type="text" v-bind="register('name', {
            required: true
        })" />
        <p v-if="formState.errors.name"> {{ formState.errors.name }} </p>
        <input type="text" v-bind="register('email', {
            required: true
        })" />
        <p v-if="formState.errors.email"> {{ formState.errors.email }} </p>
        <input type="text" v-bind="register('summary')">
        <button type="submit">Submit</button>
    </form>
</template>
<script setup lang="ts" >
import { useFormHandler } from '../src/index'
import { watch } from 'vue'

let hasErrorsAfterSubmit = false;
const successFn = (form: any) => { console.log({ form }) }
const errorFn = () => { hasErrorsAfterSubmit = true }


const { register, handleSubmit, values, clearError, formState } = useFormHandler()

watch(
    () => values,
    () => {
        if (hasErrorsAfterSubmit) {
            clearError();
            hasErrorsAfterSubmit = false
        }
    },
    { deep: true })
</script>
```

## Type Declarations

```ts
export type ClearError = (
    name?: string
) => void
```