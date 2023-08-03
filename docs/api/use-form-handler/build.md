# build

Builds a form based on the configuration passed, to leave a cleaner template and provide better readability over the whole form setup.

## Demo

Coming soon...

## Usage

### Build complex form fields and improve readability

```vue
<template>
  <form @submit.prevent="() => handleSubmit(successFn, errorFn)">
    <input type="text" v-bind="form.name" />
    <input type="text" v-bind="form.email" />
    <input type="text" v-bind="form.password" />
    <input type="text" v-bind="form.passwordConfirmation" />
    <button type="submit">Submit</button>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const successFn = (result: Record<string, any>) => {
  console.log(result)
}
const errorFn = (result: Record<string, string | undefined>) => {
  console.warn(result)
}
const { build, handleSubmit, values, formState } = useFormHandler()

const form = build({
  name: {
    required: true,
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Only letters are allowed',
    },
  },
  email: {
    required: true,
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Please enter a valid email',
    },
  },
  password: {
    required: true,
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
    },
  },
  passwordConfirmation: {
    required: true,
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
    },
    validate: {
      match: (value: string) =>
        value === values.password || 'Passwords do not match',
    },
  },
})
</script>
```

Notice how the template looks much cleaner with this approach, and this helps us to achieve better readability and is less confusing since we bind directly pieces of a form to each component/field on the template.

## Type Declarations

```ts
export type Build<T> = <TBuild extends Record<keyof T, RegisterOptions>>(
  configuration: TBuild | Ref<TBuild> | ComputedRef<TBuild>
) => ComputedRef<Record<keyof TBuild, Readonly<RegisterReturn>>>
```
