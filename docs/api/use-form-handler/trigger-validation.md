# triggerValidation

Triggers the validation of a field or of the whole form on demand.

It does run the validations of the field until one of it fails, we maintain one error per field. If validating the form it continues with the next field.

## Demo

Coming soon...

## Usage

### Along with `setValue`

```vue
<template>
  <form>
    <input type="text" v-bind="register('name')" />
    <input
      type="email"
      v-bind="
        register('email', {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email field is not a valid regex',
          },
        })
      "
    />
    <button type="submit">Submit</button>
  </form>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useFormHandler } from 'vue-form-handler'

const { register, setValue, values, triggerValidation } = useFormHandler()

watch(
  () => values.name,
  (curr: string | null) => {
    await setValue(
      'email',
      curr ? `${curr.toLowerCase().trim()}@mail.com` : 'Set a name first'
    )
    triggerValidation('email')
  }
)
</script>
```

Just calling `triggerValidation` after a value is set ensures the validations are fired, remember to use `await` on setValue if you're expecting to intercept the value change so that it does trigger the validation when it should.

### To validate the form on demand without submitting it

```vue
<template>
  <form>
    <input
      type="email"
      v-bind="
        register('email', {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })
      "
    />
    <p v-show="formState.errors.email">
      {{ formState.errors.email }}
    </p>
    <input
      type="number"
      v-bind="
        register('age', {
          required: true,
          min: 18,
          max: 50,
        })
      "
    />
    <p v-show="formState.errors.age">
      {{ formState.errors.age }}
    </p>
    <textarea
      v-bind="
        register('description', {
          required: true,
          minLength: 15,
          maxLength: 300,
        })
      "
    />
    <p v-show="formState.errors.description">
      {{ formState.errors.description }}
    </p>
  </form>
  <button @click="() => triggerValidation()"></button>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, formState, triggerValidation } = useFormHandler()
</script>
```

All the fields get validated when triggering the validation without specifying any fieldName.

## Type Declarations

```ts
export type TriggerValidation = (name?: keyof T | undefined) => Promise<void>
```
