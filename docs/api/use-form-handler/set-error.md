# setError

Sets an error to a field programmatically, and consequently invalidate the form.

## Demo

Coming soon...

## Usage

### Invalidate the form on group validations

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
<script setup lang="ts">
import { useFormHandler, Interceptor } from 'vue-form-handler'

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

//validate your fields here
const validateFieldGroup = async () => {
  await sleep(1000)
  return Math.random() < 0.5
}

const interceptor: Interceptor = async ({ name, setError, clearError }) => {
  if (['name', 'email'].includes(name)) {
    ;(await validateUser())
      ? clearError(name)
      : setError('user', 'User already exists')
  }
  return true
}

const { register } = useFormHandler({ interceptor })
</script>
```

Notice how we use the combination of [clearError](/api/use-form-handler/clear-error) and `setError` in order to invalidate the form when we have some fields that need to be validated together and the error is not scoped to one single field but to the whole field group.

## Type Declarations

```ts
export type SetError = (
    name:string
    error:string
) => void
```
