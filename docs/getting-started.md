# Getting started

## Some section

Some content here


## Another section

More content there


## Basic example 

Some code there

``` vue
<template>
	<form @submit.prevent="handleSubmit(successFn)">
		<input v-bind="register('firstName')" />
		<input v-bind="register('lastName')" />
		<input v-bind="register('age')" />
		<input type="submit"/>
	</form>
</template>
<script setup>
import { useFormHandler } from 'vue-form-handler';
const { values, formState, register, handleSubmit } = useFormHandler();
const successFn = (form) => {console.log({form})}
</script>
```