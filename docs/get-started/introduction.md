# Introduction

VueFormHandler is an abstract and flexible form handling solution. It allows you to easily handle forms in Vue, without forcing you to use specific components. You can use it on along with native HTML, custom components and material libraries (Quasar, Vuetify, Oruga...). It builds on top of Vue using typescript and provides a comfortable and efficient way to handle your forms.

Here is a minimal example:

```vue
<template>
  <form @submit.prevent="handleSubmit(successFn)">
    <input v-bind="register('firstName')" />
    <input v-bind="register('lastName')" />
    <input type="submit" />
  </form>
</template>
<script setup lang="ts">
import { useFormHandler } from 'vue-form-handler'
const { register, handleSubmit } = useFormHandler()
const successFn = (form: Record<string, any>) => {
  console.log({ form })
}
</script>
```

**Result**

- Interactive demo here

The above example shows how easy it is to use this solution, you simply have to register your components by giving them a name (something you'd need to do)

## Motivation

I [@dbssman](https://github.com/dbssman) wrote VueFormHandler due to the need of an abstract, flexible and reliable form handler where you could keep the components you already had, solutions like these are available for React, but there was none for vue until now.

## Installation

You can install VueFormHandler

```bash
yarn add vue-form-handler
```

```bash
npm i --save vue-form-handler
```

## Why not... ?

There are some form solutions for vue 3 ([VueForm](https://vueform.com/), [FormKit](https://formkit.com/)), but you're forced to use the built-in components they provide, and you don't have enough control over the form itself that, for some approaches would be interesting.

## Influences

This project is heavily inspired by other awesome projects like:

- [jaredpalmer/formik](https://github.com/jaredpalmer/formik)
- [react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form)
