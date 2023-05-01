# useFormContext

`useFormContext` is a composable to access all the exposed functionalities of `useFormHandler` in any descendant of the handlers subtree is used. By this we avoid drilling the things we need down.

## How it works

`useFormContext` makes use of the [Vue 3 Provide/Inject](https://vuejs.org/guide/components/provide-inject.html) feature to directly provide the exposed features of `useFormHandler` to all the subtree.

As you can imagine, `useFormContext` and `useFormHandler` share the same return, nevertheless, the ancestor who consumes useFormHandler will rule things like `initialValues`, `validationMode`....

## Example:

```vue
<!-- Parent.vue component -->
<template>
  <form @submit.prevent="handleSubmit(successFn)">
    <input v-bind="register('firstName')" />
    <input v-bind="register('lastName')" />
    <Child></Child>
    <button type="submit">Submit</button>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'
import Child from './Child.vue'

const { handleSubmit, register } = useFormHandler();
const successFn = (form: Record<string, any>) => {
  console.log({ form })
}
</script>
```

```vue
<!-- Child.vue component -->
<template>
    <input v-bind="register('anotherField')" />
    <GrandChild></GrandChild>
</template>
<script setup lang="ts">
import { useFormContext } from 'vue-form-handler'
import GrandChild from './GrandChild.vue'

const { register } = useFormContext()
</script>
```

```vue
<!-- GrandChild.vue component -->
<template>
    <input v-bind="register('anotherField2')" />
</template>
<script setup lang="ts">
import { useFormContext } from 'vue-form-handler'

const { register } = useFormContext()
</script>
```

Feel free to play with it, you can also combine `register` and `build` approaches for the same form, within the same and in different files

::: warning
Be aware that for a basic and usual functionality, We provide with a default key, If you have more than one `useFormHandler` usage in the same tree, the `injection keys` will collide, so you'll need to pass a specific one to `useFormHandler` and then to its consequent consumer, i.e: 

:::details
```vue
<!-- Parent.vue component -->
<template>
  <div>
    <form @submit.prevent="handleSubmit(successFn)">
      <input v-bind="register('firstName')" />
      <input v-bind="register('lastName')" />
      <Child></Child>
      <button type="submit">Submit</button>
    </form>
    <form @submit.prevent="handleSubmit2(successFn)">
      <input v-bind="register2('firstName')" />
      <input v-bind="register2('lastName')" />
      <AnotherChild></AnotherChild>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'
import Child from './Child.vue'
import AnotherChild from './AnotherChild.vue'

const { handleSubmit, register } = useFormHandler({ injectionKey: 'form1' });
const { handleSubmit: handleSubmit2, register: register2 } = useFormHandler({ injectionKey: 'form2' });
const successFn = (form: Record<string, any>) => {
  console.log({ form })
}
</script>
```

```vue
<!-- Child.vue component -->
<template>
    <input v-bind="register('anotherField')" />
</template>
<script setup lang="ts">
import { useFormContext } from 'vue-form-handler'

const { register } = useFormContext('form1')
</script>
```

```vue
<!-- AnotherChild.vue component -->
<template>
    <input v-bind="register('anotherField')" />
</template>
<script setup lang="ts">
import { useFormContext } from 'vue-form-handler'

const { register } = useFormContext('form2')
</script>
```
:::

::: tip
Please refer to [Working with Symbol Keys](https://vuejs.org/guide/components/provide-inject.html#working-with-symbol-keys) for a quick read and understanding how provide/inject is intended to be used, and a correct way of defining your keys, as passing plain strings might not be the best approach, but rather using `Symbol`
:::