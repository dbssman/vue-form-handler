
<div align="center">
	<h1>vue-form-handler</h1>

The easy way of handling your vue forms
</div>

[![Build Status](https://github.com/mattphillips/deep-object-diff/actions/workflows/ci.yaml/badge.svg)](https://github.com/dbssman/vue-form-handler/actions/workflows/node.js.yml)
[![version](https://img.shields.io/npm/v/deep-object-diff.svg?style=flat-square)](https://www.npmjs.com/package/deep-object-diff)
[![downloads](https://img.shields.io/npm/dm/deep-object-diff.svg?style=flat-square)](http://npm-stat.com/charts.html?package=deep-object-diff&from=2016-11-23)
[![MIT License](https://img.shields.io/npm/l/deep-object-diff.svg?style=flat-square)](https://github.com/dbssman/vue-form-handler/blob/master/License.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## 📦 Installation
---
``` yarn add vue-form-handler ```

``` npm i --save vue-form-handler ```

## 🚀 Features
---
- 💪 **Type strong**: Written in TypeScript
- 🔩 **Flexible**: you can wrap the form handler over native inputs or any other like the ones from material libraries or custom inputs.
- 🪶 **Super light**: Small package size
- 💻 **DX**: Great development experience

## 🦄 Usage
---
### Basic usage

```vue
<template>
	<form @submit.prevent="handleSubmit(successFn)">
		<input v-bind="register('firstName')" />
		<input v-bind="register('lastName')" />
		<input v-bind="register('age')" type="number"/>
		<input type="submit"/>
	</form>
</template>
<script setup>
import { useFormHandler } from 'vue-form-handler';
const { register, handleSubmit } = useFormHandler();
const successFn = (form) => {console.log({form})}
</script>
```

### Validations

```vue
<template>
	<form @submit.prevent="handleSubmit(successFn)">
		<input v-bind="register('firstName',{
			required:'This field is required'
		})" />
		<p>{{formState.errors.firstName}}</p>
		<input v-bind="register('lastName')" />
		<input v-bind="register('age', {
			min:{
				value: 18,
				message: 'Your age is below the accepted range'
			}
		})" type="number" />
		<p>{{formState.errors.age}}</p>
		<input type="submit"/>
	</form>
</template>
<script setup>
import { useFormHandler } from 'vue-form-handler';
const { formState, register, handleSubmit } = useFormHandler();
const successFn = (form) => {console.log({form})}
</script>
```

### Integration with Material frameworks

```vue
<template>
	<form @submit.prevent="handleSubmit(successFn)">
		<q-input v-bind="register('name')" />
		<q-checkbox v-bind="register('married')"/>
		<q-select v-bind="register('pet')" :options="['dog','cat','mouse']"/>
		<input type="submit"/>
	</form>
</template>
<script setup>
import { useFormHandler } from 'vue-form-handler';
const { formState, register, handleSubmit } = useFormHandler();
const successFn = (form) => {console.log({form})}
</script>
```

### For a more advanced usage visit the [Docs](https://vue-form-handler.com)

## 💜 Thanks
---
This project is heavily inspired by other awesome projects like:
- [jaredpalmer/formik](https://github.com/jaredpalmer/formik)
- [react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form)

## 📄 License
---
[MIT License](https://github.com/dbssman/vue-form-handler/blob/master/License.md) © 2022-PRESENT [Dennis Bosmans](https://github.com/dbssman)
