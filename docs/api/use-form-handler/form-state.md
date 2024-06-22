# formState

Provides you with the reactive state of the form, including validation, dirty and touched state, for the whole form or individual fields.

## Return

| attribute    | type                      | description                                                    |
| ------------ | ------------------------- | -------------------------------------------------------------- |
| dirty        | `Record<string, boolean>` | Object containing all the fields that have been modified       |
| errors       | `Record<string, string>`  | Object containing all the current field errors of the form     |
| touched      | `Record<string, boolean>` | Object containing all the fields the users has interacted with |
| validating   | `Record<string, boolean>` | Object containing all the fields undergoing validation         |
| isDirty      | `boolean`                 | True if there is any modified field on the form                |
| isTouched    | `boolean`                 | True if there has been any interaction with a form field       |
| isValid      | `boolean`                 | True if there are no form errors                               |
| isValidating | `boolean`                 | True if there are field validations in progress                |

## Rules

`formState` is read-only, so no assignments are expected. It is entirely reactive, so you can react on changes of the whole element and/or it's main attributes.

## Usage

```vue
<template>
  <form>
    <input
      type="text"
      v-bind="
        register('name', {
          required: true,
        })
      "
    />
    <p v-if="formState.errors.name">{{ formState.errors.name }}</p>
    <input
      type="text"
      v-bind="
        register('email', {
          required: true,
        })
      "
    />
    <p v-if="formState.errors.email">{{ formState.errors.email }}</p>
    <input type="text" v-bind="register('summary')" />
    <button type="submit">Submit</button>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, formState } = useFormHandler()
</script>
```

## Type Declarations

```ts
export interface FormState<T> {
  isDirty: boolean
  isTouched: boolean
  isValid: boolean
  isValidating: boolean
  dirty: Record<keyof T, boolean>
  touched: Record<keyof T, boolean>
  errors: Record<keyof T, string | undefined>
  validating: Record<keyof T, boolean>
}
```
