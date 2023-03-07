<template>
  <h2>Playground</h2>
  <form @submit.prevent="submitForm">
    <input v-bind="register('playground')" />
    <button>Submit</button>
    <button
      type="button"
      @click="
        () => {
          initialValues = {
            playground: 'Hello Vue 3',
          }
        }
      "
    >
      Change initialValues
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormHandler } from '../src/index'

const initialValues = ref({
  playground: '',
})

const { register, handleSubmit } = useFormHandler({
  initialValues,
})

const submitForm = () => {
  handleSubmit((form: any) => {
    console.log(form)
  })
}
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
