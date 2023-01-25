
<div align="center">
	<object data="https://vue-form-handler.com/favicon.png"></object>
	<h1>vue-form-handler</h1>
	
The easy way of handling your vue forms

[![Build Status](https://github.com/dbssman/vue-form-handler/actions/workflows/node.js.yml/badge.svg)](https://github.com/dbssman/vue-form-handler/actions/workflows/node.js.yml)
[![version](https://img.shields.io/npm/v/vue-form-handler.svg?style=flat-square)](https://www.npmjs.com/package/vue-form-handler)
[![downloads](https://img.shields.io/npm/dm/vue-form-handler.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vue-form-handler&from=2023-01-20)
[![MIT License](https://img.shields.io/npm/l/vue-form-handler.svg?style=flat-square)](https://github.com/dbssman/vue-form-handler/blob/master/License.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<a href="https://www.buymeacoffee.com/dbssman" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
</div>


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
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';
const { register, handleSubmit } = useFormHandler();
const successFn = (form: Record<string,any>) => {console.log({form})}
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
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';
const { formState, register, handleSubmit } = useFormHandler();
const successFn = (form: Record<string,any>) => {console.log({form})}
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
<script setup lang="ts" >
import { useFormHandler } from 'vue-form-handler';
const { formState, register, handleSubmit } = useFormHandler();
const successFn = (form: Record<string,any>) => {console.log({form})}
</script>
```

### For a more advanced usage visit the [Docs](https://vue-form-handler.com)

## 📈 Project activity
---
![Alt](https://repobeats.axiom.co/api/embed/d0da4b79bde282068c5f3da3505091b1447a1f6c.svg "Repobeats analytics image")

## 💜 Thanks
---
This project is heavily inspired by other awesome projects like:
- [jaredpalmer/formik](https://github.com/jaredpalmer/formik)
- [react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form)

## 📄 License
---
[MIT License](https://github.com/dbssman/vue-form-handler/blob/master/License.md) © 2022-PRESENT [Dennis Bosmans](https://github.com/dbssman)