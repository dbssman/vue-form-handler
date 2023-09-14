# modifiedValues

Computed property that holds the current modified values of the form e.g values that are different from initial value if any initial value was indicated or different than the default value for the field if no initial values were given.

## Demo

Coming soon...

## Usage

```vue
<template>
  <form>
    <input type="text" v-bind="register('name')" />
    <input type="text" v-bind="register('email')" />
    <input type="text" v-bind="register('summary')" />
    <pre>
            {{ modifiedValues }} //should initially be an empty object
        </pre
    >
    <pre>
            {{ values }} //should be filled with the initial values
        </pre
    >
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, values, modifiedValues } = useFormHandler({
  initialValues: {
    name: 'My name',
    email: 'myemail@mail.com',
  },
})
</script>
```

Let's say your form is initialized as above, because you're editing an existing item, and you just want to be aware of the data that changed to perform a `PATCH` operation, then `modifiedValues` is your best friend.

## Type Declarations

```ts
type ModifiedValues = ComputedRef<Partial<T>>// T being the form interface

```
