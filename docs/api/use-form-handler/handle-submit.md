# handleSubmit

Submits the form on demand, causing it's validation depending on the mode/validation function, and calls the success/error fn consequently based on the outcome.

## Demo

Coming soon...

## Usage

### Submit a form and catch if errors/issues on submitting

```vue
<template>
  <form @submit.prevent="submitFn">
    <input
      type="text"
      v-bind="
        register('name', {
          required: true,
        })
      "
    />
    <input
      type="text"
      v-bind="
        register('email', {
          required: true,
        })
      "
    />
    <input type="text" v-bind="register('summary')" />
    <button type="submit">Submit</button>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, handleSubmit, formState } = useFormHandler()
const successFn = (form: any) => {
  //do anything with form
  console.log(form)
}
const submitFn = () => {
  try {
    handleSubmit(successFn)
  } catch {
    //do anything with errors
    console.log(formState.errors)
  }
}
</script>
```

### Submit a form and pass error function

```vue
<template>
  <form @submit.prevent="handleSubmit(successFn, errorFn)">
    <input
      type="text"
      v-bind="
        register('name', {
          required: true,
        })
      "
    />
    <input
      type="text"
      v-bind="
        register('email', {
          required: true,
        })
      "
    />
    <input type="text" v-bind="register('summary')" />
    <button type="submit">Submit</button>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, handleSubmit } = useFormHandler()
const successFn = (form: any) => {
  //do anything with form
  console.log(form)
}
const errorFn = (errors: any) => {
  //do anything with errors
  console.log(errors)
}
</script>
```

## Type Declarations

```ts
export type HandleSubmitErrorFn<T> = (errors: FormState<T>['errors']) => void

export type HandleSubmitSuccessFn<T> = (values: Record<keyof T, any>) => void

export type HandleSubmit<T> = (
  successFn: HandleSubmitSuccessFn<T>,
  errorFn?: HandleSubmitErrorFn<T>
) => void
```
