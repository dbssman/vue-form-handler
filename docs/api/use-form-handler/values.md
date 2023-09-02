# values

Provides you with the reactive state of the form, including validation, dirty and touched state, for the whole form or individual fields.

## Return

| attribute         | type  | description                          |
| ----------------- | ----- | ------------------------------------ |
| &lt;fieldName&gt; | `any` | Current value of the specified field |

## Rules

`values` is read-only, so no assignments are expected. It is entirely reactive, so you can react on changes of the whole element and/or it's main attributes.

## Usage

```vue
<template>
  <form>
    <input type="text" v-bind="register('name')" />
    <input type="text" v-bind="register('email')" />
    <input type="text" v-bind="register('summary')" />
  </form>
  <section>
    <h2>Preview:</h2>
    <div>
      <h3>Name: {{ values.name }}</h3>
      <h4>Email: {{ values.email }}</h4>
      <p>Summary: {{ values.summary }}</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, values } = useFormHandler()
</script>
```

## Type Declarations

```ts
export type Values = Partial<T>
```
