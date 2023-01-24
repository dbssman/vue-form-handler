# resetForm

Sets the form back to its initial state.

For the values this means they roll back to initialValues and the dirty/touched/valid states will be set back too.

## Demo

Coming soon...

## Usage

### Reset the form on demand

Fill the form and then reset it, values should reset and errors should disappear

```vue
<template>
    <form @submit.prevent="() => { }">
        <input type="email" v-bind="register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        })" />
        <p v-show="formState.errors.email">
            {{ formState.errors.email }}
        </p>
        <input type="number" v-bind="register('age', {
            min: 18,
            max: 50
        })" />
        <p v-show="formState.errors.age">
            {{ formState.errors.age }}
        </p>
        <textarea v-bind="register('description', {
            minLength: 15,
            maxLength: 300,
        })" />
        <p v-show="formState.errors.description">
            {{ formState.errors.description }}
        </p>
        <button @click="resetForm">Reset form</button>
    </form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const { register, formState, resetForm } = useFormHandler();
</script>
```


## Type Declarations

```ts
export type ResetForm = () => void
```