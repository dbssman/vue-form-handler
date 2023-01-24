# setValue

Sets the value of a field programmatically, it does not trigger any validation, to do so make use of [triggerValidation](/api/use-form-handler/trigger-validation).

:::info
`setValue` does trigger the interceptor, so that you have maximum control over the field that is being set.
:::

## Demo

Coming soon...

## Usage

### Set the value of a related field while we fill the base field

```vue
<template>
    <form>
        <input type="text" v-bind="register('name')" />
        <input type="email" v-bind="register('email')" />
        <button type="submit">Submit</button>
    </form>
</template>
<script setup lang="ts" >
import { watch } from 'vue'
import { useFormHandler } from 'vue-form-handler'

const { register, setValue, values } = useFormHandler()

watch(
    () => values.name,
    (curr: string|null) => {
        setValue('email', curr
            ? `${curr.toLowerCase().trim()}@mail.com`
            : '')
    }
)
</script>
```
Simple and easy assignments to any field, with no extra overhead or issues.

### `setValue` with validation trigger

```vue{5-7,25}
<template>
    <form>
        <input type="text" v-bind="register('name')" />
        <input type="email" v-bind="register('email',{
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email field is not a valid regex'
            }
        })" />
        <button type="submit">Submit</button>
    </form>
</template>
<script setup lang="ts" >
import { watch } from 'vue'
import { useFormHandler } from 'vue-form-handler'

const { register, setValue, values, triggerValidation } = useFormHandler()

watch(
    () => values.name,
    (curr: string|null) => {
        await setValue('email', curr
            ? `${curr.toLowerCase().trim()}@mail.com`
            : 'Set a name first')
        triggerValidation('email')
    }
)
</script>
```
Just calling `triggerValidation` after a value is set ensures the validations are fired, remember to use `await` on setValue if you're expecting to intercept the value change so that it does trigger the validation when it should.


## Type Declarations

```ts
export type SetValue = (
    name: string, 
    value: any
) => Promise<void>
```