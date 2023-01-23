# useFormHandler: <font size=3>FormHandler</font>

`useFormHandler` is our composable to handle forms, it takes one object as **optional** argument and returns various objects and methods that will allow us to handle our forms.

## Props

### initialValues: <font size=2>Record<string,any></font>

::: warning
Changing the initialValues will trigger a form reset, this means the formState and the values will return to its initial state.
:::

Values which we use to initialize the form, this is useful when we get an initial value state for the form from an external call.

#### Example
```vue
<template>
    <input v-bind="register('firstName')"> // Should initially be 'John'
    <input v-bind="register('lastName')"> // Should initially be 'Doe'
    <pre>{{values}}</pre> // Should show the initialized values
</template>
<script setup lang="ts">
    import { useFormHandler } from 'vue-form-handler'

    const { register, values } = useFormHandler({
        initialValues: {
            firstName: 'John',
            lastName: 'Doe'
        }
    })
</script>
```

### interceptor: <font size=2>Interceptor</font>

Function that allows us to intercept any value assignment, accept or deny it and perform operations before and after the assignment happens.

#### Params

The interceptor will be called passing an object as a parameter with the following:

| attribute | type   | description                                |
|-----------|--------|--------------------------------------------|
| name      | string    | Name of the field that is about to be set  |
| value     | any    | Value of the field that is about to be set |
| clearError | ClearError | [API - clearError](/api/use-form-handler/clear-error) |
| clearField | ClearField | [API - clearField](/api/use-form-handler/clear-field) |
| formState | FormState | [API - formState](/api/use-form-handler/form-state) |
| modifiedValues | ModifiedValues | [API - modifiedValues](/api/use-form-handler/modified-values) |
| resetField | ResetField | [API - resetField](/api/use-form-handler/reset-field) |
| resetForm | ResetForm | [API - resetForm](/api/use-form-handler/reset-form) |
| setError | SetError | [API - setError](/api/use-form-handler/set-error) |
| setValue | SetValue | [API - setValue](/api/use-form-handler/set-value) |
| triggerValidation | TriggerValidation | [API - triggerValidation](/api/use-form-handler/trigger-validation) |
| values    | Record<string,any> | [API - values](/api/use-form-handler/values) |

::: info
As you can see, the interceptor is provided with everything the handler does provide but in a separate context.
:::

#### Expected return

The interceptor expects a type of `boolean` or a `Promise<boolean>`,
return true to proceed setting the value and false if the value should not be set.

#### Example

```vue
<template>
    <select v-bind="register('continent')" placeholder="Choose your country">
        <option disabled value=null>Choose your continent</option>
        <option value="AM">America</option>
        <option value="AS">Asia</option>
        <option value="EU">Europe</option>
    </select>
    <select v-bind="register('country')" placeholder="Choose your country">
        <option disabled value=null>Choose your country</option>
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

const interceptor = ({ name, clearField }) => {
    if (name === 'continent') {
        clearField('country')
    }
    return true
}

const { register } = useFormHandler({
    interceptor
})
</script>
```

### validate: <font size=2>FormValidation</font>

Use this function in the case you'd rather perform a custom/different validation when submitting your form

#### Example

```vue
<template @submit.prevent="handleSubmit(successFn)">
    <form>
        <input v-bind="register('firstName')">
        <input v-bind="register('lastName')">
        <input type="number" v-bind="register('age')">
        <input type="submit">
    </form>
</template>
<script setup lang="ts">
    import { useFormHandler } from 'vue-form-handler'
    
    const validation = (values) => values.age && Number(values.age)>=18
    const successFn = (form:Record<string,any>) => {
        console.log({form})
    }

    const { register, handleSubmit } = useFormHandler({
        validation
    })
</script>
```

### validationMode: <font size="2">'onChange' | 'onBlur' | 'onSubmit' | 'always'</font>

This option allows you to configure the validation mode or strategy the handler will follow.

| name | type   | description                                |
|-----------|--------|--------------------------------------------|
| onChange      | string    | Validation will trigger on the change event with each input, and lead to multiple re-renders.  |
| onBlur     | string    | Validation will trigger on the blur event. |
| onSubmit    | string | 	Validation will trigger on the submit event. |
| always    | string | 	Validation will trigger on change and blur events.  |

::: warning
Using the `always` validationMode will have a more significant impact on performance.
:::

## Return

- [clearError](/api/use-form-handler/clear-error)
- [clearField](/api/use-form-handler/clear-field)
- [formState](/api/use-form-handler/form-state)
- [handleSubmit](/api/use-form-handler/handle-submit)
- [modifiedValues](/api/use-form-handler/modified-values)
- [register](/api/use-form-handler/register)
- [resetField](/api/use-form-handler/reset-field)
- [resetForm](/api/use-form-handler/reset-form)
- [setError](/api/use-form-handler/set-error)
- [setValue](/api/use-form-handler/set-value)
- [triggerValidation](/api/use-form-handler/trigger-validation)
- [unregister](/api/use-form-handler/unregister)
- [values](/api/use-form-handler/values)