<template>
  <h2>Playground</h2>
  <form @submit.prevent="submitForm">
    <input
      v-bind="
        register('playground', {
          validate: {
            syncValidation: (value: string) =>
              value?.length > 0 || 'Value cannot be empty',
          },
        })
      "
    />
    <button>Submit</button>
    <pre>{{ formState }}</pre>
  </form>
</template>

<script setup lang="ts">
import { useFormHandler } from '../src/index'

const { register, handleSubmit, formState, build } = useFormHandler()

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const testValidation = async (value: string) => {
  await sleep(3000)
  if (value === 'test') {
    return 'Value cannot be "test"'
  }
  return true
}

const submitForm = () => {
  handleSubmit((form: any) => {
    console.log(form)
  })
}

const form = build({
  playground: {},
})
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #242424;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #42b883;
  min-height: 100vh;
}

h2 {
  margin: 1em;
}

label {
  display: block;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1em;
}

input,
select,
textarea,
button {
  border: none;
  border-radius: 5px;
  width: 300px;
  min-height: 40px;
  background-color: #35495e;
  color: #42b883;
}

button {
  background-color: #42b883;
  color: #35495e;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
