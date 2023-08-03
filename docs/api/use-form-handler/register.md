# register

Base logic for the functionality of the form handler, it takes a field name and an object as an **optional** argument, it returns the necessary handlers/props to be bound to our inputs.

## Demo

Coming soon...

## Props

| attribute | type                                                                     | description                          |
| --------- | ------------------------------------------------------------------------ | ------------------------------------ |
| name      | `string`                                                                 | Name for the field                   |
| options   | [RegisterOptions](/api/use-form-handler/register.html#type-declarations) | Optional configuration for the field |

### `options`

| attribute           | type                                                                 | description                                                                                                                                                                                     |
| ------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| native              | `boolean`                                                            | Explicitly indicates if the field is a native input or not. The main idea of this is to avoid binding the native input handler to custom components.                                            |
| defaultValue        | `any`                                                                | Default value for the field, would override the fallback value when the field is empty/cleared                                                                                                  |
| validate            | [Validations](/api/use-form-handler/register.html#type-declarations) | [Custom validations](/get-started/quick-start.html#custom-validation) object.                                                                                                                   |
| withDetails         | `boolean`                                                            | Explicitly indicates if you want to bind dirty and and touched state for the registered field                                                                                                   |
| disabled            | `boolean`                                                            | Disables the field. When a field is disabled it gets reset, and is not able to validate, or set new values until it is enabled again. The field is also not considered for the form validation. |
| useNativeValidation | `boolean`                                                            | Set to true if you want to use native HTML validation                                                                                                                                           |
| dependentFields     | `string[]`                                                           | Array of names from fields that depend on this one validation                                                                                                                                   |

## Return

| attribute             | type                                 | description                                                                                                               |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| name                  | `string`                             | Name of the field                                                                                                         |
| error                 | <code>string &#124; undefined</code> | Current error of the field                                                                                                |
| ref                   | `(fieldRef:any) => void`             | Takes care of updating and keeping the fields correctly aligned with the form, specially when talking about native inputs |
| modelValue            | `any`                                | Current field value binding for non-native inputs                                                                         |
| 'onUpdate:modelValue' | `(value: any) => Promise<void>`      | Value update handler for non-native inputs                                                                                |
| onBlur                | `() => void`                         | Blur handler                                                                                                              |
| onClear               | `() => void`                         | Clear handler                                                                                                             |
| disabled              | `boolean`                            | Disabled state binding for the field                                                                                      |
| isDirty               | `boolean`                            | Dirty state binding for the field. Only returned if `withDetails` is true                                                 |
| isTouched             | `boolean`                            | Touched state binding for the field. Only returned if `withDetails` is true                                               |
| onChange              | `(el: any) => Promise<void>`         | Value update handler for native inputs                                                                                    |
| required              | `boolean \| string`                  | Native required validation. Only returned if `useNativeValidations` is set to true and `required` is set.                 |
| min                   | `number \| Object`                   | Native min validation. Only returned if `useNativeValidations` is set to true and `min` is set.                           |
| max                   | `number \| Object`                   | Native max validation. Only returned if `useNativeValidations` is set to true and `max` is set.                           |
| minLength             | `number \| Object`                   | Native minLength validation. Only returned if `useNativeValidations` is set to true and `minLength` is set.               |
| maxLength             | `number \| Object`                   | Native maxLength validation. Only returned if `useNativeValidations` is set to true and `maxLength` is set.               |
| pattern               | `string  \| RegExp \| Object`        | Native pattern validation. Only returned if `useNativeValidations` is set to true and `pattern` is set.                   |

:::info
Notice how `modelValue` and `'onUpdate:modelValue'` are used as our two way data binding for non-native inputs following the Vue [approach](https://vuejs.org/guide/components/v-model.html). So that your fields used for complex forms could also be re-used in other parts of your application with v-model.
:::

## Usage

### Basic

```vue
<template>
  <input type="text" v-bind="register('name')" />
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'
const { register } = useFormHandler()
</script>
```

The usage is very simple and intuitive, we just get the `register` function from the handler and use it to attach our fields to the form, the most basic use case, just by giving it a name as above. Once the field is registered it is ready and interacts with the form without any more effort on our side.

### Default value

```vue
<template>
  <select
    v-bind="
      register('country', {
        defaultValue: 'ESP',
      })
    "
    placeholder="Choose your country"
  >
    <option value="CAN">Canada</option>
    <option value="USA">United States</option>
    <option value="JAP">Japan</option>
    <option value="CHN">China</option>
    <option value="ESP">Spain</option>
    <option value="DEU">Germany</option>
  </select>
</template>

<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'
const { register } = useFormHandler()
</script>
```

As you can see, setting a default value for a field, in this case the country, is very simple, we just give it the value we want and it will be the `default`, not to confuse with the `initial` value, clearing the field will return it to it's default value, or to a value fallback if no default is specified.

:::warning
The handler supports also initialization via html attributes like `selected` or `checked` but it is highly recommended to just use the tools that are provided.
:::

### In-built Validation

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
          minLength: 15,
          maxLength: 300,
        })
      "
    />
    <p v-show="formState.errors.description">
      {{ formState.errors.description }}
    </p>
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'

const { register, formState } = useFormHandler()
</script>
```

Quick an easy validate your fields by just passing a single attribute. The errors displayed will be very generic and also not maybe working for your locale, that's why we can customize the error message by passing the validation with a different interface.

```vue{4-8}
<template>
	<form>
        <input type="email" v-bind="register('email', {
            required: 'This is the required message',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Pattern is failing'
            }
        })" />
        <p v-show="formState.errors.email">
            {{ formState.errors.email }}
        </p>
        ...
	</form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const { register, formState } = useFormHandler();
</script>
```

The case of `required` is a bit special, you'll be able to get the custom message by just passing the string you wish. For the rest, they take an object as currently `pattern` does, with the `value` being the validation value, and `message` being the custom message to display.

### Native validations

You can also opt to let HTML validate your fields by passing `useNativeValidation` to true in the register options, i.e:

```vue{4-6}
<template>
	<form @submit.prevent="handleSubmit(successFn)">
        <input type="email" v-bind="register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            useNativeValidation: true
        })" />
        <p v-show="formState.errors.email">
            {{ formState.errors.email }}
        </p>
        ...
	</form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const { register, formState, handleSubmit } = useFormHandler();
const successFn = (form:Record<string,any>) => {console.log({form})}
</script>
```

:::warning
Please remember that you'll not be able to pass custom messages to native validations.
:::

### Custom validations

```vue{13-15}
<template>
  <form>
    <input type="password" v-bind="register('password', {
      required: true,
      pattern: passwordRegExp
    })" />
    <p class="error" v-show="formState.errors.password">
      {{ formState.errors.password }}
    </p>
    <input type="password" v-bind="register('confirmPassword', {
      required: true,
      pattern: passwordRegExp,
      validate: {
        match: (value) => value === values.password || 'Passwords do not match'
      }
    })" />
    <p class="error" v-show="formState.errors.confirmPassword">
      {{ formState.errors.confirmPassword }}
    </p>
  </form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const { values, register, formState } = useFormHandler({ validationMode: 'always' });
</script>
```

Custom validations are kept very simple, can be synchronous or asynchronous. We just pass a function that will get executed when the field needs to be validated. It is expected that the function returns: `true` if the field is valid/ a `string` corresponding to the error due to the failing validation.

## Type Declarations

```ts
export type Register = (
  name: keyof T,
  options?: RegisterOptions
) => {
  pattern?: string | undefined
  required?: boolean | undefined
  min?: number | undefined
  max?: number | undefined
  minLength?: number | undefined
  maxLength?: number | undefined
  onChange?: (() => Promise<void>) | undefined
  isDirty?: boolean | undefined
  isTouched?: boolean | undefined
  disabled?: boolean | undefined
  name: keyof T
  modelValue: T[keyof T]
  'onUpdate:modelValue': (value: any) => Promise<void>
  ref: (fieldRef: any) => void
  onBlur: () => void
  onClear: () => Promise<void>
}
```
