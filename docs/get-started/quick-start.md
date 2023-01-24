# Quick start

## Before we start

Welcome to the VueFormHandler tutorial. This will teach you everything you need to know in order to improve your form handling in an easy way.

### What are we building?

In this tutorial, we'll build a sign up form with Vue and VueFormHandler [Link here](somelink.com). If the code looks strange or you don't fully understand something, don't worry we'll go over this tutorial to help you understand how the handler works.

### Prerequisites

You'll need to be familiar with [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [modern Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview) and [Vue 3](https://vuejs.org/) to fully understand the tutorial and how the solution works.

## Setup for the Tutorial

There are two ways to follow this tutorial: you can either write the code in your browser, or you can set up a development environment locally on your computer.

### Setup Option 1: Write Code in the Browser

This is a very quick way to start, open this [Starter Code](starter-code.com) in a new tab. The new tab should display the form structure and a basic project with the necessary tools installed.

### Setup Option 2: Local Development Environment

Skip this option if you already opted for the one above.

::: details
This setup requires more work, but allows you to complete the tutorial using an editor of your choice. Here are the steps to follow:

Considering you have a recent version of [Node.js](https://nodejs.org/en/) installed, it is highly recommended that you use [Vite.js](https://vitejs.dev) to setup your vue project

```bash
npm create vite@latest
```

For the framework we'll choose Vue, and the variant is your decision, VueFormHandler is powered by [TS](https://www.typescriptlang.org/), so you will have a very good support while using the Typescript variant.

```bash
✔ Project name: … form-handler-tutorial
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript
```

This should create a project very fast, to start and have a quick first look into it just run the snippet below.

```bash
cd form-handler-tutorial
npm install
npm run dev
```

After looking into it, let's now add our form handler using one of the [Installation Methods](/get-started/introduction.html#installation). 

```bash
npm i vue-form-handler
```

Now, as a final step, let's cleanup the `/src` folder by deleting the `/assets` and `/components`. After this, we'll clean up the contents of the `App.vue` file and `style.css`

The remaining structure of the src folder should look like this:

```
src
 ├─ App.vue
 ├─ main.ts (or js if you chose the Javascript variant)
 ├─ style.css
 └─ vite-env.d.ts
```

Congratulations! You're all set to start the tutorial. Nevertheless it's recommended to use some extension for vue syntax highlighting in your editor, If you're using [VSCode](https://code.visualstudio.com/), [Vue volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) will do the job for you.
:::

## Overview

VueFormHandler consists mainly of one composable, that can be used directly as is with Composition API or also available as a component for people using Options API. This piece handles and helps with: 

- Initializing a form
- Getting and setting values
- Validations and error messages
- Handling form submission

And also has more advanced features like

- Intercepting value changes
- Triggering validations on demand
- Setting errors on demand
- Obtaining form diff

## Basic usage

We'll start off with a basic example so that by increasing the complexity we can see the full potential of VueFormHandler

### Simple sign up form

To set up a basic sign up form is very easy with our solution, we just have to register our fields with the function provided by the handler.

```vue
<template>
	<form @submit.prevent="handleSubmit(successFn)">
		<input type="email" v-bind="register('email')" />
		<input type="password" v-bind="register('password')" />
        <input type="password" v-bind="register('confirmPassword')" />
		<input type="submit"/>
	</form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';
const { register, handleSubmit } = useFormHandler();
const successFn = (form: Record<string,any>) => {console.log({form})}
</script>
```
Let's analyze what we've done above:

On the script side of things we call the composable and for now we just make use of 2 functions returned by it:

- `register`: As it's name indicates, this function is able to register fields to our form, so that the handler is able to get/set it's value, handle validations and react consequently updating the form state, this is the core of how the composable works.
- `handleSubmit`: A submission handler, we can pass a success and an error function if desired. The success function will be called with the form values if the form succeeds and the error function with the errors if the submission fails.

And thats it! we already have a working form without having to care about handling anything of it, but of course this is a very simple example so let's move on with more features.

## Validation

Our current form works but it's not complete at all, we might want to add validations to our fields in order to ensure that the form data is complete and correct when we submit it. We can use native HTML validations but VueFormHandler does also provide a more sophisticated solution for this.

```vue
<template>
	<form @submit.prevent="handleSubmit(successFn)">
		<input type="email" v-bind="register('email', {
            required: true,
            pattern: emailRegExp
        })" />
    <p class="error" v-show="formState.errors.email">
        {{formState.errors.email}}
    </p>
		<input type="password" v-bind="register('password', {
            required: true,
            pattern: passwordRegExp
        })" />
    <p class="error" v-show="formState.errors.password">
        {{formState.errors.password}}
    </p>
    <input type="password" v-bind="register('confirmPassword', {
            required: true,
            pattern: passwordRegExp
        })" />
    <p class="error" v-show="formState.errors.confirmPassword">
        {{formState.errors.confirmPassword}}
    </p>
		<input type="submit"/>
	</form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const { register, formState, handleSubmit } = useFormHandler({
    validationMode: 'always'
});
const successFn = (form: Record<string,any>) => {console.log({form})}
</script>
```

As you can see, adding validations for a field is as easy as just using the `options` of the `register` function. This will trigger a field validation according to our `validationMode` passed to the handler.

Our `formState` will be updated according to those validations and therefore we can obtain our field errors from `formState.errors.<fieldName>`
and display them as we prefer.

But with our in-built validations for instance, we cannot make the form invalid whenever the `confirmPassword` field does not match the `password`. That's the reason we have **Custom validation**. 

We can also pass a validation function and specify `validationMode: 'onSubmit'` in order to just validate when the user submits the form.

## Custom validation

```vue{20-22}
<template>
  <form @submit.prevent="handleSubmit(successFn)">
    <input type="email" v-bind="register('email', {
      required: true,
      pattern: emailRegExp
    })" />
    <p class="error" v-show="formState.errors.email">
      {{ formState.errors.email }}
    </p>
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
    <input type="submit" />
  </form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const { values, register, formState, handleSubmit } = useFormHandler({ validationMode: 'always' });
const successFn = (form: Record<string, any>) => { console.log({ form }) }
</script>
```

Now we're making use of the `validations` option of the register function in order to pass in custom validations, in this example we pass a `match` function that checks on the current `values` in order to test if the passwords match.

As you can imagine, `values` contains the current form values.

## Submission

Submission is really made easy, we can call the function the handler provides us for submitting passing to it at least a success function that will be called with the form state if the submission succeeds.

If the submission fails it will call the error function we pass with the errors if available, if no error function is provided, then it will throw an error that you can catch from the upper context.

```vue{2,37-42}
<template>
  <form @submit.prevent="handleSubmit(successFn, errorFn)">
    <input type="email" v-bind="register('email', {
      required: true,
      pattern: emailRegExp
    })" />
    <p class="error" v-show="formState.errors.email">
      {{ formState.errors.email }}
    </p>
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
    <input type="submit" />
  </form>
</template>
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const { values, register, formState, handleSubmit } = useFormHandler({ validationMode: 'always' });
const successFn = (form: Record<string, any>) => { 
    console.log('Form correctly submitted:' form) 
}
const errorFn = (errors: Record<string,string>) => {
    console.error('There where errors while submitting the form:' errors)
}
</script>
```

## Wrapping up

Congratulations! you created a form that:

- Has complex validation logic and rich error messages
- Properly displays errors messages to the user at the correct time (after they have blurred a field)
- Controls the submission of the form and the possible errors

You can check the final result here: [Final Result](link-to-final-result.com)

Of course this is not all, the VueFormHandler has a lot more potential that you can keep discovering while reading our docs.